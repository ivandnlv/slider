// Вызов функции слайдера

slider({
    autoplayFalseOrTrue: false,
    prevSelector: '#prev',
    sliderItemSelector: '.slider__track-item',
    sliderTrackSelector: '.slider__track',
    dotsContainerSelector: '.slider__dots',
    slidesToShowNum: 1,
    sliderTrackWidthNum: 1200,
    nextSelector: '#next',
    dotsFalseOrTrue: true,
    currentNumTrueOrFalse: true,
    currentNumFieldSelector: '.slider__current',
    dotsSelectedClass: 'selected'
});

// Сама функция слайдера 

function slider({
    // Деструктиризированные аргументы функции слайдера

    prevSelector, // Селектор кнопки назад
    nextSelector, // Селектор кнопки вперед

    sliderItemSelector, // Селектор слайда
    sliderTrackSelector, // Селектор обертки, где лежат слайды
    
    dotsContainerSelector, // Селектор обертки, где лежат дотсы
    dotsFalseOrTrue, // Включить и выключить отображение точек
    dotsSelectedClass, // Класс выделенной точки
    
    slidesToShowNum, // Число отображаемых слайдов
    sliderTrackWidthNum, // Ширина контейнера слайдов 
    
    autoplayFalseOrTrue, // Включить или выключить автосмену слайдов
    
    currentNumTrueOrFalse, // Включить или выключить номер текущего слайда и сколько их всего
    currentNumFieldSelector // Селектор номера текущего слайда и всех возможных
    
}) {
    const prev = document.querySelector(prevSelector);
    const next = document.querySelector(nextSelector);
    const slides = document.querySelectorAll(sliderItemSelector);
    const slidesContainer = document.querySelector(sliderTrackSelector);
    const dotsContainer = document.querySelector(dotsContainerSelector);
    const dots = [];
    
    const slidesToShow = slidesToShowNum;
    const defaultWidth = sliderTrackWidthNum;
    const autoplay = autoplayFalseOrTrue;

    const itemWidth = defaultWidth;
    const slidesCount = Math.ceil(slides.length / slidesToShow);

    let width = 0;
    let slideNum = 1;
    
    if (dotsFalseOrTrue === true) {
        createDots();
    }

    if (currentNumTrueOrFalse === true) {
        currentNum();
    }

    dotChange();
    
    if (slidesToShow !== 1) {
        slides.forEach(slide => {
            slide.style.minWidth = `${defaultWidth / slidesToShow}px`;
            slidesContainer.style.width = `${defaultWidth}px`;
        });
    } else {
        slides.forEach(slide => {
            slide.style.minWidth = `${defaultWidth}px`;
        });
    }
    
    if (autoplay === true) {
        setInterval(nextSlide, 5000);
    } 
    
    next.addEventListener('click', nextSlide);
    
    prev.addEventListener('click', prevSlide);
    
    function nextSlide() {
        if (slideNum !== slidesCount) {
            width += itemWidth;
            slides.forEach(slide => {
                slide.style.transform = `translateX(-${width}px)`;
            });
            slideNum += 1;
            dotChange();
            currentNumTrueOrFalse === true ? currentNum() : null
        } else {
            width = 0;
            slides.forEach(slide => {
                slide.style.transform = `translateX(-${width}px)`;
            });
            slideNum = 1;
            dotChange();
            currentNumTrueOrFalse === true ? currentNum() : null
        }
    }
    
    function prevSlide() {
        if (slideNum !== 1) {
            width -= itemWidth;
            slides.forEach(slide => {
                slide.style.transform = `translateX(-${width}px)`;
            });
            slideNum -= 1;
            dotChange();
            currentNumTrueOrFalse === true ? currentNum() : null
        } else {
            width = itemWidth * (slidesCount - 1);
            slides.forEach(slide => {
                slide.style.transform = `translateX(-${width}px)`;
            });
            slideNum = slidesCount;
            dotChange();
            currentNumTrueOrFalse === true ? currentNum() : null
        }
    }
     
    function createDots() {
        for (let i = 0; i < slidesCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.classList.add(`${i + 1}`);
            dotsContainer.append(dot);
            dots.push(dot);
        }
    }
    
    function dotChange() {
        dots.forEach(dot => {
            if (dot.classList.contains(`${slideNum}`)) {
                dot.classList.add(dotsSelectedClass);
            } else {
                dot.classList.remove(dotsSelectedClass);
            }
        });
    } 

    function currentNum() {
        const currentNumField = document.querySelector(currentNumFieldSelector);
        currentNumField.textContent = `${slideNum} / ${slides.length}`;
    }
}