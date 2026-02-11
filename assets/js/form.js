// Form Handling
function initForms() {
  const contactForm = document.querySelector('[data-form="contact"]');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;
    const isSubmitting = submitBtn.disabled;

    if (isSubmitting) return;

    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <div class="spinner"></div>
      <span>Sending...</span>
    `;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show success message
    if (typeof showToast === 'function') {
      showToast(App.getTranslation('contact.successMessage'), 'success');
    }

    // Reset form
    contactForm.reset();

    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initForms);
} else {
  initForms();
}
