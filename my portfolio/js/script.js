document.addEventListener('DOMContentLoaded', function () {

    updateDateTime();

    setInterval(updateDateTime, 1000);

    document.getElementById('currentYear').textContent = new Date().getFullYear();

    var goTopBtn = document.getElementById('goTop');
    if (goTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                goTopBtn.style.display = 'block';
            } else {
                goTopBtn.style.display = 'none';
            }
        });

        goTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var isValid = true;
            var requiredFields = contactForm.querySelectorAll('[required]');

            requiredFields.forEach(function (field) {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }

                field.addEventListener('input', function () {
                    if (this.value.trim()) {
                        this.classList.remove('is-invalid');
                    }
                });
            });

            var emailField = document.getElementById('email');
            if (emailField && emailField.value.trim()) {
                var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value.trim())) {
                    emailField.classList.add('is-invalid');
                    isValid = false;
                }
            }

            var phoneField = document.getElementById('phone');
            if (phoneField && phoneField.value.trim()) {
                var phonePattern = /^[\d\s+\-()]{7,15}$/;
                if (!phonePattern.test(phoneField.value.trim())) {
                    phoneField.classList.add('is-invalid');
                    isValid = false;
                }
            }

            if (isValid) {
                var successModal = new bootstrap.Modal(document.getElementById('successModal'));
                successModal.show();
                contactForm.reset();
            }
        });
    }

});

function updateDateTime() {
    var dateTimeElement = document.getElementById('liveDateTime');
    if (dateTimeElement) {
        var now = new Date();
        var options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        dateTimeElement.textContent = now.toLocaleDateString('en-US', options);
    }
}
