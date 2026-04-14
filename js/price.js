/**
 * price-tabs.js - Управление переключением вкладок на странице стоимости
 * Студия танцев Feel & Move
 */

document.addEventListener('DOMContentLoaded', function() {
    // Находим все элементы вкладок и контента
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    // Если на странице нет вкладок, выходим из функции
    if (!tabLinks.length || !tabContents.length) return;

    /**
     * Функция для активации конкретной вкладки
     * @param {string} tabId - ID вкладки, которую нужно показать
     */
    function activateTab(tabId) {
        // Убираем активный класс у всех ссылок
        tabLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Убираем активный класс у всего контента
        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        // Находим и активируем нужную ссылку
        const activeLink = document.querySelector(`.tab-link[data-tab="${tabId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Находим и показываем нужный контент
        const activeContent = document.getElementById(tabId);
        if (activeContent) {
            activeContent.classList.add('active');
        }

        // Сохраняем выбранную вкладку в localStorage (опционально)
        // Чтобы при перезагрузке страницы открывалась последняя выбранная вкладка
        try {
            localStorage.setItem('lastActiveTab', tabId);
        } catch (e) {
            // Игнорируем ошибки localStorage (например, в режиме инкогнито)
        }
    }

    // Добавляем обработчики событий на каждую вкладку
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Предотвращаем возможные проблемы с ссылками
            
            const tabId = this.getAttribute('data-tab');
            if (tabId) {
                activateTab(tabId);
            }
        });

        // Добавляем поддержку клавиши Enter для доступности
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Восстанавливаем последнюю активную вкладку при загрузке страницы (опционально)
    try {
        const lastTab = localStorage.getItem('lastActiveTab');
        if (lastTab && document.getElementById(lastTab)) {
            activateTab(lastTab);
        }
    } catch (e) {
        // Игнорируем ошибки localStorage
    }

    // Добавляем поддержку хешей URL (например, page.html#group)
    function checkHash() {
        const hash = window.location.hash.substring(1); // Убираем #
        if (hash && document.getElementById(hash)) {
            activateTab(hash);
        }
    }

    // Проверяем хеш при загрузке
    checkHash();

    // Слушаем изменения хеша (если пользователь нажимает кнопки назад/вперед)
    window.addEventListener('hashchange', checkHash);

    console.log('✅ Табы на странице стоимости инициализированы');
});