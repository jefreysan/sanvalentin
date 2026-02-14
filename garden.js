// Sistema de música intermitente de Tinny
let musicTimeout = null;
let isMusicPlaying = false;
let musicPanelOpen = false;

// Usar la lista de canciones de config.js si existe, sino usar la lista por defecto
const tinnyPlaylist = (typeof TINNY_SONGS !== 'undefined') ? TINNY_SONGS : [
  { id: "SydGHrvcTZA", title: "Tinny - Canción 1" },
  { id: "aaCQGAREeZk", title: "Tinny - Canción 2" },
  { id: "3BVHzsglnto", title: "Tinny - Canción 3" },
  { id: "4k1fm6YNsg8", title: "Tinny - Canción 4" },
  { id: "FaQiQ3zuzPg", title: "Tinny - Canción 5" }
];

function getRandomTinnySong() {
  return tinnyPlaylist[Math.floor(Math.random() * tinnyPlaylist.length)];
}

function showNowPlaying(songTitle) {
  const nowPlayingDiv = document.getElementById('nowPlaying');
  if (nowPlayingDiv) {
    nowPlayingDiv.innerHTML = `<div class="text-sm font-semibold text-green-600">🎵 Reproduciendo: ${songTitle}</div>`;
    nowPlayingDiv.classList.remove('hidden');
  }
}

function hideNowPlaying() {
  const nowPlayingDiv = document.getElementById('nowPlaying');
  if (nowPlayingDiv) {
    nowPlayingDiv.classList.add('hidden');
  }
}

function playRandomMusic() {
  const song = getRandomTinnySong();
  
  // Crear un iframe para reproducir desde YouTube
  const iframe = document.createElement('iframe');
  iframe.width = "0";
  iframe.height = "0";
  iframe.src = `https://www.youtube.com/embed/${song.id}?autoplay=1&controls=0`;
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.style.display = "none";
  iframe.style.border = "none";
  iframe.style.visibility = "hidden";
  iframe.style.position = "absolute";
  iframe.style.left = "-9999px";
  
  // Limpiar iframe anterior si existe
  const oldIframe = document.getElementById('musicIframe');
  if (oldIframe) oldIframe.remove();
  
  iframe.id = 'musicIframe';
  document.body.appendChild(iframe);
  
  isMusicPlaying = true;
  
  // Mostrar la canción que se está reproduciendo
  showNowPlaying(song.title);
  
  // Detener la música después de 2-4 minutos (intermitente)
  const stopTime = Math.random() * 120000 + 120000; // 2-4 minutos
  setTimeout(() => {
    iframe.src = "";
    isMusicPlaying = false;
    hideNowPlaying();
    scheduleNextMusic();
  }, stopTime);
}

function scheduleNextMusic() {
  // Esperar 3-8 minutos antes de reproducir la siguiente canción
  const waitTime = Math.random() * 300000 + 180000; // 3-8 minutos
  musicTimeout = setTimeout(() => {
    playRandomMusic();
  }, waitTime);
}

function startMusicSystem() {
  // Iniciar el sistema de música después de 5 segundos
  setTimeout(() => {
    scheduleNextMusic();
  }, 5000);
}

function toggleMusicPanel() {
  const musicPanel = document.getElementById('musicPanel');
  musicPanelOpen = !musicPanelOpen;
  
  if (musicPanelOpen) {
    musicPanel.style.display = 'block';
  } else {
    musicPanel.style.display = 'none';
  }
}

function playRandomMusicManual() {
  const song = getRandomTinnySong();
  const nowPlayingText = document.getElementById('nowPlayingText');
  const audioPlayer = document.getElementById('audioPlayer');
  
  // Usar un servicio de proxy para obtener audio de YouTube
  const audioUrl = `https://www.youtube.com/watch?v=${song.id}`;
  
  // Mostrar la canción
  nowPlayingText.textContent = `🎵 ${song.title}`;
  
  // Abrir YouTube en una nueva ventana
  window.open(audioUrl, '_blank');
  
  isMusicPlaying = true;
}

function stopMusicManual() {
  const audioPlayer = document.getElementById('audioPlayer');
  const nowPlayingText = document.getElementById('nowPlayingText');
  
  audioPlayer.pause();
  audioPlayer.src = '';
  nowPlayingText.textContent = 'Selecciona una canción';
  
  isMusicPlaying = false;
}

