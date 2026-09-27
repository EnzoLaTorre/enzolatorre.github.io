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
      title: 'RAG SaaS · Chat con tus documentos',
      description:
        'SaaS multitenant de RAG: sube PDF/DOCX/TXT y haz preguntas con respuestas en streaming y citas verificables. Python, FastAPI, ChromaDB y OpenAI.',
      tags: ['Python', 'FastAPI', 'OpenAI', 'ChromaDB', 'React', 'TypeScript'],
      demoUrl: '#',
      repoUrl: 'https://github.com/EnzoLaTorre/rag-saas',
      image: '',
      gradient: 'sunset',
    },
    {
      title: 'Detección de fraude en tarjetas de crédito',
      description:
        'ML sobre 284k transacciones: EDA, balanceo con SMOTE, comparación de modelos (Logistic Regression, Random Forest, XGBoost) y ajuste del umbral de decisión. Incluye un dashboard interactivo en Streamlit para subir datos y ver predicciones, métricas y el impacto económico del umbral.',
      tags: ['Python', 'pandas', 'scikit-learn', 'XGBoost', 'Machine Learning', 'Streamlit'],
      demoUrl: 'https://fraud-detection-l9fzuu2wdfk3rj8ewfjj63.streamlit.app/',
      repoUrl: 'https://github.com/EnzoLaTorre/fraud-detection',
      notebookUrl: 'https://nbviewer.org/github/EnzoLaTorre/fraud-detection/blob/main/notebooks/fraud_analysis.ipynb',
      image: 'imagenes/fraude-dashboard-v2.png',
      gradient: 'ocean',
    },
  ],
};