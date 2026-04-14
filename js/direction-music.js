/**
 * direction-music.js - Универсальный плеер для всех направлений
 */

document.addEventListener('DOMContentLoaded', function() {
    // Определяем текущую страницу
    const currentPage = window.location.pathname;
    // Декодируем URL для правильного сравнения с кириллицей
    const decodedPage = decodeURIComponent(currentPage);
    
    let musicFile = 'default-bg.mp3'; // значение по умолчанию
    
    console.log('📄 Оригинальный URL:', currentPage);
    console.log('📄 Декодированный URL:', decodedPage);
    
    // Выбираем музыку в зависимости от страницы (используем декодированный URL)
    if (decodedPage.includes('contemporary')) {
        musicFile = 'contemporary.mp3';
    } else if (decodedPage.includes('Хип-хоп') || decodedPage.includes('хип-хоп') || decodedPage.includes('hiphop')) {
        musicFile = 'hiphop.mp3';
    } else if (decodedPage.includes('СальсаиБачата') || decodedPage.includes('сальса') || decodedPage.includes('бачата')) {
        musicFile = 'salsa.mp3';
    } else if (decodedPage.includes('Jazz-funk') || decodedPage.includes('jazz-funk') || decodedPage.includes('jazzfunk')) {
        musicFile = 'jazzfunk.mp3';
    } else if (decodedPage.includes('Dancehall') || decodedPage.includes('dancehall')) {
        musicFile = 'dancehall.mp3';
    } else if (decodedPage.includes('Стретчинг') || decodedPage.includes('стретчинг') || decodedPage.includes('stretching')) {
        musicFile = 'stretching.mp3';
    }
    
    console.log(`🎵 Выбрана музыка: ${musicFile} для страницы: ${decodedPage}`);
    
    // Создаём аудиоэлемент динамически
    const audio = new Audio(`/sounds/${musicFile}`);
    audio.loop = true;
    audio.volume = 0.3;
    
    // Обработка ошибки загрузки аудио
    audio.addEventListener('error', (e) => {
        console.error(`❌ Ошибка загрузки музыки: /sounds/${musicFile}`);
        if (toggleBtn) {
            toggleBtn.innerHTML = '<span class="music-icon">⚠️</span><span class="music-text">Музыка не найдена</span>';
        }
    });
    
    // Создаём кнопку управления
    const playerContainer = document.createElement('div');
    playerContainer.className = 'music-player';
    playerContainer.id = 'musicPlayer';
    playerContainer.innerHTML = `
        <button class="music-control-btn" id="musicToggleBtn">
            <span class="music-icon">🔊</span>
            <span class="music-text">Музыка направления</span>
        </button>
    `;
    document.body.appendChild(playerContainer);
    
    const toggleBtn = document.getElementById('musicToggleBtn');
    let isPlaying = false;
    let autoPlayAttempted = false;
    
    function updateButtonUI() {
        if (isPlaying) {
            toggleBtn.innerHTML = '<span class="music-icon">🔊</span><span class="music-text">Музыка играет</span>';
            toggleBtn.classList.add('playing');
        } else {
            toggleBtn.innerHTML = '<span class="music-icon">🔇</span><span class="music-text">Музыка остановлена</span>';
            toggleBtn.classList.remove('playing');
        }
    }
    
    function playMusic() {
        if (isPlaying) return;
        
        audio.play().then(() => {
            isPlaying = true;
            updateButtonUI();
            console.log('🎵 Музыка воспроизводится');
        }).catch(e => {
            console.log('Автовоспроизведение заблокировано:', e);
            if (!autoPlayAttempted) {
                toggleBtn.innerHTML = '<span class="music-icon">🎵</span><span class="music-text">Нажмите, чтобы включить</span>';
                toggleBtn.style.animation = 'pulse 1s ease';
                autoPlayAttempted = true;
            }
        });
    }
    
    function stopMusic() {
        if (!isPlaying) return;
        
        audio.pause();
        isPlaying = false;
        updateButtonUI();
        console.log('🔇 Музыка остановлена');
    }
    
    // Обработчик клика
    toggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            stopMusic();
        } else {
            playMusic();
        }
    });
    
    // Пробуем запустить автоматически с небольшой задержкой
    setTimeout(playMusic, 500);
});