function createCloudSVG(text = 'Made') {
  return `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" class="w-40 h-16">
    <!-- Nube simple y realista -->
    <g>
      <!-- Círculos principales de la nube -->
      <circle cx="40" cy="60" r="30" fill="#ffffff" opacity="0.9"/>
      <circle cx="80" cy="40" r="40" fill="#ffffff" opacity="0.9"/>
      <circle cx="130" cy="45" r="38" fill="#ffffff" opacity="0.9"/>
      <circle cx="170" cy="60" r="30" fill="#ffffff" opacity="0.9"/>
      
      <!-- Base de la nube -->
      <rect x="25" y="60" width="155" height="35" fill="#ffffff" opacity="0.9" rx="10"/>
      
      <!-- Sombra sutil -->
      <ellipse cx="100" cy="65" rx="85" ry="12" fill="#e0e0e0" opacity="0.3"/>
      
      <!-- Texto "Made" -->
      <text x="100" y="82" font-size="16" font-weight="bold" text-anchor="middle" fill="#b0b0b0" font-family="Arial, sans-serif">
        Made
      </text>
    </g>
  </svg>`;
}

const tranquilityPhrases = [
  "Respira profundo, todo está bien", "Este momento es tuyo, disfrútalo", "La paz comienza dentro de ti",
  "Cada día es una nueva oportunidad", "Eres más fuerte de lo que crees", "Permítete descansar",
  "La calma es tu fortaleza", "Vive el presente", "Eres suficiente tal como eres",
  "La naturaleza te enseña paciencia", "Encuentra paz en la simplicidad", "Tu bienestar es importante",
  "Respira, estás seguro", "La vida fluye con gracia", "Cultiva la paz en tu corazón",
  "Cada momento es un regalo", "Eres digno de amor y cuidado", "La tranquilidad es tu derecho",
  "Escucha el silencio", "Crece a tu propio ritmo", "La paciencia trae frutos",
  "Eres un ser hermoso", "Encuentra belleza en lo simple", "Tu paz es tu poder",
  "Vive sin prisa", "La serenidad te espera", "Eres libre de ser tú",
  "Cultiva lo que amas", "La calma es medicina", "Hoy es un buen día para respirar",
  "Te quiero más cada día", "Eres mi paz", "Tu amor me calma", "Contigo todo es tranquilo",
  "Eres mi serenidad", "Te quiero en silencio", "Mi corazón descansa en ti",
  "Eres mi refugio seguro", "Te quiero sin prisa", "En ti encuentro paz",
  "Eres mi calma", "Te quiero profundamente", "Contigo respiro tranquilo",
  "Eres mi tranquilidad", "Te quiero con el alma", "Mi paz eres tú",
  "Eres mi descanso", "Te quiero eternamente", "Contigo todo es posible", "Eres mi amor verdadero"
];

function createSunSVG() {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 drop-shadow-lg">
    <!-- Rayos del sol -->
    <g stroke="#fbbf24" stroke-width="4" stroke-linecap="round">
      <line x1="60" y1="8" x2="60" y2="28"/>
      <line x1="60" y1="92" x2="60" y2="112"/>
      <line x1="8" y1="60" x2="28" y2="60"/>
      <line x1="92" y1="60" x2="112" y2="60"/>
      <line x1="18" y1="18" x2="35" y2="35"/>
      <line x1="85" y1="85" x2="102" y2="102"/>
      <line x1="102" y1="18" x2="85" y2="35"/>
      <line x1="35" y1="85" x2="18" y2="102"/>
    </g>
    <!-- Círculo del sol -->
    <circle cx="60" cy="60" r="38" fill="#fbbf24" opacity="0.95"/>
    <circle cx="60" cy="60" r="36" fill="#fcd34d"/>
    <!-- Brillo interior -->
    <circle cx="55" cy="55" r="20" fill="#fef3c7" opacity="0.6"/>
  </svg>`;
}

function createMoonSVG() {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 drop-shadow-lg">
    <!-- Luna creciente -->
    <circle cx="60" cy="60" r="42" fill="#f3f4f6"/>
    <circle cx="72" cy="54" r="42" fill="#1a1a2e"/>
    <!-- Cráteres -->
    <circle cx="45" cy="45" r="4" fill="#e5e7eb" opacity="0.7"/>
    <circle cx="65" cy="65" r="3" fill="#e5e7eb" opacity="0.7"/>
    <circle cx="50" cy="70" r="3.5" fill="#e5e7eb" opacity="0.7"/>
    <circle cx="70" cy="50" r="2.5" fill="#e5e7eb" opacity="0.7"/>
    <!-- Brillo -->
    <circle cx="50" cy="50" r="15" fill="#ffffff" opacity="0.15"/>
  </svg>`;
}

