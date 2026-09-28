// Proyectos del portafolio. script.js lee window.PROJECTS_DATA y dibuja las
// tarjetas de la seccion "Proyectos". Para agregar uno, edita este archivo.
//
// Campos disponibles por proyecto:
//   title        texto de la tarjeta
//   description  una o dos frases: que hace y que problema resuelve
//   tags         tecnologias usadas; se suman solas a la grilla de Tecnologias
//   repoUrl      enlace al repositorio en GitHub
//   demoUrl      enlace a la demo desplegada
//   notebookUrl  enlace al notebook (solo si el proyecto tiene uno)
//   image        ruta a la imagen de portada; si se omite usa `gradient`
//   gradient     clave de un gradiente definido en data.gradients
window.PROJECTS_DATA = {
  projects: [],
};
