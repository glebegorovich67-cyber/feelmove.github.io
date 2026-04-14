/**
 * price-calculator.js - Калькулятор стоимости для страницы цен
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===== ЭЛЕМЕНТЫ =====
    const openBtn = document.getElementById('openCalculatorBtn');
    const modal = document.getElementById('calculatorModal');
    const closeBtn = document.getElementById('closeCalculatorBtn');
    
    // Проверка наличия элементов
    if (!openBtn || !modal || !closeBtn) {
        console.log('Элементы калькулятора не найдены');
        return;
    }
    
    // Цены для групповых занятий
    const groupPrices = {
        standard: { 5: 2950, 10: 5900, 15: 7200, 20: 9600, 30: 14400 },
        regular: { 15: 7200, 20: 9600, 30: 14400 },
        development: { 15: 7800, 20: 10400, 30: 15600 }
    };
    
    // Цены для индивидуальных занятий
    const individualPrices = { 60: 2500, 90: 3500 };
    
    // DOM элементы калькулятора
    const typeBtns = document.querySelectorAll('.calc-option-btn');
    const tariffBtns = document.querySelectorAll('.calc-tariff-btn');
    const durationBtns = document.querySelectorAll('.calc-duration-btn');
    const periodBtns = document.querySelectorAll('.calc-period-btn');
    const lessonsRange = document.getElementById('calcLessonsRange');
    const lessonsCountSpan = document.getElementById('calcLessonsCount');
    const tariffGroup = document.getElementById('calcTariffGroup');
    const individualOptions = document.getElementById('calcIndividualOptions');
    
    // Элементы результата
    const totalPriceSpan = document.getElementById('calcTotalPrice');
    const resultTypeSpan = document.getElementById('calcResultType');
    const resultTariffSpan = document.getElementById('calcResultTariff');
    const resultLessonsSpan = document.getElementById('calcResultLessons');
    const resultPeriodSpan = document.getElementById('calcResultPeriod');
    const pricePerLessonSpan = document.getElementById('calcPricePerLesson');
    const bonusInfoDiv = document.getElementById('calcBonusInfo');
    
    // Состояние
    let currentType = 'group';
    let currentTariff = 'standard';
    let currentDuration = 60;
    let currentLessons = 8;
    let currentPeriod = 1;
    
    // ===== ОТКРЫТИЕ/ЗАКРЫТИЕ =====
    function openModal() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
    });
    
    // ===== ЛОГИКА КАЛЬКУЛЯТОРА =====
    function updatePrice() {
        let totalPrice = 0;
        let pricePerLesson = 0;
        let tariffName = '';
        let bonusText = '';
        
        if (currentType === 'group') {
            const availablePrices = groupPrices[currentTariff];
            const availableLessons = Object.keys(availablePrices).map(Number).sort((a, b) => a - b);
            let selectedLessons = currentLessons;
            
            if (!availablePrices[selectedLessons]) {
                const lower = availableLessons.filter(l => l <= selectedLessons).pop();
                if (lower) {
                    selectedLessons = lower;
                } else {
                    selectedLessons = availableLessons[0];
                }
                lessonsRange.value = selectedLessons;
                lessonsCountSpan.textContent = selectedLessons;
                currentLessons = selectedLessons;
            }
            
            totalPrice = availablePrices[selectedLessons];
            pricePerLesson = Math.round(totalPrice / selectedLessons);
            
            switch(currentTariff) {
                case 'standard':
                    tariffName = 'Стандарт';
                    bonusText = '✅ Можно заниматься у любого преподавателя';
                    break;
                case 'regular':
                    tariffName = 'Регулярный';
                    bonusText = '✅ Абонемент закреплён за 1 преподавателем';
                    break;
                case 'development':
                    tariffName = 'Развитие';
                    bonusText = '🎁 1 индивидуальное занятие в подарок!';
                    break;
            }
            
            if (selectedLessons >= 30 && currentTariff !== 'development') {
                bonusText = '🎁 2 самостоятельных занятия в подарок!';
            }
        } else {
            totalPrice = individualPrices[currentDuration] * currentLessons;
            pricePerLesson = individualPrices[currentDuration];
            tariffName = currentDuration === 60 ? '60 мин' : '90 мин';
            bonusText = '💫 Индивидуальный подход, гибкий график';
        }
        
        let periodDiscount = 0;
        let periodText = '';
        if (currentPeriod === 2) {
            periodDiscount = totalPrice * 0.05;
            periodText = '2 месяца (-5%)';
        } else if (currentPeriod === 3) {
            periodDiscount = totalPrice * 0.1;
            periodText = '3 месяца (-10%)';
        } else {
            periodText = '1 месяц';
        }
        
        const finalPrice = Math.round(totalPrice - periodDiscount);
        
        totalPriceSpan.textContent = finalPrice.toLocaleString() + ' ₽';
        resultTypeSpan.textContent = currentType === 'group' ? 'Групповые' : 'Индивидуальные';
        resultTariffSpan.textContent = tariffName;
        resultLessonsSpan.textContent = currentLessons;
        resultPeriodSpan.textContent = periodText;
        pricePerLessonSpan.textContent = pricePerLesson.toLocaleString() + ' ₽';
        
        bonusInfoDiv.innerHTML = `
            <span class="bonus-icon">${bonusText.includes('🎁') ? '🎁' : (bonusText.includes('✅') ? '✅' : '💫')}</span>
            <span class="bonus-text">${bonusText}</span>
        `;
        
        if (periodDiscount > 0) {
            const discountHtml = document.createElement('div');
            discountHtml.className = 'bonus-text';
            discountHtml.style.marginTop = '8px';
            discountHtml.style.fontSize = '0.85rem';
            discountHtml.innerHTML = `💰 Скидка за абонемент на ${periodText}: ${Math.round(periodDiscount).toLocaleString()} ₽`;
            bonusInfoDiv.appendChild(discountHtml);
        }
    }
    
    // Обработчики
    typeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            typeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentType = btn.dataset.type;
            
            if (currentType === 'group') {
                tariffGroup.classList.remove('hidden');
                individualOptions.classList.add('hidden');
                lessonsRange.min = 1;
                lessonsRange.max = 30;
                if (currentLessons < 5) currentLessons = 8;
                lessonsRange.value = currentLessons;
            } else {
                tariffGroup.classList.add('hidden');
                individualOptions.classList.remove('hidden');
                lessonsRange.min = 1;
                lessonsRange.max = 30;
                if (currentLessons > 10) currentLessons = 5;
                lessonsRange.value = currentLessons;
            }
            lessonsCountSpan.textContent = currentLessons;
            updatePrice();
        });
    });
    
    tariffBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tariffBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTariff = btn.dataset.tariff;
            updatePrice();
        });
    });
    
    durationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            durationBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentDuration = parseInt(btn.dataset.duration);
            updatePrice();
        });
    });
    
    periodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            periodBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentPeriod = parseInt(btn.dataset.period);
            updatePrice();
        });
    });
    
    if (lessonsRange) {
        lessonsRange.addEventListener('input', function() {
            currentLessons = parseInt(this.value);
            lessonsCountSpan.textContent = currentLessons;
            updatePrice();
        });
    }
    
    updatePrice();
});