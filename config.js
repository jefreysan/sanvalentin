// Configuración de Canciones de Tinny
// Agrega aquí los IDs de YouTube de las canciones que quieras reproducir
// Obtén el ID de la URL: https://www.youtube.com/watch?v=ID_AQUI

const TINNY_SONGS = [
  {
    id: "SydGHrvcTZA",
    title: "Tinny - Ella Baila Sola",
    url: "https://www.youtube.com/watch?v=SydGHrvcTZA"
  },
  {
    id: "aaCQGAREeZk",
    title: "Tinny - Canción 2",
    url: "https://www.youtube.com/watch?v=aaCQGAREeZk"
  },
  {
    id: "3BVHzsglnto",
    title: "Tinny - Canción 3",
    url: "https://www.youtube.com/watch?v=3BVHzsglnto"
  },
  {
    id: "4k1fm6YNsg8",
    title: "Tinny - Canción 4",
    url: "https://www.youtube.com/watch?v=4k1fm6YNsg8"
  },
  {
    id: "FaQiQ3zuzPg",
    title: "Tinny - Canción 5",
    url: "https://www.youtube.com/watch?v=FaQiQ3zuzPg"
  },
  {
    id: "bmmX8x2OhdU",
    title: "Tinny - Canción 6",
    url: "https://www.youtube.com/watch?v=bmmX8x2OhdU"
  }
];

// Configuración de Preguntas Personalizadas
// Personaliza estas preguntas con tus propias preguntas y respuestas
const CUSTOM_QUESTIONS = [
  {
    question: '¿Qué flores te regalé la primera vez?',
    options: ['Tulipanes', 'Rosas', 'Lirios'],
    correct: 0
  },
  {
    question: '¿Por dónde nos conocimos?',
    options: ['Instagram', 'Twitter', 'Facebook'],
    correct: 0
  },
  {
    question: '¿A qué cafetería fuimos la primera vez?',
    options: ['Helarte', 'Don Marino', 'Starbucks'],
    correct: 0
  },
  {
    question: '¿Qué día fue el primer mensaje que te di?',
    options: ['1 de enero', '15 de enero', '25 de diciembre'],
    correct: 0
  }
];

// Número de WhatsApp para enviar el mensaje final
const WHATSAPP_NUMBER = "51994240168";
const WHATSAPP_MESSAGE = "¿Cuánto me quieres?";
