/**
 * search.js - Поиск по сайту (с встроенными данными)
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Скрипт поиска загружен');
    
    // Элементы
    const searchBtn = document.getElementById('searchFloatBtn');
    const modal = document.getElementById('searchModal');
    const closeBtn = document.getElementById('searchModalClose');
    const searchInput = document.getElementById('modalSearchInput');
    const clearBtn = document.getElementById('modalClearSearch');
    const resultsContainer = document.getElementById('modalSearchResults');
    const statsContainer = document.getElementById('modalSearchStats');
    
    if (!searchBtn || !modal || !searchInput) {
        console.error('❌ Не найдены элементы поиска!');
        return;
    }
    
    // ===== ДАННЫЕ ДЛЯ ПОИСКА (ПРЯМО ЗДЕСЬ) =====
    const searchData = [
    // ===== ГЛАВНАЯ СТРАНИЦА =====
    {
        title: "Главная - Feel & Move",
        url: "/index.html",
        content: "Танцевальная студия Feel & Move в Воронеже. Contemporary, хип-хоп, сальса, бачата, dancehall, стретчинг. Пробные занятия, преподаватели, расписание.",
        keywords: ["главная", "студия", "танцы", "воронеж"]
    },
    
    // ===== ВСЕ НАПРАВЛЕНИЯ (ОБЩАЯ СТРАНИЦА) =====
    {
        title: "Все направления танцев",
        url: "/styles/DanceStyle.html",
        content: "Все направления танцев в студии Feel & Move: Contemporary (современный танец), Хип-хоп (уличные танцы), Сальса и Бачата (латиноамериканские танцы), Dancehall (ямайский стиль), Jazz-funk / Heels (сценический танец), Стретчинг (растяжка и гибкость). Подробное описание каждого стиля, преподаватели, видео и фото.",
        keywords: ["направления", "все направления", "стили танцев", "виды танцев", "танцевальные стили", "dance styles"]
    },
    
    // ===== ОТДЕЛЬНЫЕ СТРАНИЦЫ НАПРАВЛЕНИЙ =====
    {
        title: "Contemporary - современный танец",
        url: "/styles/contemporary.html",
        content: "Contemporary — современный танец, смесь классического балета, модерна и джаза. Эмоции, импровизация, свобода движения, работа с дыханием. Преподаватели: Анна Смирнова, Елена Ковалёва.",
        keywords: ["contemporary", "современный танец", "эмоции", "пластика", "анна смирнова"]
    },
    {
        title: "Хип-хоп - уличные танцы",
        url: "/styles/hiphop.html",
        content: "Хип-хоп — уличные танцы, драйв и энергия. Breaking, popping, locking. Преподаватели: Максим Волков, Итан Шмит. Занятия для всех уровней подготовки.",
        keywords: ["хип-хоп", "hip-hop", "уличные танцы", "драйв", "максим волков"]
    },
    {
        title: "Сальса и Бачата - латиноамериканские танцы",
        url: "/styles/salsa.html",
        content: "Сальса и бачата — латиноамериканские парные танцы. Страсть, ритм, музыкальность. Преподаватели: Итан Шмит, Елена Ковалёва. Социальные танцы для всех возрастов.",
        keywords: ["сальса", "бачата", "латина", "парные танцы", "итан шмит"]
    },
    {
        title: "Dancehall - ямайский стиль",
        url: "/styles/dancehall.html",
        content: "Dancehall — ямайский стиль, энергия и свобода. Ритмичные движения бёдрами, культура Ямайки. Преподаватель: Итан Шмит. Раскрепощение и позитив.",
        keywords: ["dancehall", "ямайский стиль", "регги", "раскрепощение"]
    },
    {
        title: "Jazz-funk / Heels - сценический танец",
        url: "/styles/jazzfunk.html",
        content: "Jazz-funk и Heels — сценический танец на каблуках. Образ, харизма, уверенность. Преподаватели: Максим Волков, Анна Смирнова. Хореография под поп-музыку.",
        keywords: ["jazz-funk", "хилс", "heels", "каблуки", "сценический танец"]
    },
    {
        title: "Стретчинг - растяжка и гибкость",
        url: "/styles/stretching.html",
        content: "Стретчинг — растяжка и гибкость для всех. Шпагаты, мосты, здоровье спины. Преподаватели: Анна Смирнова, Елена Ковалёва. Подходит для любого возраста.",
        keywords: ["стретчинг", "растяжка", "гибкость", "шпагат", "здоровье спины"]
    },
    
    // ===== ПРЕПОДАВАТЕЛИ =====
    {
        title: "Все преподаватели",
        url: "/teachers/couchmain.html",
        content: "Преподаватели танцевальной студии Feel & Move: Анна Смирнова (contemporary, стретчинг, jazz-funk), Елена Ковалёва (contemporary, стретчинг, сальса), Максим Волков (хип-хоп, jazz-funk), Итан Шмит (dancehall, хип-хоп, сальса, бачата).",
        keywords: ["преподаватели", "педагоги", "тренеры"]
    },
    {
        title: "Анна Смирнова - преподаватель",
        url: "/teachers/teacher1.html",
        content: "Анна Смирнова — преподаватель contemporary, стретчинг, jazz-funk. Стаж 12 лет. Выпускница Академии Русского балета. Участница международных фестивалей.",
        keywords: ["анна смирнова", "анна", "преподаватель contemporary"]
    },
    {
        title: "Максим Волков - преподаватель",
        url: "/teachers/teacher2.html",
        content: "Максим Волков — преподаватель хип-хоп, jazz-funk. Чемпион России по хип-хопу 2021 года. Стажировался в США у легенд уличной сцены.",
        keywords: ["максим волков", "максим", "преподаватель хип-хоп"]
    },
    {
        title: "Итан Шмит - преподаватель",
        url: "/teachers/teacher4.html",
        content: "Итан Шмит — преподаватель dancehall, хип-хоп, сальса, бачата. Учился на Кубе и в Доминиканской Республике. Носитель культуры dancehall.",
        keywords: ["итан шмит", "итан", "преподаватель dancehall", "преподаватель сальсы"]
    },
    {
        title: "Елена Ковалёва - преподаватель",
        url: "/teachers/teacher4.html",
        content: "Елена Ковалёва — преподаватель contemporary, стретчинг, сальса, бачата. Соединяет contemporary и латину. Учит чувствовать партнёра и музыку.",
        keywords: ["елена ковалёва", "елена", "преподаватель стретчинг"]
    },
    
    // ===== ОСТАЛЬНЫЕ СТРАНИЦЫ =====
    {
        title: "Стоимость занятий",
        url: "/cost/cost.html",
        content: "Цены на групповые и индивидуальные занятия. Абонементы: Стандарт, Регулярный, Развитие. Свадебный танец, постановка номера, корпоративы.",
        keywords: ["стоимость", "цены", "абонементы", "прайс", "тарифы"]
    },
    {
        title: "Контакты",
        url: "/contacts/contacts.html",
        content: "Наш адрес: г. Воронеж, Ленинский проспект, 14. Телефон: +7 (111) 111-11-11. Email: info@feelmove.ru. Карта проезда, график работы.",
        keywords: ["контакты", "адрес", "телефон", "email", "воронеж", "карта"]
    },
    {
        title: "Частые вопросы",
        url: "/commonquestion/commonquestions.html",
        content: "Ответы на вопросы: можно ли начать с нуля, что брать на занятие, как часто заниматься, нужен ли партнёр для сальсы. Форма обратной связи.",
        keywords: ["faq", "вопросы", "ответы", "помощь", "поддержка"]
    },
    {
        title: "События и мероприятия",
        url: "/events/events.html",
        content: "Наши события: Gala Concert, Afro-Fusion Intensive, мастер-класс по Dancehall, Hip Hop Urban Flow, Salsa Sensual, Sunset Dance Battle.",
        keywords: ["события", "мероприятия", "концерт", "мастер-класс", "баттл", "вечеринка"]
    },
    
    // ===== ЮРИДИЧЕСКИЕ СТРАНИЦЫ =====
    {
        title: "Политика конфиденциальности",
        url: "/legal/legal.html#privacy",
        content: "Политика конфиденциальности сайта. Как мы собираем, храним и защищаем персональные данные пользователей.",
        keywords: ["политика конфиденциальности", "персональные данные", "защита данных", "конфиденциальность"]
    },
    {
        title: "Пользовательское соглашение",
        url: "/legal/legal.html#terms",
        content: "Пользовательское соглашение сайта. Правила использования сайта, оплата занятий, возврат средств, ответственность сторон.",
        keywords: ["пользовательское соглашение", "условия использования", "оферта", "правила сайта"]
    }
];
    console.log('✅ Данные загружены:', searchData.length, 'страниц');
    
    // Настройки поиска
    const fuseOptions = {
        includeScore: true,
        includeMatches: true,
        threshold: 0.3,
        minMatchCharLength: 2,
        keys: [
            { name: 'title', weight: 2 },
            { name: 'content', weight: 1 },
            { name: 'keywords', weight: 1.5 }
        ]
    };
    
    // Создаём экземпляр Fuse
    const fuse = new Fuse(searchData, fuseOptions);
    console.log('✅ Поиск готов к работе');
    
    // Открыть модальное окно
    function openModal() {
        console.log('📂 Открываем модальное окно');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        setTimeout(() => searchInput.focus(), 200);
        showWelcome();
    }
    
    // Закрыть модальное окно
    function closeModal() {
        console.log('📁 Закрываем модальное окно');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // Показать приветствие
    function showWelcome() {
        resultsContainer.innerHTML = `
            <div class="search-welcome">
                <p>🔍 Введите слово или фразу для поиска</p>
                <p style="font-size: 0.9rem; color: #999; margin-top: 10px;">минимум 2 символа</p>
            </div>
        `;
        if (statsContainer) statsContainer.innerHTML = '';
    }
    
    // Выполнить поиск
    function performSearch(query) {
        console.log('🔎 Поиск:', query);
        
        query = query.trim();
        
        if (query.length < 2) {
            if (query.length === 0) {
                showWelcome();
            } else {
                resultsContainer.innerHTML = '<div class="search-welcome">✏️ Введите минимум 2 символа</div>';
            }
            if (statsContainer) statsContainer.innerHTML = '';
            return;
        }
        
        const results = fuse.search(query);
        console.log('📊 Найдено результатов:', results.length);
        
        // Статистика
        if (statsContainer) {
            if (results.length === 0) {
                statsContainer.innerHTML = `По запросу «${query}» ничего не найдено`;
            } else {
                const wordForm = results.length === 1 ? 'результат' : 
                                (results.length <= 4 ? 'результата' : 'результатов');
                statsContainer.innerHTML = `Найдено ${results.length} ${wordForm}`;
            }
        }
        
        // Результаты
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-no-results">
                    <p style="font-size: 2rem; margin-bottom: 10px;">😕</p>
                    <p>Ничего не найдено по запросу «${query}»</p>
                </div>
            `;
            return;
        }
        
        // Показываем результаты
        let html = '';
        results.slice(0, 5).forEach(result => {
            const item = result.item;
            html += `
                <div class="search-result-item" onclick="window.location.href='${item.url}'">
                    <a href="${item.url}" class="search-result-title">${item.title}</a>
                    <div class="search-result-content">${item.content.substring(0, 120)}...</div>
                    <span class="search-result-url">${item.url}</span>
                </div>
            `;
        });
        
        if (results.length > 5) {
            html += `<div style="text-align: center; padding: 15px; color: #666;">+ ещё ${results.length - 5} результатов</div>`;
        }
        
        resultsContainer.innerHTML = html;
    }
    
    // Обработчики
    searchBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    
    // Закрытие по клику вне окна
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    // Поиск при вводе
    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });
    
    // Очистка поля
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
        showWelcome();
        if (statsContainer) statsContainer.innerHTML = '';
    });
    
    // Показываем приветствие
    showWelcome();
});
