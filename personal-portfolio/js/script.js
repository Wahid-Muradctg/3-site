// Portfolio.Pro JavaScript Functions

document.addEventListener('DOMContentLoaded', function () {
    // 1. Live Clock Widget
    const clockElement = document.getElementById('liveClock');
    if (clockElement) {
        function updateClock() {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            const dateString = now.toLocaleDateString('en-US', options);
            const timeString = now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                hour12: true 
            });
            clockElement.textContent = `${dateString} — ${timeString}`;
        }
        updateClock();
        setInterval(updateClock, 1000);
    }

    // 2. Skill Progress Bars Animation (Trigger on page load or scroll)
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    if (skillBars.length > 0) {
        // Animate on load with a slight delay
        setTimeout(() => {
            skillBars.forEach(bar => {
                const percent = bar.getAttribute('data-percent');
                bar.style.width = percent + '%';
            });
        }, 300);
    }

    // 3. Contact Form Custom Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const fields = ['formName', 'formEmail', 'formPhone', 'formAddress', 'formMessage'];

        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            let isValid = true;

            fields.forEach(id => {
                const input = document.getElementById(id);
                if (!input) return;

                const feedback = document.getElementById(id + 'Feedback');

                // Check field validity
                if (input.value.trim() === '' || (input.type === 'email' && !validateEmail(input.value))) {
                    isValid = false;
                    input.classList.remove('border-green');
                    input.classList.add('border-coral');
                    if (feedback) {
                        feedback.classList.remove('text-green');
                        feedback.classList.add('text-coral');
                        feedback.style.display = 'block';
                    }
                } else {
                    input.classList.remove('border-coral');
                    input.classList.add('border-green');
                    if (feedback) {
                        feedback.classList.remove('text-coral');
                        feedback.classList.add('text-green');
                        feedback.style.display = 'none';
                    }
                }
            });

            if (isValid) {
                // Open confirmation success modal
                const modalEl = document.getElementById('confirmationModal');
                if (modalEl) {
                    const confirmModal = new bootstrap.Modal(modalEl);
                    confirmModal.show();
                    contactForm.reset();
                    // Reset field borders
                    fields.forEach(id => {
                        const input = document.getElementById(id);
                        if (input) input.classList.remove('border-green', 'border-coral');
                    });
                }
            }
        });

        // Add input event listeners to clear error dynamically
        fields.forEach(id => {
            const input = document.getElementById(id);
            if (!input) return;
            
            input.addEventListener('input', function() {
                const feedback = document.getElementById(id + 'Feedback');
                if (input.value.trim() !== '') {
                    input.classList.remove('border-coral');
                    input.classList.add('border-green');
                    if (feedback) feedback.style.display = 'none';
                } else {
                    input.classList.remove('border-green');
                    input.classList.add('border-coral');
                    if (feedback) {
                        feedback.classList.add('text-coral');
                        feedback.style.display = 'block';
                    }
                }
            });
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // 4. Portfolio Certification Card Modals Setup
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach(card => {
        card.addEventListener('click', function() {
            const certTitle = this.querySelector('.cert-title').textContent;
            const certIssuer = this.querySelector('.cert-issuer').textContent;
            const certCode = this.getAttribute('data-cert-code') || 'N/A';
            const certImage = this.getAttribute('data-cert-img') || '';

            // Inject into modal elements
            document.getElementById('modalCertTitle').textContent = certTitle;
            document.getElementById('modalCertIssuer').textContent = certIssuer;
            document.getElementById('modalCertCode').textContent = certCode;
            
            const certModal = new bootstrap.Modal(document.getElementById('certDetailModal'));
            certModal.show();
        });
    });
});
