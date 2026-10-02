"""Genera las capturas de las tarjetas del portafolio.

No captura pantallas completas: calcula un recorte de 1,9:1 a partir de la
geometría real del elemento del gráfico, para que el gráfico quede en la
parte baja del recorte y el contexto (título, métricas) arriba.

Uso:
    python tools/capturar_dashboards.py --salida assets

Requiere las dos apps corriendo en sus puertos por defecto, o se pueden
levantar antes con:
    streamlit run app.py                                   (fraude)
    streamlit run dashboards/app.py                        (SIS)
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

# Slot real de la tarjeta: 200px de alto en style.css (.project-thumb).
# Se exporta al doble (760x400) para que se vea nitido en pantallas HiDPI.
ANCHO, ALTO = 760, 400
ASPECTO = ANCHO / ALTO
ESCALA = 2  # device_scale_factor

TIMEOUT_MS = 180_000


def rect_para_grafico(page, selector: str, indice: int = 0) -> dict:
    """Devuelve un rectángulo de 1,9:1 centrado en el gráfico `indice`.

    El gráfico se ubica en el 40% superior del recorte, así queda contexto
    arriba (subheader, métricas) sin que el gráfico se corte por abajo.
    """
    caja = page.locator(selector).nth(indice)
    caja.wait_for(state="visible", timeout=TIMEOUT_MS)
    caja.scroll_into_view_if_needed()

    ancho_pagina = page.evaluate("document.documentElement.scrollWidth")
    alto_pagina = page.evaluate("document.documentElement.scrollHeight")

    # El recorte toma todo el ancho disponible (layout="wide") y de alto
    # lo que imponga la proporción de la tarjeta.
    ancho = min(ancho_pagina, max(ANCHO / ESCALA, ancho_pagina))
    alto = ancho / ASPECTO

    if alto > alto_pagina:
        alto = alto_pagina
        ancho = alto * ASPECTO

    centro_x = caja.evaluate("el => el.getBoundingClientRect().left + window.scrollX + el.getBoundingClientRect().width / 2")
    top = caja.evaluate("el => el.getBoundingClientRect().top + window.scrollY")

    x = max(0, min(ancho_pagina - ancho, centro_x - ancho / 2))
    y = max(0, min(alto_pagina - alto, top - alto * 0.40))
    return {"x": x, "y": y, "width": ancho, "height": alto}


def guardar_webp(origen: Path, destino: Path) -> None:
    """Ajusta al tamaño exacto de la tarjeta y exporta a WebP."""
    img = Image.open(origen).convert("RGB")
    if img.size != (ANCHO, ALTO):
        img = img.resize((ANCHO, ALTO), Image.LANCZOS)
    destino.parent.mkdir(parents=True, exist_ok=True)
    img.save(destino, "WEBP", quality=82, method=6)
    kb = destino.stat().st_size / 1024
    print(f"    {destino.name}: {ANCHO}x{ALTO} -> {kb:.0f} KB")


def capturar_fraude(page, url: str, salida: Path, temporal: Path) -> None:
    print("  fraude: esperando la app y la prediccion del ejemplo...")
    page.goto(url, wait_until="domcontentloaded", timeout=TIMEOUT_MS)
    page.locator('[data-testid="stAppViewContainer"]').wait_for(
        state="visible", timeout=TIMEOUT_MS
    )

    # La app arranca en "Subir CSV" y se queda esperando un archivo, asi que
    # hay que cambiar la fuente antes de que exista algo que capturar.
    page.get_by_text("Dataset de ejemplo", exact=True).first.click(
        force=True, timeout=30_000
    )

    # El grafico vive en la pestana 3; con datos cargados aparecen las 5.
    page.get_by_role("tab").first.wait_for(state="visible", timeout=TIMEOUT_MS)
    page.get_by_role("tab", name="3. Análisis visual").first.click(
        force=True, timeout=30_000
    )
    page.locator('[data-testid="stImage"]:visible').first.wait_for(
        state="visible", timeout=TIMEOUT_MS
    )
    page.wait_for_timeout(1_500)

    rect = rect_para_grafico(page, '[data-testid="stImage"]:visible', indice=0)
    page.screenshot(path=str(temporal), clip=rect)
    print(f"    recorte: {rect}")
    guardar_webp(temporal, salida / "fraude-dashboard.webp")


def capturar_sis(page, url: str, salida: Path, temporal: Path) -> None:
    print("  SIS: esperando los graficos de la app...")
    page.goto(url, wait_until="domcontentloaded", timeout=TIMEOUT_MS)
    page.locator('[data-testid="stVegaLiteChart"]:visible').first.wait_for(
        state="visible", timeout=TIMEOUT_MS
    )
    page.wait_for_timeout(1_500)

    rect = rect_para_grafico(page, '[data-testid="stVegaLiteChart"]:visible', indice=1)
    page.screenshot(path=str(temporal), clip=rect)
    print(f"    recorte: {rect}")
    guardar_webp(temporal, salida / "sis-dashboard.webp")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--fraude", default="http://localhost:8501")
    ap.add_argument("--sis", default="http://localhost:8502")
    ap.add_argument("--salida", default="assets")
    args = ap.parse_args()

    raiz = Path(__file__).resolve().parent.parent
    salida = raiz / args.salida
    temporal = raiz / ".capturas-tmp.png"

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(
            viewport={"width": 1280, "height": 900}, device_scale_factor=ESCALA
        )
        try:
            capturar_fraude(page, args.fraude, salida, temporal)
            capturar_sis(page, args.sis, salida, temporal)
        finally:
            browser.close()
            temporal.unlink(missing_ok=True)


if __name__ == "__main__":
    main()