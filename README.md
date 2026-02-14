# 🌷 Jardín de Tranquilidad

Un jardín interactivo donde cultivas tulipanes de colores suaves mientras recibes mensajes de paz y tranquilidad. Incluye un juego de preguntas especiales para conectar con alguien especial.

## ✨ Características

### 🌱 Sistema de Cultivo
- **6 Tulipanes de Colores Suaves:**
  - Blanco, Tierra, Amarillo, Rosa Suave, Lavanda, Melocotón
- **5 Etapas de Crecimiento:**
  - Semilla → Germinando → Tallo → Creciendo → Flor
- **Crecimiento Automático:**
  - 1 etapa por día
  - Riego automático 3 veces al día (6am, 12pm, 6pm)
- **Persistencia:**
  - Progreso guardado en localStorage
  - Se mantiene entre sesiones

### 🎮 Juego de Preguntas
- **4 Preguntas Personalizadas:**
  - ¿Qué flores te regalé la primera vez?
  - ¿Por dónde nos conocimos?
  - ¿A qué cafetería fuimos la primera vez?
  - ¿Qué día fue el primer mensaje que te di?
- **Preguntas y Respuestas Aleatorias:**
  - Orden diferente cada vez que juegas
  - Opciones mezcladas aleatoriamente
- **Integración WhatsApp:**
  - Al terminar, envía la pregunta "¿Cuánto me quieres?" a WhatsApp
  - Número: +51 994 240 168

### 🎵 Música de Tinny
- **Reproducción Aleatoria de Canciones de Tinny**
- **5 Canciones Seleccionadas:**
  - SydGHrvcTZA - Ella Baila Sola
  - aaCQGAREeZk - Canción 2
  - 3BVHzsglnto - Canción 3
  - 4k1fm6YNsg8 - Canción 4
  - FaQiQ3zuzPg - Canción 5
- **Panel Compacto de Control:**
  - Ubicado debajo de la hora (esquina superior derecha)
  - Diseño minimalista y elegante
  - Muestra el título de la canción actual
- **Botones de Control:**
  - ▶️ Reproducir - Reproduce una canción aleatoria de Tinny
  - ⏹️ Detener - Detiene la reproducción
  - ✕ Cerrar - Cierra el panel
- **Cómo Usar:**
  1. Haz clic en el botón 🎵 Música (esquina inferior derecha)
  2. Se abrirá el panel de control debajo de la hora
  3. Haz clic en "▶️ Reproducir"
  4. Se abrirá YouTube en una nueva ventana con la canción de Tinny

### 🌅 Ciclo Día/Noche
- **Sincronizado con Hora Peruana (UTC-5)**
- **4 Períodos:**
  - Mañana (6am-12pm): Cielo azul claro ☀️
  - Tarde (12pm-5pm): Cielo amarillo dorado ☀️
  - Atardecer (5pm-8pm): Cielo naranja 🌅
  - Noche (8pm-6am): Cielo oscuro con estrellas 🌙
- **Transiciones Suaves:** 3 segundos entre cambios

### 🎨 Diseño
- **Interfaz Moderna:** Tailwind CSS + Glass Morphism
- **Nubes Realistas:** SVG con texto "Made"
- **Animaciones Suaves:** Flotación, balanceo, transiciones
- **Responsive:** Funciona en desktop y móvil

### 📊 Panel de Información
- Contador de tulipanes
- Tulipanes saludables
- Tulipanes que necesitan agua
- Historial de riegos del día
- Días creciendo (máximo 5)
- Etapa actual

## 🚀 Cómo Usar

1. **Abre el archivo `index.html` en tu navegador**
2. **Observa cómo crecen tus tulipanes:**
   - Crecen 1 etapa por día automáticamente
   - Se riegan 3 veces al día (sin animación visible)
3. **Juega el juego:**
   - Presiona el botón "🎮 Juego" en la esquina inferior izquierda
   - Responde las 4 preguntas
   - Al terminar, envía la pregunta a WhatsApp

## 💾 Almacenamiento

Todo se guarda en `localStorage`:
- Etapa de crecimiento de cada tulipán
- Historial de riegos
- Fecha de inicio del jardín
- Contador de visitas

## 🛠️ Tecnologías

- **HTML5**
- **CSS3** (Tailwind CSS)
- **JavaScript Vanilla**
- **SVG** (Gráficos)
- **localStorage** (Persistencia)
- **YouTube API** (Música)

## 🎵 Personalizar Música

El proyecto incluye un archivo `config.js` que facilita la personalización de canciones y preguntas.

### Agregar Canciones de Tinny

1. Abre el archivo `config.js`
2. Busca la sección `const TINNY_SONGS = [`
3. Reemplaza los IDs con los de tus canciones favoritas del canal de Tinny:
   - Abre https://www.youtube.com/channel/UCJusEPcWIH9EyYSCqGP-1ew
   - Selecciona una canción
   - Copia el ID de la URL: `youtube.com/watch?v=**ID_AQUI**`
4. Ejemplo:
   ```javascript
   const TINNY_SONGS = [
     "7qiZfIl1KAI",  // Tu canción favorita
     "kJQP7kiw9Fk",  // Otra canción
     "9bZkp7q19f0"   // Más canciones
   ];
   ```
5. Guarda el archivo y recarga la página

### Personalizar Preguntas

1. Abre `config.js`
2. Busca `const CUSTOM_QUESTIONS = [`
3. Modifica las preguntas y respuestas:
   ```javascript
   const CUSTOM_QUESTIONS = [
     {
       question: 'Tu pregunta aquí?',
       options: ['Opción 1', 'Opción 2', 'Opción 3'],
       correct: 0  // Índice de la respuesta correcta (0, 1 o 2)
     }
   ];
   ```

### Cambiar Número de WhatsApp

En `config.js`, busca:
```javascript
const WHATSAPP_NUMBER = "51994240168";
```
Y reemplaza con tu número (sin el +).

## 📱 Optimización para Celular

### Diseño Responsive Completo:
- **iPhone (320px - 428px):** Optimizado completamente
- **Samsung Mediano (360px - 480px):** Diseño perfecto
- **Tablet (768px+):** Versión completa
- **Desktop (1024px+):** Experiencia completa

### SVG Responsive:
- ✅ Sol, Luna y Atardecer ajustados por dispositivo
- ✅ Tulipanes escalados dinámicamente
- ✅ Nubes redimensionadas
- ✅ Texto en SVG adaptado
- ✅ Sin archivos CSS externos
- ✅ Todo integrado en garden.js

### Características Visuales:
- Paneles con fondo semi-transparente
- Botones con iconos grandes y claros
- Colores vibrantes y atractivos
- Animaciones suaves
- Diseño minimalista en celular
- Máxima funcionalidad en espacio reducido

## 🎯 Características Futuras

- Más variedades de flores
- Sistema de logros
- Compartir progreso
- Temas personalizables
- Sonidos ambientales

## 💝 Dedicado

Un jardín especial para alguien especial. Cultiva tulipanes, recibe mensajes de paz y conecta a través de preguntas personalizadas.

---

**Hecho con ❤️ para ti**
