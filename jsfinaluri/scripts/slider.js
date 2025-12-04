const sliderWrapper = document.getElementById('sliderWrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (sliderWrapper && prevBtn && nextBtn) {
    const sliderContainer = sliderWrapper.parentElement;
    const images = sliderWrapper.querySelectorAll('.slider-image-wrapper'); 
    const totalImages = images.length;
    let currentIndex = 0;
    let intervalId;
    const slideDuration = 3000;

    const getSlideWidth = () => {
        return sliderContainer.offsetWidth;
    };

    const updateSlider = () => {
        const slideWidth = getSlideWidth();
        const offset = -currentIndex * slideWidth;
        sliderWrapper.style.transform = `translateX(${offset}px)`;
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % totalImages;
        updateSlider();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateSlider();
    };

    const startAutoSlide = () => {
        clearInterval(intervalId);
        intervalId = setInterval(nextSlide, slideDuration);
    };

    nextBtn.addEventListener('click', () => {
        startAutoSlide();
        nextSlide();
    });

    prevBtn.addEventListener('click', () => {
        startAutoSlide();
        prevSlide();
    });

    updateSlider();
    startAutoSlide();

    window.addEventListener('resize', () => {
        updateSlider();
    });
}