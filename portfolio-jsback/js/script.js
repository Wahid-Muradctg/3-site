document.addEventListener('DOMContentLoaded', function () {

  // ====== Navbar scroll effect ======
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ====== Live Date & Time in Footer ======
  function updateDateTime() {
    const now = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const footerTime = document.getElementById('liveDateTime');
    if (footerTime) {
      footerTime.textContent = now.toLocaleDateString('en-US', options);
    }
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // ====== Scroll Reveal Animation ======
  const revealElements = document.querySelectorAll('.reveal');

  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 120;

    revealElements.forEach(function (el) {
      const revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - revealPoint) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', checkReveal);
  window.addEventListener('load', checkReveal);
  checkReveal();

  // ====== Particle Background ======
  function createParticles() {
    const container = document.createElement('div');
    container.className = 'particles';
    document.body.prepend(container);

    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (15 + Math.random() * 25) + 's';
      particle.style.animationDelay = (Math.random() * 20) + 's';
      particle.style.width = (2 + Math.random() * 3) + 'px';
      particle.style.height = particle.style.width;
      particle.style.opacity = 0.1 + Math.random() * 0.3;
      container.appendChild(particle);
    }
  }
  createParticles();

  // ====== Contact Form Validation ======
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');
    const successMsg = document.getElementById('formSuccess');

    function validateName() {
      const value = nameInput.value.trim();
      if (value === '') {
        nameError.textContent = 'Name is required';
        nameInput.classList.add('is-invalid');
        nameInput.classList.remove('is-valid');
        return false;
      } else if (value.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        nameInput.classList.add('is-invalid');
        nameInput.classList.remove('is-valid');
        return false;
      } else {
        nameError.textContent = '';
        nameInput.classList.remove('is-invalid');
        nameInput.classList.add('is-valid');
        return true;
      }
    }

    function validateEmail() {
      const value = emailInput.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value === '') {
        emailError.textContent = 'Email is required';
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
        return false;
      } else if (!emailPattern.test(value)) {
        emailError.textContent = 'Please enter a valid email';
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
        return false;
      } else {
        emailError.textContent = '';
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
        return true;
      }
    }

    function validatePhone() {
      const value = phoneInput.value.trim();
      const phonePattern = /^[\d\s\+\-\(\)]{7,15}$/;
      if (value === '') {
        phoneError.textContent = 'Phone is required';
        phoneInput.classList.add('is-invalid');
        phoneInput.classList.remove('is-valid');
        return false;
      } else if (!phonePattern.test(value)) {
        phoneError.textContent = 'Please enter a valid phone number';
        phoneInput.classList.add('is-invalid');
        phoneInput.classList.remove('is-valid');
        return false;
      } else {
        phoneError.textContent = '';
        phoneInput.classList.remove('is-invalid');
        phoneInput.classList.add('is-valid');
        return true;
      }
    }

    function validateMessage() {
      const value = messageInput.value.trim();
      if (value === '') {
        messageError.textContent = 'Message is required';
        messageInput.classList.add('is-invalid');
        messageInput.classList.remove('is-valid');
        return false;
      } else if (value.length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        messageInput.classList.add('is-invalid');
        messageInput.classList.remove('is-valid');
        return false;
      } else {
        messageError.textContent = '';
        messageInput.classList.remove('is-invalid');
        messageInput.classList.add('is-valid');
        return true;
      }
    }

    nameInput.addEventListener('blur', validateName);
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', validateEmail);
    phoneInput.addEventListener('blur', validatePhone);
    phoneInput.addEventListener('input', validatePhone);
    messageInput.addEventListener('blur', validateMessage);
    messageInput.addEventListener('input', validateMessage);

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isPhoneValid = validatePhone();
      const isMessageValid = validateMessage();

      if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
        successMsg.classList.remove('d-none');
        successMsg.textContent = 'Your message has been sent successfully!';
        contactForm.reset();
        document.querySelectorAll('.is-valid').forEach(function (el) {
          el.classList.remove('is-valid');
        });
      } else {
        successMsg.classList.add('d-none');
      }
    });
  }

  // ====== Training Certification Modal ======
  const certModal = document.getElementById('certModal');
  if (certModal) {
    certModal.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      const title = button.getAttribute('data-bs-title') || 'Certification Details';
      const desc = button.getAttribute('data-bs-description') || 'No details available.';
      const issuer = button.getAttribute('data-bs-issuer') || 'Unknown';
      const year = button.getAttribute('data-bs-year') || 'N/A';
      document.getElementById('certModalLabel').textContent = title;
      document.getElementById('certDescription').textContent = desc;
      document.getElementById('certIssuer').textContent = issuer;
      document.getElementById('certYear').textContent = year;
    });
  }

});
