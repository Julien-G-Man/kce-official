// Enhanced subscription form with friendly messaging
document.addEventListener('DOMContentLoaded', () => {
    const subscriptionForm = document.getElementById('subscriptionForm');
    const formSuccess = document.querySelector('.form-success');
    const formError = document.querySelector('.form-error');
    const submitBtn = subscriptionForm.querySelector('button[type="submit"]');

    // Add fade-in animation to elements as they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Enhanced subscription form handling
    subscriptionForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // In a real Django project, you would handle this form submission
        // using Django's views and a POST request. For now, this is a
        // client-side placeholder.

        const formData = {
            name: document.getElementById('subscriberName').value,
            whatsapp: document.getElementById('whatsapp').value,
            email: document.getElementById('subscriberEmail').value
        };

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-heart fa-beat"></i> Joining Our Family...';
        formSuccess.style.display = 'none';
        formError.style.display = 'none';

        try {
            // Simulate API call for demo purposes
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            formSuccess.style.display = 'block';
            formError.style.display = 'none';
            subscriptionForm.reset();
            
            // Add celebratory effect
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Welcome to the Family!';
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Join Our Family';
                submitBtn.disabled = false;
            }, 3000);
            
        } catch (error) {
            console.error('Error subscribing:', error);
            formSuccess.style.display = 'none';
            formError.querySelector('p').textContent = 'Oops! Something went wrong. Please try again or contact us directly.';
            formError.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Join Our Family';
        }
    });

    // Add lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.onload = () => img.classList.add('loaded');
    });
});

// Enhanced WebP fallback with friendlier error handling
(function() {
    var webpTest = new Image();
    webpTest.onload = webpTest.onerror = function () {
        if (webpTest.height !== 2) {
            var hero = document.querySelector('.responsive-hero-bg');
            if (hero) {
                // Use a Django static URL here instead of a hardcoded path
                hero.style.backgroundImage = "url('{% static 'img/pstansere.jpg' %}')";
            }
        }
    };
    webpTest.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4TAYAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
})();

// Add friendly hover effects
document.addEventListener('DOMContentLoaded', () => {
    // Add gentle bounce to cards on hover
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add pulse effect to primary buttons
    const primaryBtns = document.querySelectorAll('.btn-primary');
    primaryBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.animation = 'pulse 1s infinite';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.animation = 'none';
        });
    });
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: translateY(-4px) scale(1); }
        50% { transform: translateY(-4px) scale(1.05); }
    }
`;
document.head.appendChild(style);