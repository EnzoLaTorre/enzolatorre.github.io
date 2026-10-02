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
    fraude: 'linear-gradient(135deg, #d7263d 0%, #b5175e 45%, #6a1b3a 100%)',
  },

  projects: [
    {
      title: 'Atenciones del SIS: de 74,6M de filas a un modelo estrella',
      description:
        'Pipeline ETL en Python sobre las atenciones del SIS (2017-2025): procesa 74,6 millones de filas crudas y las agrega a 2,6 millones en un modelo estrella en SQL Server, que reconcilian con 665,7 millones de atenciones. El 81,4% se registra en primer nivel, cifra que no equivale a la del MinSa (70-80% de necesidades resueltas localmente): el SIS registra a dónde acude la gente, no qué se resolvió.',
      tags: ['Python', 'pandas', 'SQL Server', 'SQLAlchemy', 'Parquet', 'Streamlit', 'Altair', 'pytest'],
      repoUrl: 'https://github.com/EnzoLaTorre/pipeline-atenciones-sis',
      demoUrl: 'https://pipeline-atenciones-sis.onrender.com',
      image: 'assets/sis-dashboard.webp',
      gradient: 'salud',
    },
    {
      title: 'Fraude en tarjetas: 103 de 142, y por qué la accuracy no sirve',
      description:
        'Detección de fraude con un desbalance extremo: solo el 0,17% de las transacciones es fraude, así que un modelo que diga "todo normal" sacaría 99,83% de accuracy sin detectar un solo fraude. Compara Logistic Regression, Random Forest y XGBoost con y sin SMOTE, midiendo recall, precisión y F1. El mejor modelo detecta 103 de 142 fraudes con 6 falsas alarmas, y el umbral se elige sobre un conjunto de validación, no sobre test, para que las métricas no queden infladas. El barrido de umbrales muestra que elegir dónde cortar es una decisión de negocio, no del modelo.',
      tags: ['Python', 'pandas', 'scikit-learn', 'XGBoost', 'matplotlib', 'seaborn', 'Streamlit', 'imbalanced-learn'],
      repoUrl: 'https://github.com/EnzoLaTorre/fraud-detection',
      demoUrl: 'https://fraud-detection-txng.onrender.com',
      notebookUrl: 'https://github.com/EnzoLaTorre/fraud-detection/blob/main/notebooks/fraud_analysis.ipynb',
      image: 'assets/fraude-dashboard.webp',
      gradient: 'fraude',
    },
  ],
};
