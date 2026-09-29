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
  // Gradientes de portada. Si un proyecto no declara `gradient`, script.js usa
  // su gradiente por defecto, asi que esta tabla es opcional; conviene
  // declararla para que las tarjetas no se vean todas iguales.
  gradients: {
    salud: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 45%, #1e3a8a 100%)',
    datos: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #d946ef 100%)',
  },

  projects: [
    {
      title: 'Atenciones del SIS: de 74,6M de filas a un modelo estrella',
      description:
        'Pipeline ETL en Python sobre las atenciones del SIS (2017-2025): procesa 74,6 millones de filas crudas y las agrega a 2,6 millones en un modelo estrella en SQL Server, que reconcilian con 665,7 millones de atenciones. El 81,4% se resuelve en primer nivel, apenas por encima del 70-80% que el MinSa considera alcanzable en ese nivel.',
      tags: ['Python', 'pandas', 'SQL Server', 'SQLAlchemy', 'Parquet', 'Streamlit', 'Altair', 'pytest'],
      repoUrl: 'https://github.com/EnzoLaTorre/pipeline-atenciones-sis',
      gradient: 'salud',
    },
  ],
};
