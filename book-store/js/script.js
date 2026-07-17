// PageHaven Book Store JavaScript Functions

document.addEventListener('DOMContentLoaded', function () {
    // 1. Live Clock
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

    // 2. Custom Collapsible Accordion (Membership Tiers)
    const accordionHeaders = document.querySelectorAll('.custom-accordion-header');
    accordionHeaders.forEach(header => {
        // Handle click event
        header.addEventListener('click', function () {
            const body = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            // Close all items
            accordionHeaders.forEach(otherHeader => {
                otherHeader.classList.remove('active');
                otherHeader.nextElementSibling.style.maxHeight = null;
            });

            // If not previously active, open it
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

    // 3. Contact Form Submission Modal
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Stop page reload

            // Simple client side checks
            if (!contactForm.checkValidity()) {
                event.stopPropagation();
                contactForm.classList.add('was-validated');
                return;
            }

            // If valid, show the confirmation modal
            const modalEl = document.getElementById('confirmationModal');
            if (modalEl) {
                const confirmModal = new bootstrap.Modal(modalEl);
                confirmModal.show();
                contactForm.reset();
                contactForm.classList.remove('was-validated');
            }
        });
    }

    // 4. Products Add to Cart Alert/Toast
    const addToCartBtns = document.querySelectorAll('.btn-add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const bookTitle = this.closest('.book-card') ? 
                this.closest('.book-card').querySelector('.book-title').textContent : 
                'Book';
            alert(`"${bookTitle}" has been added to your cart.`);
        });
    });

    // 5. Products Load More Button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            this.textContent = "Loading...";
            this.disabled = true;
            setTimeout(() => {
                alert("All books have been loaded!");
                this.style.display = 'none';
            }, 1000);
        });
    }
});
