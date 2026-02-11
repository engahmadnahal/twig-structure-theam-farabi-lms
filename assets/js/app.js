// Main App Configuration
const App = {
  language: 'en',
  theme: 'light',
  translations: {},

  async init() {
    // Load saved preferences
    this.loadPreferences();
    
    // Load translations
    await this.loadTranslations();
    
    // Apply theme and language
    this.applyTheme();
    this.applyLanguage();
    
    // Initialize components
    this.initNavigation();
    this.initThemeToggle();
    this.initLanguageToggle();
    this.initFloatingCTA();
  },

  loadPreferences() {
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language');
    
    // Default to light theme if no preference saved
    this.theme = savedTheme || 'light';
    if (savedLanguage) this.language = savedLanguage;
  },

  async loadTranslations() {
    try {
      // Determine the base path for lang files
      const basePath = this.getBasePath();
      
      const [enResponse, arResponse] = await Promise.all([
        fetch(`${basePath}lang/en.json`),
        fetch(`${basePath}lang/ar.json`)
      ]);
      
      if (enResponse.ok) {
        this.translations.en = await enResponse.json();
      }
      if (arResponse.ok) {
        this.translations.ar = await arResponse.json();
      }
    } catch (error) {
      console.warn('Could not load translation files, using fallback translations.');
      // Fallback inline translations
      this.translations = this.getFallbackTranslations();
    }
  },

  getBasePath() {
    // Try to detect the base path from the current script or page location
    const scripts = document.querySelectorAll('script[src]');
    for (const script of scripts) {
      const src = script.getAttribute('src');
      if (src && src.includes('assets/js/app.js')) {
        return src.replace('assets/js/app.js', '');
      }
    }
    // Fallback: try relative path
    return './';
  },

  getFallbackTranslations() {
    return {
      en: {
        nav: {
          aboutUs: "About Us",
          ourCourses: "Our Courses",
          successStories: "Success Stories",
          registerNow: "Register Now",
          login: "Login",
          contactUs: "Contact Us",
          brand: "Farabi Academy"
        },
        hero: {
          title: "Transform Your Future with Excellence",
          subtitle: "Join thousands of students who have achieved their dreams through our world-class online academy. Expert instructors, proven methods, and a supportive community await you.",
          ctaButton: "Start Now"
        },
        courses: {
          title: "What We Offer",
          subtitle: "Explore our comprehensive range of online courses designed to help you succeed",
          viewDetails: "View Details"
        },
        stats: {
          students: "Students",
          views: "Views",
          courses: "Courses",
          instructors: "Instructors",
          satisfaction: "Satisfaction"
        },
        reviews: {
          title: "What Our Students Say",
          subtitle: "Real stories from real students who transformed their lives"
        },
        whyChoose: {
          title: "Why Choose Us",
          subtitle: "Discover what makes our academy the best choice for your learning journey",
          feature1Title: "Expert Instructors",
          feature1Desc: "Learn from industry professionals with years of real-world experience and proven teaching methods.",
          feature2Title: "Flexible Learning",
          feature2Desc: "Study at your own pace, anytime, anywhere. Our platform adapts to your schedule and learning style.",
          feature3Title: "Lifetime Access",
          feature3Desc: "Get unlimited access to all course materials, updates, and resources even after completion.",
          feature4Title: "Certification",
          feature4Desc: "Earn recognized certificates upon completion to boost your career and showcase your skills.",
          feature5Title: "Community Support",
          feature5Desc: "Join a vibrant community of learners. Get help, share ideas, and network with peers worldwide.",
          feature6Title: "Affordable Pricing",
          feature6Desc: "Quality education shouldn't break the bank. We offer competitive prices and flexible payment options."
        },
        contact: {
          title: "Get In Touch",
          subtitle: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
          namePlaceholder: "Your Name",
          emailPlaceholder: "Your Email",
          messagePlaceholder: "Your Message",
          sendButton: "Send Message",
          successMessage: "Thank you! We'll get back to you soon."
        },
        faq: {
          title: "Frequently Asked Questions",
          subtitle: "Find answers to common questions about our academy",
          q1: "How do I enroll in a course?",
          a1: "Simply click on the 'Register Now' button, create an account, browse our course catalog, and select the course you want. You can pay securely online and get instant access.",
          q2: "Can I access courses on mobile devices?",
          a2: "Yes! Our platform is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktop computers.",
          q3: "Do you offer refunds?",
          a3: "We offer a 30-day money-back guarantee. If you're not satisfied with your course within the first 30 days, we'll give you a full refund, no questions asked.",
          q4: "Are the certificates recognized?",
          a4: "Yes, our certificates are recognized by many employers and institutions. They demonstrate your commitment to learning and mastery of the subject.",
          q5: "How long do I have access to a course?",
          a5: "Once you enroll in a course, you have lifetime access to all course materials, including any future updates and additions.",
          q6: "Can I interact with instructors?",
          a6: "Absolutely! You can ask questions, participate in live Q&A sessions, and get personalized feedback from our instructors throughout your learning journey."
        },
        footer: {
          description: "Empowering learners worldwide with quality online education.",
          quickLinks: "Quick Links",
          followUs: "Follow Us",
          copyright: "\u00a9 2026 Farabi Academy. All rights reserved."
        },
        floatingCta: "Enroll Now"
      },
      ar: {
        nav: {
          aboutUs: "\u0645\u0646 \u0646\u062d\u0646",
          ourCourses: "\u062f\u0648\u0631\u0627\u062a\u0646\u0627",
          successStories: "\u0642\u0635\u0635 \u0627\u0644\u0646\u062c\u0627\u062d",
          registerNow: "\u0633\u062c\u0644 \u0627\u0644\u0622\u0646",
          login: "\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644",
          contactUs: "\u0627\u062a\u0635\u0644 \u0628\u0646\u0627",
          brand: "\u0623\u0643\u0627\u062f\u064a\u0645\u064a\u0629 \u0627\u0644\u0641\u0627\u0631\u0627\u0628\u064a"
        }
      }
    };
  },

  applyTheme() {
    if (!this.theme) {
      this.theme = 'light';
    }
    
    if (this.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  applyLanguage() {
    document.documentElement.dir = this.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = this.language;
    this.updateContent();
  },

  setTheme(theme) {
    this.theme = theme;
    localStorage.setItem('theme', theme);
    this.applyTheme();
  },

  setLanguage(language) {
    this.language = language;
    localStorage.setItem('language', language);
    this.applyLanguage();
  },

  toggleTheme() {
    this.setTheme(this.theme === 'light' ? 'dark' : 'light');
  },

  toggleLanguage() {
    this.setLanguage(this.language === 'en' ? 'ar' : 'en');
  },

  getTranslation(key) {
    const keys = key.split('.');
    let value = this.translations[this.language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  },

  updateContent() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      if (translation && translation !== key) {
        el.textContent = translation;
      }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = this.getTranslation(key);
      if (translation && translation !== key) {
        el.placeholder = translation;
      }
    });
  },

  initNavigation() {
    const checkNav = () => {
      const nav = document.querySelector('nav');
      if (!nav) {
        setTimeout(checkNav, 100);
        return;
      }

      let isScrolled = false;
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 20;
        if (scrolled !== isScrolled) {
          isScrolled = scrolled;
          nav.classList.toggle('scrolled', scrolled);
        }
      });
    };
    checkNav();
  },

  initThemeToggle() {
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.toggleTheme();
      });
    });
    this.updateThemeIcons();
  },

  updateThemeIcons() {
    // Icons are handled by CSS classes (dark:hidden, dark:block)
  },

  initLanguageToggle() {
    document.querySelectorAll('[data-language-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.toggleLanguage();
        this.updateLanguageLabels();
      });
    });
    this.updateLanguageLabels();
  },

  updateLanguageLabels() {
    const label = this.language === 'en' ? 'AR' : 'EN';
    document.querySelectorAll('[data-language-label]').forEach(el => {
      el.textContent = label;
    });
  },

  initFloatingCTA() {
    const floatingBtn = document.querySelector('[data-floating-cta]');
    const scrollTopBtn = document.querySelector('[data-scroll-top]');
    
    if (!floatingBtn && !scrollTopBtn) return;

    let floatingVisible = false;
    let scrollTopVisible = false;

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      
      // Floating CTA
      if (floatingBtn) {
        const shouldShow = scrolled > 300;
        if (shouldShow !== floatingVisible) {
          floatingVisible = shouldShow;
          floatingBtn.classList.toggle('visible', shouldShow);
        }
      }
      
      // Scroll to top
      if (scrollTopBtn) {
        const shouldShow = scrolled > 500;
        if (shouldShow !== scrollTopVisible) {
          scrollTopVisible = shouldShow;
          scrollTopBtn.classList.toggle('visible', shouldShow);
        }
      }
    });
  },
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}
