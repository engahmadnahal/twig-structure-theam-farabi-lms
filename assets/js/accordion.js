// Accordion Component
class Accordion {
  constructor(container) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    if (!this.container) return;

    this.items = Array.from(this.container.querySelectorAll('.accordion-item'));
    this.init();
  }

  init() {
    this.items.forEach((item) => {
      const trigger = item.querySelector('.accordion-trigger');
      const content = item.querySelector('.accordion-content');
      const icon = item.querySelector('.accordion-icon');

      if (!trigger || !content) return;

      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all items
        this.items.forEach((i) => {
          i.classList.remove('active');
          const c = i.querySelector('.accordion-content');
          const ic = i.querySelector('.accordion-icon');
          if (c) c.classList.remove('active');
          if (ic) ic.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
          item.classList.add('active');
          content.classList.add('active');
          if (icon) icon.classList.add('active');
        }
      });
    });
  }
}

// Initialize accordions
function initAccordions() {
  const accordionContainers = document.querySelectorAll('[data-accordion]');
  accordionContainers.forEach((container) => {
    new Accordion(container);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAccordions);
} else {
  initAccordions();
}
