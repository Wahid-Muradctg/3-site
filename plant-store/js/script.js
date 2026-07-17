// GreenNest Plant Store JavaScript Functions

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

    // 2. Custom Accordion (Membership Tiers: Basic, Green Club, Premium Grower)
    const accordionHeaders = document.querySelectorAll('.plant-accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const body = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            // Close all items
            accordionHeaders.forEach(otherHeader => {
                otherHeader.classList.remove('active');
                otherHeader.nextElementSibling.style.maxHeight = null;
            });

            // Toggle active state
            if (!isActive) {
                this.classList.add('active');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });

        // Initialize active state if present
        if (header.classList.contains('active')) {
            const body = header.nextElementSibling;
            body.style.maxHeight = body.scrollHeight + 'px';
        }
    });

    // 3. Contact Form Submission Modal Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent standard refresh

            // Check input validity
            if (!contactForm.checkValidity()) {
                event.stopPropagation();
                contactForm.classList.add('was-validated');
                return;
            }

            // Launch Bootstrap Modal popup
            const modalEl = document.getElementById('confirmationModal');
            if (modalEl) {
                const confirmModal = new bootstrap.Modal(modalEl);
                confirmModal.show();
                contactForm.reset();
                contactForm.classList.remove('was-validated');
            }
        });
    }

    // 4. Products Add to Cart Custom Alerts
    const addToCartBtns = document.querySelectorAll('.btn-add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const plantName = this.closest('.plant-card') ? 
                this.closest('.plant-card').querySelector('.plant-name').textContent : 
                'Plant';
            alert(`"${plantName}" has been added to your shopping cart.`);
        });
    });

    // 5. Products Load More Button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            this.textContent = "Sprouting new plants...";
            this.disabled = true;
            setTimeout(() => {
                alert("All plants have been displayed!");
                this.style.display = 'none';
            }, 1000);
        });
    }
});
