// ============================================================
// PROYECTOS - datos del portafolio
// Para agregar un proyecto, copia un bloque "project" y edítalo.
// Opciones por proyecto:
//   title        (obligatorio) Nombre del proyecto.
//   description  (obligatorio) Descripción breve.
//   tags         (obligatorio) Arreglo de tecnologías: ['HTML','CSS',...]
//   demoUrl      (obligatorio) Enlace al demo ('#' si aún no tienes).
//   repoUrl      (obligatorio) Enlace al repositorio.
//   notebookUrl  (opcional)    Enlace para ver el notebook (p. ej. nbviewer).
//   image        (opcional)    URL de la captura/screenshot del proyecto.
//   gradient     (opcional)    Clave de degradado de abajo; solo si no usas image.
// ============================================================
window.PROJECTS_DATA = {

  // Degradados para miniaturas sin imagen. Puedes agregar más:
  gradients: {
    sunset: 'linear-gradient(135deg, #f59e0b, #ef4444, #8b5cf6)',
    ocean: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)',
    forest: 'linear-gradient(135deg, #10b981, #06b6d4, #3b82f6)',
    neon: 'linear-gradient(135deg, #38bdf8, #818cf8, #d946ef)',
  },

  // Lista de proyectos:
  projects: [
    {
      title: 'Mini-ERP · Facturación',
      description:
        'ERP de facturación full-stack: API REST en Express + TypeORM, frontend Vue 3 con autenticación JWT, dashboard con gráficos y facturas descargables en PDF. Testing con Vitest, CI/CD en GitHub Actions y despliegue en Render.',
      tags: ['TypeScript', 'Vue 3', 'Express', 'SQLite', 'Testing', 'CI/CD'],
      demoUrl: 'https://mini-erp-api-3m0r.onrender.com',
      repoUrl: 'https://github.com/EnzoLaTorre/mini-erp',
      gradient: 'ocean',
    },
  ],
};