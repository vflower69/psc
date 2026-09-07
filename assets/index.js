document.addEventListener("DOMContentLoaded", () => {

  // ===== ELEMENT LOOKUPS (NULL-SAFE) =====
  const backToTop = document.getElementById('backToTop');
  const header = document.querySelector('header');
  const scrollProgress = document.getElementById('scrollProgress');
  const sections = document.querySelectorAll('.section');

  // ===== MERGED SCROLL LISTENER =====
  window.addEventListener('scroll', () => {
    const y = window.scrollY;

    // Back to Top Button
    if (backToTop) {
      if (y > 400) backToTop.classList.add('visible');
      else backToTop.classList.remove('visible');
    }

    // Header Scroll Effect
    if (header) {
      if (y > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }

    // Scroll Progress Bar
    if (scrollProgress) {
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (y / docHeight) * 100;
      scrollProgress.style.width = progress + '%';
    }
  });

  // ===== Back to Top Click =====
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== Section Reveal (IntersectionObserver) =====
  if (sections.length > 0) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach(section => observer.observe(section));
  }

  // ===== Smooth Anchor Navigation =====
  const headerHeight = header ? header.offsetHeight : 0;

  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      const targetPos = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: targetPos - headerHeight - 10,
        behavior: 'smooth'
      });
    });
  });

  // ===== Dark Mode Toggle =====
  const toggle = document.getElementById('darkModeToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      toggle.textContent = document.body.classList.contains('dark')
        ? 'Light Mode'
        : 'Dark Mode';
    });
  }

  // ===== Mobile Drawer =====
  const mobileBtn = document.getElementById('mobileMenuButton');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileNavOverlay');
  const drawerClose = document.getElementById('drawerClose');

  function openDrawer() {
    if (drawer && overlay) {
      drawer.classList.add('open');
      overlay.classList.add('visible');
    }
  }

  function closeDrawer() {
    if (drawer && overlay) {
      drawer.classList.remove('open');
      overlay.classList.remove('visible');
    }
  }

  if (mobileBtn) mobileBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // ===== Gallery Lightbox =====
  const galleryImgs = document.querySelectorAll('.gallery-img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxOverlay = document.getElementById('lightboxOverlay');

  if (galleryImgs.length > 0 && lightbox && lightboxImg && lightboxOverlay) {
    galleryImgs.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('visible');
        lightboxOverlay.classList.add('visible');
      });
    });

    lightboxOverlay.addEventListener('click', () => {
      lightbox.classList.remove('visible');
      lightboxOverlay.classList.remove('visible');
    });
  }

  // ===== Deal Wizard =====
  const dealToggle = document.getElementById('dealToggle');
  const dealWizard = document.getElementById('dealWizard');
  const steps = document.querySelectorAll('.deal-step');
  const successMsg = document.getElementById('dealSuccess');

  if (dealToggle && dealWizard) {
    dealToggle.addEventListener('click', () => {
      const expanded = dealWizard.classList.toggle('expanded');
      dealWizard.classList.toggle('collapsed', !expanded);
      dealToggle.textContent = expanded ? 'Hide Deal Form' : 'Submit a Deal';
    });
  }

  function validateFields(fields) {
    let valid = true;
    fields.forEach(field => {
      if (!field || !field.value.trim()) {
        field?.classList.add('error');
        valid = false;
      } else {
        field.classList.remove('error');
      }
    });
    return valid;
  }

  // Step Buttons (null-safe)
  const nextStep1 = document.getElementById('nextStep1');
  const nextStep2 = document.getElementById('nextStep2');
  const backStep2 = document.getElementById('backStep2');
  const backStep3 = document.getElementById('backStep3');
  const submitDeal = document.getElementById('submitDeal');

  if (nextStep1) {
    nextStep1.addEventListener('click', () => {
      const fields = [
        document.getElementById('address'),
        document.getElementById('city'),
        document.getElementById('assetType')
      ];
      if (!validateFields(fields)) return;

      steps[0]?.classList.add('hidden');
      steps[1]?.classList.remove('hidden');
    });
  }

  if (backStep2) {
    backStep2.addEventListener('click', () => {
      steps[1]?.classList.add('hidden');
      steps[0]?.classList.remove('hidden');
    });
  }

  if (nextStep2) {
    nextStep2.addEventListener('click', () => {
      const fields = [
        document.getElementById('price'),
        document.getElementById('summary')
      ];
      if (!validateFields(fields)) return;

      steps[1]?.classList.add('hidden');
      steps[2]?.classList.remove('hidden');
    });
  }

  if (backStep3) {
    backStep3.addEventListener('click', () => {
      steps[2]?.classList.add('hidden');
      steps[1]?.classList.remove('hidden');
    });
  }

  if (submitDeal) {
    submitDeal.addEventListener('click', () => {
      const fields = [
        document.getElementById('brokerName'),
        document.getElementById('brokerEmail')
      ];
      if (!validateFields(fields)) return;

      steps.forEach(step => step.classList.add('hidden'));
      successMsg?.classList.remove('hidden');
    });
  }

  // ===== Info Modal =====
  const infoBtn = document.getElementById('infoButton');
  const infoModal = document.getElementById('infoModal');
  const infoOverlay = document.getElementById('infoModalOverlay');
  const infoClose = document.getElementById('infoModalClose');

  function openInfoModal() {
    infoModal?.classList.add('visible');
    infoOverlay?.classList.add('visible');
  }

  function closeInfoModal() {
    infoModal?.classList.remove('visible');
    infoOverlay?.classList.remove('visible');
  }

  if (infoBtn) infoBtn.addEventListener('click', openInfoModal);
  if (infoClose) infoClose.addEventListener('click', closeInfoModal);
  if (infoOverlay) infoOverlay.addEventListener('click', closeInfoModal);

});