function createSunsetSVG() {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 drop-shadow-lg">
    <!-- Rayos del atardecer -->
    <g stroke="#f97316" stroke-width="3" stroke-linecap="round" opacity="0.8">
      <line x1="60" y1="10" x2="60" y2="28"/>
      <line x1="60" y1="92" x2="60" y2="110"/>
      <line x1="10" y1="60" x2="28" y2="60"/>
      <line x1="92" y1="60" x2="110" y2="60"/>
      <line x1="22" y1="22" x2="38" y2="38"/>
      <line x1="82" y1="82" x2="98" y2="98"/>
      <line x1="98" y1="22" x2="82" y2="38"/>
      <line x1="38" y1="82" x2="22" y2="98"/>
    </g>
    <!-- Círculo del atardecer -->
    <circle cx="60" cy="60" r="36" fill="#f97316" opacity="0.95"/>
    <circle cx="60" cy="60" r="34" fill="#fb923c"/>
    <!-- Brillo -->
    <circle cx="55" cy="55" r="18" fill="#fbbf24" opacity="0.5"/>
  </svg>`;
}

const tulipColors = [
  { name: 'Blanco', color: '#f5f5f5', stages: ['🌱', '🌱', '🌿', '🌿', 'tulip', 'tulip', 'tulip'] },
  { name: 'Tierra', color: '#d4a574', stages: ['🌱', '🌱', '🌿', '🌿', 'tulip', 'tulip', 'tulip'] },
  { name: 'Amarillo', color: '#f4d89f', stages: ['🌱', '🌱', '🌿', '🌿', 'tulip', 'tulip', 'tulip'] },
  { name: 'Rosa Suave', color: '#f5c6d8', stages: ['🌱', '🌱', '🌿', '🌿', 'tulip', 'tulip', 'tulip'] },
  { name: 'Lavanda', color: '#e6d9f0', stages: ['🌱', '🌱', '🌿', '🌿', 'tulip', 'tulip', 'tulip'] },
  { name: 'Melocotón', color: '#f5d5c0', stages: ['🌱', '🌱', '🌿', '🌿', 'tulip', 'tulip', 'tulip'] }
];

function createTulipSVG(color, scale = 1) {
  return `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" class="w-12 h-16" style="transform: scale(${scale})">
    <!-- Tallo -->
    <path d="M 50 120 Q 48 100 50 80 Q 52 60 50 40" stroke="#22c55e" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Hoja izquierda -->
    <path d="M 50 80 Q 35 70 30 50" stroke="#16a34a" stroke-width="2" fill="none" stroke-linecap="round"/>
    <!-- Hoja derecha -->
    <path d="M 50 80 Q 65 70 70 50" stroke="#16a34a" stroke-width="2" fill="none" stroke-linecap="round"/>
    <!-- Pétalos del tulipán -->
    <ellipse cx="50" cy="30" rx="12" ry="20" fill="${color}" opacity="0.9"/>
    <ellipse cx="38" cy="35" rx="11" ry="18" fill="${color}" opacity="0.85"/>
    <ellipse cx="62" cy="35" rx="11" ry="18" fill="${color}" opacity="0.85"/>
    <!-- Sombra interior -->
    <ellipse cx="50" cy="35" rx="8" ry="12" fill="rgba(0,0,0,0.1)"/>
  </svg>`;
}

let plants = [];
let visitCount = 1;
const today = new Date().toDateString();
const lastVisitDate = localStorage.getItem('lastVisitDate');

if (lastVisitDate !== today) {
  visitCount = parseInt(localStorage.getItem('visitCount') || '0') + 1;
  localStorage.setItem('visitCount', visitCount);
  localStorage.setItem('lastVisitDate', today);
} else {
  visitCount = parseInt(localStorage.getItem('visitCount') || '1');
}

// Sistema para verificar si el juego debe estar activo
function isGameActive() {
  const gameStartDate = localStorage.getItem('gameStartDate');
  if (!gameStartDate) {
    return false;
  }
  const today = new Date().toDateString();
  return gameStartDate <= today;
}

function initializeGame() {
  const gameStartDate = localStorage.getItem('gameStartDate');
  if (!gameStartDate) {
    // Establecer que el juego comience mañana
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    localStorage.setItem('gameStartDate', tomorrow.toDateString());
  }
}

// Generar estrellas
function generateStars() {
  const starsContainer = document.getElementById('stars');
  starsContainer.innerHTML = '';
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.className = 'star absolute w-0.5 h-0.5 bg-white rounded-full';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 60 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    starsContainer.appendChild(star);
  }
}

// Sistema de ciclo día/noche según hora peruana (UTC-5)
function getPeruTime() {
  const now = new Date();
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
  const peruTime = new Date(utcTime - (5 * 60 * 60 * 1000));
  return peruTime.getHours();
}

// Actualizar reloj en tiempo real
function updateClock() {
  const now = new Date();
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
  const peruTime = new Date(utcTime - (5 * 60 * 60 * 1000));
  
  const hours = String(peruTime.getHours()).padStart(2, '0');
  const minutes = String(peruTime.getMinutes()).padStart(2, '0');
  
  const clockDisplay = document.getElementById('clockDisplay');
  if (clockDisplay) {
    clockDisplay.textContent = `${hours}:${minutes}`;
  }
}

function updateDayNightCycle() {
  const hour = getPeruTime();
  const body = document.body;
  const sky = document.getElementById('sky');
  const ocean = document.getElementById('ocean');
  const sand = document.getElementById('sand');
  const vegetation = document.getElementById('vegetation');
  const stars = document.getElementById('stars');
  const celestialBody = document.getElementById('celestialBody');

  body.classList.remove('bg-morning', 'bg-afternoon', 'bg-evening', 'bg-night');
  sky.classList.remove('sky-morning', 'sky-afternoon', 'sky-evening', 'sky-night');
  ocean.classList.remove('ocean-morning', 'ocean-afternoon', 'ocean-evening', 'ocean-night');
  sand.classList.remove('sand-morning', 'sand-afternoon', 'sand-evening', 'sand-night');
  vegetation.classList.remove('veg-morning', 'veg-afternoon', 'veg-evening', 'veg-night');

  if (hour >= 6 && hour < 12) {
    body.classList.add('bg-morning');
    sky.classList.add('sky-morning');
    ocean.classList.add('ocean-morning');
    sand.classList.add('sand-morning');
    vegetation.classList.add('veg-morning');
    stars.classList.add('opacity-0');
    celestialBody.innerHTML = createSunSVG();
    celestialBody.classList.remove('opacity-0');
  } else if (hour >= 12 && hour < 17) {
    body.classList.add('bg-afternoon');
    sky.classList.add('sky-afternoon');
    ocean.classList.add('ocean-afternoon');
    sand.classList.add('sand-afternoon');
    vegetation.classList.add('veg-afternoon');
    stars.classList.add('opacity-0');
    celestialBody.innerHTML = createSunSVG();
    celestialBody.classList.remove('opacity-0');
  } else if (hour >= 17 && hour < 20) {
    body.classList.add('bg-evening');
    sky.classList.add('sky-evening');
    ocean.classList.add('ocean-evening');
    sand.classList.add('sand-evening');
    vegetation.classList.add('veg-evening');
    stars.classList.add('opacity-0');
    celestialBody.innerHTML = createSunsetSVG();
    celestialBody.classList.remove('opacity-0');
  } else {
    body.classList.add('bg-night');
    sky.classList.add('sky-night');
    ocean.classList.add('ocean-night');
    sand.classList.add('sand-night');
    vegetation.classList.add('veg-night');
    stars.classList.remove('opacity-0');
    celestialBody.innerHTML = createMoonSVG();
    celestialBody.classList.remove('opacity-0');
  }
}

// Riego automático 3 veces al día (silencioso, sin animación)
function setupAutoWatering() {
  const checkAutoWater = () => {
    const hour = getPeruTime();
    const minutes = new Date().getMinutes();
    const today = new Date().toDateString();
    
    // Horarios de riego con tolerancia de 30 minutos
    const waterTimes = [
      { hour: 8, minute: 0, name: '8:00 AM' },
      { hour: 15, minute: 0, name: '3:00 PM' },
      { hour: 20, minute: 30, name: '8:30 PM' }
    ];
    
    // Inicializar si es un nuevo día
    const lastAutoWaterDate = localStorage.getItem('lastAutoWaterDate');
    if (lastAutoWaterDate !== today) {
      localStorage.setItem('lastAutoWaterDate', today);
      localStorage.setItem('lastAutoWaterHours', JSON.stringify([]));
    }
    
    const wateredHours = JSON.parse(localStorage.getItem('lastAutoWaterHours') || '[]');
    
    for (let waterTime of waterTimes) {
      const timeKey = `${waterTime.hour}:${waterTime.minute}`;
      const timeDiff = Math.abs((hour * 60 + minutes) - (waterTime.hour * 60 + waterTime.minute));
      
      // Si está dentro de 30 minutos de tolerancia y no ha sido regado
      if (timeDiff <= 30 && !wateredHours.includes(timeKey)) {
        plants.forEach(plant => {
          plant.autoWater();
        });
        wateredHours.push(timeKey);
        localStorage.setItem('lastAutoWaterHours', JSON.stringify(wateredHours));
        break;
      }
    }
  };
  
  checkAutoWater();
  setInterval(checkAutoWater, 60000);
}

// Crecimiento automático diario (solo 1 etapa por día, máximo etapa 6)
function setupDailyGrowth() {
  const checkDailyGrowth = () => {
    const today = new Date().toDateString();
    const lastGrowthDate = localStorage.getItem('lastGrowthDate');
    
    if (lastGrowthDate !== today) {
      plants.forEach(plant => {
        plant.dailyGrowth();
      });
      localStorage.setItem('lastGrowthDate', today);
      updateStats();
    }
  };
  
  checkDailyGrowth();
  setInterval(checkDailyGrowth, 60000);
}

class Tulip {
  constructor(index) {
    this.index = index;
    this.type = tulipColors[index % tulipColors.length];
    this.health = 100;
    this.lastWatered = parseInt(localStorage.getItem(`tulip_${index}_lastWatered`) || Date.now().toString());
    this.element = null;
    this.growthStage = parseInt(localStorage.getItem(`tulip_${index}_growthStage`) || '0');
    this.totalWaterings = parseInt(localStorage.getItem(`tulip_${index}_waterings`) || '0');
  }

  getHealth() {
    const timeSinceWater = Date.now() - this.lastWatered;
    const hoursElapsed = timeSinceWater / (1000 * 60 * 60);
    return Math.max(0, 100 - (hoursElapsed * 5));
  }

  isHealthy() {
    return this.getHealth() > 70;
  }

  needsWater() {
    return this.getHealth() < 50;
  }

  water() {
    if (!isGameActive()) {
      showGameNotStarted();
      return;
    }
    
    const hour = getPeruTime();
    const minutes = new Date().getMinutes();
    const currentTimeInMinutes = hour * 60 + minutes;
    
    // Horarios permitidos con 30 minutos de tolerancia
    const waterTimes = [
      { hour: 8, minute: 0 },
      { hour: 15, minute: 0 },
      { hour: 20, minute: 30 }
    ];
    
    // Verificar si está en horario permitido
    let isInAllowedTime = false;
    for (let wt of waterTimes) {
      const waterTimeInMinutes = wt.hour * 60 + wt.minute;
      const timeDiff = Math.abs(currentTimeInMinutes - waterTimeInMinutes);
      if (timeDiff <= 30) {
        isInAllowedTime = true;
        break;
      }
    }
    
    if (!isInAllowedTime) {
      showTimeAlert();
      return;
    }
    
    this.lastWatered = Date.now();
    this.totalWaterings++;
    localStorage.setItem(`tulip_${this.index}_waterings`, this.totalWaterings.toString());
    localStorage.setItem(`tulip_${this.index}_lastWatered`, this.lastWatered.toString());
    this.updateVisuals();
    this.createWaterEffect();
    updateStats();
    showMessage();
  }

  autoWater() {
    this.lastWatered = Date.now();
    this.totalWaterings++;
    localStorage.setItem(`tulip_${this.index}_waterings`, this.totalWaterings.toString());
    localStorage.setItem(`tulip_${this.index}_lastWatered`, this.lastWatered.toString());
    // Sin animación de agua, sin updateVisuals
  }

  dailyGrowth() {
    if (this.growthStage < 6) {
      this.growthStage++;
      localStorage.setItem(`tulip_${this.index}_growthStage`, this.growthStage.toString());
      this.updateVisuals();
    }
  }

  createWaterEffect() {
    const pot = this.element.querySelector('.pot-base');
    for (let i = 0; i < 5; i++) {
      const drop = document.createElement('div');
      drop.className = 'water-drop absolute w-2 h-2 bg-blue-400 rounded-full';
      drop.style.left = (Math.random() * 60 + 10) + 'px';
      drop.style.top = '-10px';
      pot.appendChild(drop);
      setTimeout(() => drop.remove(), 800);
    }
  }

  updateVisuals() {
    const tulip = this.element.querySelector('.tulip-emoji');
    const health = this.getHealth();
    const stage = this.growthStage;

    const sizes = ['1.5em', '2em', '2.5em', '3em', '3.5em', '4em', '4.5em'];
    
    if (stage < 4) {
      // Mostrar emoji para semilla, germinando, tallo
      tulip.innerHTML = this.type.stages[stage];
      tulip.style.fontSize = sizes[stage];
    } else {
      // Mostrar tulipán SVG en color con escala progresiva
      const scale = 1 + ((stage - 4) * 0.3);
      tulip.innerHTML = createTulipSVG(this.type.color, scale);
      tulip.style.fontSize = 'inherit';
    }

    if (health < 50) {
      tulip.classList.add('tulip-wilted');
    } else {
      tulip.classList.remove('tulip-wilted');
    }
  }

  render() {
    const container = document.createElement('div');
    container.className = 'tulip-pot flex flex-col items-center gap-4';
    container.onclick = () => this.water();

    const potContainer = document.createElement('div');
    potContainer.className = 'relative';

    const pot = document.createElement('div');
    pot.className = 'pot-base w-20 h-16 rounded-b-3xl relative';
    pot.innerHTML = '<div class="soil absolute bottom-1 w-full h-8 rounded-b-2xl"></div>';

    const tulip = document.createElement('div');
    tulip.className = 'tulip-emoji absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center justify-center';
    
    if (this.growthStage < 4) {
      tulip.textContent = this.type.stages[this.growthStage];
      const sizes = ['1.5em', '2em', '2.5em', '3em', '3.5em', '4em', '4.5em'];
      tulip.style.fontSize = sizes[this.growthStage];
    } else {
      const scale = 1 + ((this.growthStage - 4) * 0.3);
      tulip.innerHTML = createTulipSVG(this.type.color, scale);
    }

    pot.appendChild(tulip);
    potContainer.appendChild(pot);

    const label = document.createElement('div');
    label.className = 'text-sm font-semibold text-green-700';
    label.textContent = this.type.name;

    const stageIndicator = document.createElement('div');
    stageIndicator.className = 'text-xs text-green-600 font-medium';
    const stageNames = ['Semilla', 'Germinando', 'Tallo', 'Creciendo', 'Flor', 'Flor Madura', 'Flor Completa'];
    stageIndicator.textContent = `${stageNames[this.growthStage]} (${this.growthStage + 1}/7)`;

    container.appendChild(potContainer);
    container.appendChild(label);
    container.appendChild(stageIndicator);

    this.element = container;
    this.updateVisuals();
    return container;
  }
}

function createGarden() {
  const plantsArea = document.getElementById('plantsArea');
  plantsArea.innerHTML = '';
  plants = [];
  for (let i = 0; i < 6; i++) {
    const tulip = new Tulip(i);
    plants.push(tulip);
    plantsArea.appendChild(tulip.render());
  }
  updateStats();
}

function updateStats() {
  const healthyCount = plants.filter(p => p.isHealthy()).length;
  const needWaterCount = plants.filter(p => p.needsWater()).length;
  document.getElementById('plantCount').textContent = plants.length;
  document.getElementById('healthyCount').textContent = healthyCount;
  document.getElementById('needWaterCount').textContent = needWaterCount;
  
  // Actualizar historial de riegos con horarios
  const wateredHours = JSON.parse(localStorage.getItem('lastAutoWaterHours') || '[]');
  const wateringTimes = [
    { time: '8:00 AM', key: '8:0' },
    { time: '3:00 PM', key: '15:0' },
    { time: '8:30 PM', key: '20:30' }
  ];
  
  const hour = getPeruTime();
  const minutes = new Date().getMinutes();
  const currentTimeInMinutes = hour * 60 + minutes;
  
  let wateringStatus = '';
  let hasAlert = false;
  
  wateringTimes.forEach((wt, idx) => {
    const [wHour, wMin] = wt.key.split(':').map(Number);
    const waterTimeInMinutes = wHour * 60 + wMin;
    const timeDiff = Math.abs(currentTimeInMinutes - waterTimeInMinutes);
    
    let status = wateredHours.includes(wt.key) ? '✓' : '✗';
    let alert = '';
    
    // Alerta si quedan menos de 30 minutos y no ha sido regado
    if (!wateredHours.includes(wt.key) && timeDiff <= 30 && timeDiff > 0) {
      alert = ' ⏰';
      hasAlert = true;
    }
    // Alerta si pasó la hora de tolerancia
    else if (!wateredHours.includes(wt.key) && timeDiff > 30 && waterTimeInMinutes < currentTimeInMinutes) {
      alert = ' ⚠️';
      hasAlert = true;
    }
    
    wateringStatus += `${wt.time}: ${status}${alert}`;
    if (idx < wateringTimes.length - 1) wateringStatus += ' | ';
  });
  
  const historyElement = document.getElementById('wateringHistory');
  if (historyElement) {
    historyElement.innerHTML = `<span class="text-xs">${wateringStatus}</span>`;
    if (hasAlert) {
      historyElement.classList.add('text-yellow-600', 'font-bold');
    } else {
      historyElement.classList.remove('text-yellow-600', 'font-bold');
    }
  }
  
  // Actualizar etapa promedio
  if (plants.length > 0) {
    const avgStage = Math.round(plants.reduce((sum, p) => sum + p.growthStage, 0) / plants.length);
    document.getElementById('currentStage').textContent = avgStage + 1;
  }
}

function showMessage() {
  const phrase = tranquilityPhrases[Math.floor(Math.random() * tranquilityPhrases.length)];
  const messageDiv = document.getElementById('message');
  messageDiv.innerHTML = `<div class="text-2xl md:text-4xl font-bold text-green-700 drop-shadow-lg">${phrase}</div>`;
  messageDiv.classList.remove('message-appear');
  setTimeout(() => {
    messageDiv.classList.add('message-appear');
  }, 10);
}

function showTimeAlert() {
  const messageDiv = document.getElementById('message');
  messageDiv.innerHTML = `<div class="text-2xl md:text-4xl font-bold text-red-600 drop-shadow-lg">⏰ Fuera de horario<br>Riega a: 8am, 3pm, 8:30pm</div>`;
  messageDiv.classList.remove('message-appear');
  setTimeout(() => {
    messageDiv.classList.add('message-appear');
  }, 10);
}

function showGameNotStarted() {
  const messageDiv = document.getElementById('message');
  messageDiv.innerHTML = `<div class="text-2xl md:text-4xl font-bold text-blue-600 drop-shadow-lg">🌱 El juego comienza mañana<br>¡Prepárate!</div>`;
  messageDiv.classList.remove('message-appear');
  setTimeout(() => {
    messageDiv.classList.add('message-appear');
  }, 10);
}

function showFloatingPhrase() {
  const phrase = tranquilityPhrases[Math.floor(Math.random() * tranquilityPhrases.length)];
  const container = document.getElementById('phrasesContainer');
  
  const phraseElement = document.createElement('div');
  phraseElement.className = 'floating-phrase';
  phraseElement.textContent = phrase;
  phraseElement.style.top = Math.random() * 30 + 80 + 'px';
  phraseElement.style.zIndex = Math.floor(Math.random() * 1000);
  
  container.appendChild(phraseElement);
  
  // Eliminar el elemento después de la animación
  setTimeout(() => {
    phraseElement.remove();
  }, 10000);
}



function resetGarden() {
  for (let i = 0; i < 6; i++) {
    localStorage.removeItem(`tulip_${i}_growthStage`);
    localStorage.removeItem(`tulip_${i}_waterings`);
    localStorage.removeItem(`tulip_${i}_lastWatered`);
  }
  localStorage.removeItem('lastGrowthDate');
  localStorage.removeItem('lastAutoWaterDate');
  localStorage.removeItem('lastAutoWaterHour');
  
  plants = [];
  createGarden();
  console.log('Jardín reseteado');
}

// Juego de preguntas
const gameQuestions = [
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

let currentQuestion = 0;
let score = 0;
let shuffledQuestions = [];

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function shuffleOptions(question) {
  const options = [...question.options];
  const correctOption = options[question.correct];
  
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  
  const newCorrectIndex = options.indexOf(correctOption);
  return { options, correct: newCorrectIndex };
}

function openGame() {
  currentQuestion = 0;
  score = 0;
  shuffledQuestions = shuffleArray(gameQuestions);
  document.getElementById('gameModal').classList.remove('hidden');
  showQuestion();
}

function closeGame() {
  document.getElementById('gameModal').classList.add('hidden');
}

function showQuestion() {
  if (currentQuestion < shuffledQuestions.length) {
    const q = shuffledQuestions[currentQuestion];
    const shuffled = shuffleOptions(q);
    
    // Guardar el índice correcto para esta pregunta
    window.currentCorrectAnswer = shuffled.correct;
    
    let html = `
      <div class="mb-8">
        <h3 class="text-2xl font-bold text-green-700 mb-6 text-center font-playfair">${q.question}</h3>
        <div class="space-y-3">
    `;
    
    shuffled.options.forEach((option, idx) => {
      html += `
        <button onclick="answerQuestion(${idx})" class="w-full bg-gradient-to-r from-green-100 to-green-50 hover:from-green-200 hover:to-green-100 text-green-800 font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 border-2 border-green-300 hover:border-green-500 shadow-md">
          <span class="text-lg">${option}</span>
        </button>
      `;
    });
    
    html += `
        </div>
        <div class="mt-8 text-center">
          <div class="inline-block bg-green-100 rounded-full px-6 py-2 border-2 border-green-400">
            <span class="text-sm font-bold text-green-700">Pregunta ${currentQuestion + 1} de ${shuffledQuestions.length}</span>
          </div>
        </div>
      </div>
    `;
    
    document.getElementById('gameContent').innerHTML = html;
  } else {
    showFinalMessage();
  }
}

function answerQuestion(idx) {
  if (idx === window.currentCorrectAnswer) {
    score++;
  }
  currentQuestion++;
  showQuestion();
}

function showFinalMessage() {
  let html = '';
  
  if (score === shuffledQuestions.length) {
    // Solo mostrar felicidades si todas las respuestas son correctas
    html = `
      <div class="text-center space-y-6">
        <div class="text-5xl font-bold text-green-700 font-playfair">¡Felicidades! 🎉</div>
        <p class="text-xl text-green-600 font-semibold">Respondiste todas las preguntas correctamente.</p>
        <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-300 shadow-lg">
          <p class="text-2xl font-bold text-green-700 mb-6 font-playfair">¿Cuánto me quieres?</p>
          <button onclick="sendQuestion()" class="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 text-lg shadow-lg">
            💚 Enviar pregunta por WhatsApp
          </button>
        </div>
      </div>
    `;
  } else {
    // Mostrar resultado si no todas son correctas
    html = `
      <div class="text-center space-y-6">
        <div class="text-4xl font-bold text-orange-600 font-playfair">Resultado: ${score}/${shuffledQuestions.length}</div>
        <p class="text-lg text-orange-600 font-semibold">Respondiste ${score} de ${shuffledQuestions.length} preguntas correctamente.</p>
        <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border-2 border-orange-300 shadow-lg">
          <p class="text-xl font-bold text-orange-700 mb-6">Intenta de nuevo 💪</p>
          <button onclick="openGame()" class="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 text-lg shadow-lg">
            🔄 Reintentar
          </button>
        </div>
      </div>
    `;
  }
  
  document.getElementById('gameContent').innerHTML = html;
}

function sendQuestion() {
  const message = encodeURIComponent('¿Cuánto me quieres?');
  window.open(`https://wa.me/51994240168?text=${message}`, '_blank');
}

// Resetear al cargar si se presiona Ctrl+R
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'r') {
    e.preventDefault();
    resetGarden();
  }
});

// Ejecutar reseteo automático al cargar la página (comentar después de usar)
// resetGarden();

// Renderizar nubes SVG
document.getElementById('cloud1').innerHTML = createCloudSVG('Made');
document.getElementById('cloud2').innerHTML = createCloudSVG('Made');
document.getElementById('cloud3').innerHTML = createCloudSVG('Made');

// Inicializar el juego
initializeGame();

generateStars();
updateDayNightCycle();
setInterval(updateDayNightCycle, 60000);

// Actualizar reloj cada segundo
updateClock();
setInterval(updateClock, 1000);

// Las frases aparecen al hacer clic en las nubes (no automático)

setInterval(() => {
  plants.forEach(plant => plant.updateVisuals());
  updateStats();
}, 60000);

setupAutoWatering();
setupDailyGrowth();

createGarden();
setTimeout(() => showMessage(), 500);

// Iniciar sistema de música intermitente
startMusicSystem();
