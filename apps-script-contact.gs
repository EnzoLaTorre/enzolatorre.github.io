/**
 * Formulario de contacto del portfolio — Google Apps Script
 * ----------------------------------------------------------
 * Cómo usarlo:
 *   1. Crea una hoja de cálculo nueva (https://sheets.new)
 *   2. Menú: Extensiónes > Apps Script
 *   3. Reemplaza TODO el código por el contenido de este archivo
 *   4. Configura TARGET_EMAIL con tu correo
 *   5. Debajo de la función, en la barra superior: Implementar > Nueva implementación
 *      - Tipo: Aplicación web
 *      - Ejecutar como: Yo
 *      - Acceso: Cualquier persona
 *   6. Clic en "Implementar" y acepta permisos (Avanzado > Ir a proyecto no verificado)
 *   7. Copia la URL de la aplicación web y pégala en script.js (CONTACT_ENDPOINT)
 *
 * Cada mensaje se guarda en la pestaña "Mensajes" de tu hoja de cálculo
 * y además te llega un email a TARGET_EMAIL. Sin límites de envíos.
 */

var TARGET_EMAIL = 'enzolatorrech18@gmail.com'; // ← tu correo receptor

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);

  var params = (e && e.parameter) ? e.parameter : {};

  // Honeypot anti-spam: si el campo oculto viene lleno, se descarta en silencio.
  if (params._gotcha && String(params._gotcha).length > 0) {
    return jsonResponse({ ok: true });
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Mensajes') || ss.insertSheet('Mensajes');

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Fecha', 'Nombre', 'Email', 'Mensaje']);
  }

  sheet.appendRow([
    new Date(),
    params.name || '',
    params.email || '',
    params.message || ''
  ]);

  try {
    GmailApp.sendEmail(
      TARGET_EMAIL,
      'Nuevo mensaje del portfolio: ' + (params.name || 'Anónimo'),
      'Nombre: ' + (params.name || '—') + '\n\n' +
      'Email: ' + (params.email || '—') + '\n\n' +
      'Mensaje:\n' + (params.message || '—') + '\n\n' +
      'Enviado desde https://enzolatorre.github.io/'
    );
  } catch (err) {
    // El email es una copia; el mensaje ya quedó guardado en la hoja.
  }

  return jsonResponse({ ok: true, next: '/' });
}

function doGet() {
  return ContentService.createTextOutput('Portfolio contact endpoint OK')
    .setMimeType(ContentService.MimeType.TEXT);
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}