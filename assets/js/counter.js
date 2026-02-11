// Counter Animation for Stats
class Counter {
  constructor(element, targetValue, suffix = '') {
    this.element = element;
    this.targetValue = targetValue;
    this.suffix = suffix;
    this.currentValue = 0;
    this.duration = 2000;
    this.steps = 60;
    this.stepValue = targetValue / this.steps;
    this.stepDuration = this.duration / this.steps;
    this.animated = false;
    this.observer = null;

    this.init();
  }

  init() {
    // Use Intersection Observer to trigger animation when in viewport
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.animated) {
            this.animate();
            this.animated = true;
          }
        });
      },
      { threshold: 0.3 }
    );

    this.observer.observe(this.element);
  }

  animate() {
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= this.steps) {
        this.currentValue = this.targetValue;
        this.updateDisplay();
        clearInterval(timer);
      } else {
        this.currentValue = Math.floor(this.stepValue * currentStep);
        this.updateDisplay();
      }
    }, this.stepDuration);
  }

  updateDisplay() {
    const formattedValue = this.currentValue.toLocaleString();
    this.element.textContent = formattedValue + this.suffix;
  }
}

// Initialize counters
function initCounters() {
  const counterElements = document.querySelectorAll('[data-counter]');
  counterElements.forEach((el) => {
    const targetValue = parseInt(el.getAttribute('data-counter-value') || '0');
    const suffix = el.getAttribute('data-counter-suffix') || '';
    new Counter(el, targetValue, suffix);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCounters);
} else {
  initCounters();
}
