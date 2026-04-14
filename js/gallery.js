/**
 * gallery.js - Галерея направлений с адаптацией и звуком
 */

// Массив с направлениями танцев
const danceStyles = [
    { 
        name: "CONTEMPORARY", 
        description: "Танец души, где эмоции становятся движением. Свобода, импровизация, чувственность.", 
        image: "/images/contemporary.jpg",
        link: "/styles/contemporary.html",
        sound: "/sounds/contemporary.mp3"//звук
    },
    { 
        name: "ХИП-ХОП",
        description: "Уличная энергия, драйв и характер. Базовые движения, кач, стиль.",
        image: "/images/Хипхоп.jpg",
        link: "/styles/Хип-хоп.html",
        sound: "/sounds/hiphop.mp3"
    },
    { 
        name: "САЛЬСА И БАЧАТА",
        description: "Страсть латиноамериканских ритмов. Парное танго, музыкальность, клубные вечера.",
        image: "/images/СальсаиБачата.jpg",
        link: "/styles/СальсаиБачата.html",
        sound: "/sounds/salsa.mp3"
    },
    { 
        name: "JAZZ-FUNK / HEELS",
        description: "Стиль и сексуальность. Четкая техника, каблуки, шоу-номер.",
        image: "/images/jazzfunk.jpg",
        link: "/styles/Jazz-funk.html",
        sound: "/sounds/jazzfunk.mp3"
    },
    { 
        name: "DANCEHALL",
        description: "Ямайский стиль, ритмы регги. Движения бедрами, свобода самовыражения.",
        image: "/images/dancehall.jpg",
        link: "/styles/Dancehall.html",
        sound: "/sounds/dancehall.mp3"
    },
    { 
        name: "СТРЕТЧИНГ",
        description: "Гибкость, здоровье, грация. Растяжка для танцоров и не только.",
        image: "/images/Стретчинг.jpg",
        link: "/styles/Стретчинг.html",
        sound: "/sounds/stretching.mp3"
    }
];

// Переменные
let currentIndex = 0;
let currentAudio = null;

const gallery = document.getElementById('danceGallery');
const indicators = document.getElementById('indicators');

// Функция для воспроизведения звука
function playSound(soundPath) {
    if (!soundPath) return;
    
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    currentAudio = new Audio(soundPath);
    currentAudio.volume = 0.25;
    currentAudio.play().catch(e => console.log('Звук не воспроизведён'));
}

// Функция для создания карточек
function renderGallery() {
    if (!gallery) return;
    
    gallery.innerHTML = '';
    
    const prevIndex = (currentIndex - 1 + danceStyles.length) % danceStyles.length;
    const nextIndex = (currentIndex + 1) % danceStyles.length;
    
    const leftItem = createGalleryItem(danceStyles[prevIndex], 'side left');
    const centerItem = createGalleryItem(danceStyles[currentIndex], 'center');
    const rightItem = createGalleryItem(danceStyles[nextIndex], 'side right');
    
    gallery.appendChild(leftItem);
    gallery.appendChild(centerItem);
    gallery.appendChild(rightItem);
    
    renderIndicators();
}

// Функция создания элемента
function createGalleryItem(dance, className) {
    const item = document.createElement('div');
    item.className = `gallery-item ${className}`;
    
    const imgUrl = dance.image;
    
    item.innerHTML = `
        <img src="${imgUrl}" 
             alt="${dance.name}" 
             onerror="this.src='https://via.placeholder.com/600x800/79170c/ffffff?text=${encodeURIComponent(dance.name)}'">
        <div class="dance-overlay">
            <div class="dance-title" data-link="${dance.link}">${dance.name}</div>
            <div class="dance-description">${dance.description}</div>
        </div>
    `;
    
    const title = item.querySelector('.dance-title');
    
    title.addEventListener('click', (e) => {
        e.stopPropagation();
        window.location.href = dance.link;
    });
    
    return item;
}

// Индикаторы
function renderIndicators() {
    if (!indicators) return;
    
    indicators.innerHTML = '';
    danceStyles.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === currentIndex ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(indicator);
    });
}

// Навигация с звуком
function nextSlide() {
    const nextIndex = (currentIndex + 1) % danceStyles.length;
    playSound(danceStyles[nextIndex].sound);
    currentIndex = nextIndex;
    renderGallery();
}

function prevSlide() {
    const prevIndex = (currentIndex - 1 + danceStyles.length) % danceStyles.length;
    playSound(danceStyles[prevIndex].sound);
    currentIndex = prevIndex;
    renderGallery();
}

function goToSlide(index) {
    playSound(danceStyles[index].sound);
    currentIndex = index;
    renderGallery();
}

// Свайпы
let touchStartX = 0;
let touchEndX = 0;

if (gallery) {
    gallery.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    gallery.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide();
    }
}

// Клавиатура
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Запуск
renderGallery();