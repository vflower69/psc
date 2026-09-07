//Wrap everything in DOMContentLoaded. This guarantees your JS runs only after the page is ready.
document.addEventListener("DOMContentLoaded", () => {

  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach(section => observer.observe(section));

  const scrollProgress = document.getElementById('scrollProgress');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = progress + '%';
  });

  const headerHeight = document.querySelector('header').offsetHeight;

  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      const targetPos = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: targetPos - headerHeight - 10,
        behavior: 'smooth'
      });
    });
  });

  const toggle = document.getElementById('darkModeToggle');

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggle.textContent = document.body.classList.contains('dark')
      ? 'Light Mode'
      : 'Dark Mode';
  });

  const mobileBtn = document.getElementById('mobileMenuButton');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileNavOverlay');
  const drawerClose = document.getElementById('drawerClose');

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('visible');
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('visible');
  }

  mobileBtn.addEventListener('click', openDrawer);
  drawerClose.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  const galleryImgs = document.querySelectorAll('.gallery-img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxOverlay = document.getElementById('lightboxOverlay');

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

  const dealToggle = document.getElementById('dealToggle');
  const dealWizard = document.getElementById('dealWizard');

  dealToggle.addEventListener('click', () => {
    const expanded = dealWizard.classList.toggle('expanded');
    dealWizard.classList.toggle('collapsed', !expanded);
    dealToggle.textContent = expanded ? 'Hide Deal Form' : 'Submit a Deal';
  });

  function validateFields(fields) {
    let valid = true;
    fields.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      } else {
        field.classList.remove('error');
      }
    });
    return valid;
  }

  const steps = document.querySelectorAll('.deal-step');
  const successMsg = document.getElementById('dealSuccess');

  // STEP 1
  document.getElementById('nextStep1').addEventListener('click', () => {
    const fields = [
      document.getElementById('address'),
      document.getElementById('city'),
      document.getElementById('assetType')
    ];
    if (!validateFields(fields)) return;

    steps[0].classList.add('hidden');
    steps[1].classList.remove('hidden');
  });

  // STEP 2
  document.getElementById('backStep2').addEventListener('click', () => {
    steps[1].classList.add('hidden');
    steps[0].classList.remove('hidden');
  });

  document.getElementById('nextStep2').addEventListener('click', () => {
    const fields = [
      document.getElementById('price'),
      document.getElementById('summary')
    ];
    if (!validateFields(fields)) return;

    steps[1].classList.add('hidden');
    steps[2].classList.remove('hidden');
  });

  // STEP 3
  document.getElementById('backStep3').addEventListener('click', () => {
    steps[2].classList.add('hidden');
    steps[1].classList.remove('hidden');
  });

  document.getElementById('submitDeal').addEventListener('click', () => {
    const fields = [
      document.getElementById('brokerName'),
      document.getElementById('brokerEmail')
    ];
    if (!validateFields(fields)) return;

    steps.forEach(step => step.classList.add('hidden'));
    successMsg.classList.remove('hidden');
  });

  const infoBtn = document.getElementById('infoButton');
  const infoModal = document.getElementById('infoModal');
  const infoOverlay = document.getElementById('infoModalOverlay');
  const infoClose = document.getElementById('infoModalClose');

  function openInfoModal() {
    infoModal.classList.add('visible');
    infoOverlay.classList.add('visible');
  }

  function closeInfoModal() {
    infoModal.classList.remove('visible');
    infoOverlay.classList.remove('visible');
  }

  infoBtn.addEventListener('click', openInfoModal);
  infoClose.addEventListener('click', closeInfoModal);
  infoOverlay.addEventListener('click', closeInfoModal);

});
