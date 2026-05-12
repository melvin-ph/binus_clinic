document.addEventListener('DOMContentLoaded', () => {
    
    // --- Language Switcher ---
    let currentLang = 'EN';
    const translations = {
        'TA': {
            'nav-patient': 'நோயாளி தகவல்',
            'hero-h1': 'தனிப்பட்ட தொடுதலுடன் கூடிய விதிவிலக்கான பல் மருத்துவம்.',
            'book-now': 'இப்போது முன்பதிவு செய்யுங்கள்'
        },
        'EN': {
            'nav-patient': 'Patient Info',
            'hero-h1': 'Exceptional dentistry with a personal touch.',
            'book-now': 'Book Now'
        }
    };

    window.toggleLanguage = () => {
        currentLang = currentLang === 'EN' ? 'TA' : 'EN';
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) el.innerText = translations[currentLang][key];
        });
        // Special case for hero text if it has data-i18n
        const heroH1 = document.querySelector('.hero h1');
        if (heroH1) heroH1.innerText = translations[currentLang]['hero-h1'];
    };

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right, .zoom-in').forEach(el => {
        observer.observe(el);
    });

    // --- FAQ Accordion ---
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('active');
            const content = header.nextElementSibling;
            content.style.maxHeight = header.classList.contains('active') ? content.scrollHeight + 'px' : 0;
        });
    });

    // --- Appointment Booking ---
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = bookingForm.querySelector('button');
            const msg = document.getElementById('formMessage');
            btn.disabled = true;

            const payload = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                date: new Date().toLocaleDateString(), // Placeholder for real date picker
                time: "10:00 AM" // Placeholder
            };

            try {
                // Mock success since backend is removed
                msg.textContent = 'Success! We will contact you shortly.';
                msg.style.color = '#2ecc71';
                bookingForm.reset();
            } catch (err) {
                msg.textContent = 'Error booking appointment.';
                msg.style.color = '#e74c3c';
            } finally {
                btn.disabled = false;
                setTimeout(() => msg.textContent = '', 5000);
            }
        });
    }

    // --- Show More Services Toggle ---
    const showMoreBtn = document.getElementById('showMoreBtn');
    const extraCard = document.getElementById('extraTreatmentsCard');
    if (showMoreBtn && extraCard) {
        showMoreBtn.addEventListener('click', () => {
            const isHidden = extraCard.style.display === 'none';
            extraCard.style.display = isHidden ? 'flex' : 'none';
            showMoreBtn.innerHTML = isHidden ? 
                'Show Less <i class="fas fa-chevron-left"></i>' : 
                'Show More <i class="fas fa-chevron-right"></i>';
            
            if (isHidden) {
                extraCard.classList.add('visible');
            }
        });
    }
});
