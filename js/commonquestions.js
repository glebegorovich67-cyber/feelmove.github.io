document.addEventListener('DOMContentLoaded', function() {
    // ===== АККОРДЕОН ДЛЯ ВОПРОСОВ =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        }
    });
    
    // ===== МОДАЛЬНОЕ ОКНО ФОРМЫ =====
    const triggerBtn = document.getElementById('showFormBtn');        // Кнопка "Остались вопросы?"
    const modal = document.getElementById('feedbackModal');           // Модальное окно
    const closeBtn = document.getElementById('closeFormBtn');        // Кнопка закрытия
    const triggerBlock = document.getElementById('questionsTrigger'); // Блок с кнопкой
    
    // Проверяем, что все элементы найдены
    if (!triggerBtn || !modal || !closeBtn) {
        console.log('❌ Элементы формы не найдены');
        return;
    }
    
    // Открыть форму
    function openModal() {
        modal.classList.add('show');           // Показываем модальное окно
        document.body.style.overflow = 'hidden'; // Запрещаем прокрутку
        
        // Скрываем блок с кнопкой
        if (triggerBlock) {
            triggerBlock.style.display = 'none';
        }
    }
    
    // Закрыть форму
    function closeModal() {
        modal.classList.remove('show');        // Скрываем модальное окно
        document.body.style.overflow = '';    // Возвращаем прокрутку
        
        // Показываем блок с кнопкой
        if (triggerBlock) {
            triggerBlock.style.display = 'block';
        }
    }
    
    // Обработчики событий
    triggerBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    
    // Закрытие по клику вне модального окна
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    console.log('✅ Форма обратной связи готова');
});