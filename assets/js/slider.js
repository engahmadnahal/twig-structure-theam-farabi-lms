// Vanilla JS Slider Component
class Slider {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    if (!this.container) return;

    this.wrapper = this.container.querySelector('.slider-wrapper');
    this.slides = Array.from(this.wrapper.querySelectorAll('.slider-slide'));
    this.dotsContainer = this.container.querySelector('.slider-dots');
    this.prevBtn = this.container.querySelector('.slider-nav-prev');
    this.nextBtn = this.container.querySelector('.slider-nav-next');

    this.currentIndex = 0;
    this.isTransitioning = false;
    this.autoplayInterval = null;

    this.options = {
      autoplay: options.autoplay !== false,
      autoplaySpeed: options.autoplaySpeed || 5000,
      speed: options.speed || 500,
      infinite: options.infinite !== false,
      fade: options.fade || false,
      slidesToShow: options.slidesToShow || 1,
      rtl: options.rtl || false,
      pauseOnHover: options.pauseOnHover !== false,
      ...options,
    };

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    // Set up slides
    this.setupSlides();
    
    // Create dots if needed
    if (this.dotsContainer && this.options.dots !== false) {
      this.createDots();
    }

    // Set up navigation
    this.setupNavigation();

    // Start autoplay
    if (this.options.autoplay) {
      this.startAutoplay();
    }

    // Handle pause on hover
    if (this.options.pauseOnHover) {
      this.container.addEventListener('mouseenter', () => this.stopAutoplay());
      this.container.addEventListener('mouseleave', () => {
        if (this.options.autoplay) this.startAutoplay();
      });
    }

    // Handle RTL
    this.isRTL = this.options.rtl || document.documentElement.dir === 'rtl';
    if (this.isRTL) {
      this.wrapper.style.direction = 'rtl';
    }

    // Handle responsive
    this.handleResponsive();
    window.addEventListener('resize', () => this.handleResponsive());
  }

  setupSlides() {
    if (this.options.fade) {
      this.wrapper.style.position = 'relative';
      this.wrapper.style.display = 'block';
      this.wrapper.style.height = this.slides[0]?.offsetHeight + 'px' || 'auto';
      this.slides.forEach((slide, index) => {
        slide.style.position = 'absolute';
        slide.style.top = '0';
        slide.style.left = '0';
        slide.style.width = '100%';
        slide.style.opacity = index === 0 ? '1' : '0';
        slide.style.transition = `opacity ${this.options.speed}ms ease`;
        slide.style.zIndex = index === 0 ? '1' : '0';
      });
    } else {
      const slideWidth = 100 / this.options.slidesToShow;
      this.slides.forEach(slide => {
        slide.style.flex = `0 0 ${slideWidth}%`;
        slide.style.maxWidth = `${slideWidth}%`;
        slide.style.width = `${slideWidth}%`;
      });
    }
  }

  createDots() {
    this.dotsContainer.innerHTML = '';
    this.slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.addEventListener('click', () => this.goTo(index));
      this.dotsContainer.appendChild(dot);
    });
  }

  setupNavigation() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        if (this.isRTL) {
          this.next();
        } else {
          this.prev();
        }
      });
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        if (this.isRTL) {
          this.prev();
        } else {
          this.next();
        }
      });
    }
  }

  goTo(index) {
    if (this.isTransitioning) return;
    
    if (this.options.infinite) {
      this.currentIndex = index;
    } else {
      this.currentIndex = Math.max(0, Math.min(index, this.slides.length - this.options.slidesToShow));
    }

    this.updateSlider();
  }

  next() {
    if (this.isTransitioning) return;
    
    if (this.options.infinite) {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    } else {
      this.currentIndex = Math.min(
        this.currentIndex + 1,
        this.slides.length - this.options.slidesToShow
      );
    }

    this.updateSlider();
  }

  prev() {
    if (this.isTransitioning) return;
    
    if (this.options.infinite) {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    } else {
      this.currentIndex = Math.max(0, this.currentIndex - 1);
    }

    this.updateSlider();
  }

  updateSlider() {
    this.isTransitioning = true;

    if (this.options.fade) {
      // Fade transition
      this.slides.forEach((slide, index) => {
        if (index === this.currentIndex) {
          slide.style.opacity = '1';
          slide.style.zIndex = '1';
        } else {
          slide.style.opacity = '0';
          slide.style.zIndex = '0';
        }
      });
    } else {
      // Slide transition
      const translateX = -(this.currentIndex * (100 / this.options.slidesToShow));
      this.wrapper.style.transform = `translateX(${translateX}%)`;
    }

    // Update dots
    if (this.dotsContainer) {
      const dots = this.dotsContainer.querySelectorAll('.slider-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentIndex);
      });
    }

    setTimeout(() => {
      this.isTransitioning = false;
    }, this.options.speed);
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayInterval = setInterval(() => {
      this.next();
    }, this.options.autoplaySpeed);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  handleResponsive() {
    const width = window.innerWidth;
    let slidesToShow = this.options.slidesToShow;

    if (width < 640) {
      slidesToShow = this.options.responsive?.mobile || 1;
    } else if (width < 1024) {
      slidesToShow = this.options.responsive?.tablet || 2;
    } else {
      slidesToShow = this.options.slidesToShow;
    }

    if (slidesToShow !== this.currentSlidesToShow) {
      this.currentSlidesToShow = slidesToShow;
      this.setupSlides();
      this.updateSlider();
    }
    
    // Recalculate on resize
    this.currentSlidesToShow = slidesToShow;
  }
}

// Initialize sliders when DOM is ready
function initSliders() {
  // Hero slider
  const heroSlider = document.querySelector('[data-slider="hero"]');
  if (heroSlider) {
    const sliderContainer = heroSlider.querySelector('.slider-container');
    if (sliderContainer) {
      new Slider(sliderContainer, {
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        infinite: true,
        dots: true,
      });
    }
  }

  // Courses slider
  const coursesSlider = document.querySelector('[data-slider="courses"]');
  if (coursesSlider) {
    const sliderContainer = coursesSlider.querySelector('.slider-container');
    if (sliderContainer) {
      const sliderInstance = new Slider(sliderContainer, {
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 3,
        infinite: true,
        dots: false,
        rtl: document.documentElement.dir === 'rtl',
        responsive: {
          mobile: 1,
          tablet: 2,
        },
      });
      sliderContainer._sliderInstance = sliderInstance;
      
      // Handle RTL direction
      sliderInstance.isRTL = document.documentElement.dir === 'rtl';
      if (sliderInstance.isRTL) {
        sliderInstance.wrapper.style.direction = 'rtl';
      }
    }
  }

  // Reviews slider
  const reviewsSlider = document.querySelector('[data-slider="reviews"]');
  if (reviewsSlider) {
    const sliderContainer = reviewsSlider.querySelector('.slider-container');
    if (sliderContainer) {
      new Slider(sliderContainer, {
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 3,
        infinite: true,
        dots: true,
        rtl: document.documentElement.dir === 'rtl',
        responsive: {
          mobile: 1,
          tablet: 2,
        },
      });
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSliders);
} else {
  initSliders();
}
