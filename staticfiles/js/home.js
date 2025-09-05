document.addEventListener('DOMContentLoaded', () => {
    const subscriptionForm = document.getElementById('subscriptionForm');
    const formSuccess = document.querySelector('.form-success');
    const formError = document.querySelector('.form-error');
    const submitBtn = subscriptionForm.querySelector('button[type="submit"]');

    // Enhanced subscription form handling
    subscriptionForm.addEventListener('submit', async (e) => {
        e.preventDefault();

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
            // Your form submission logic here
            // This is the part you'll connect to your Django view
            // The existing form in your home.html already has the
            // CSRF token and action URL.
            const response = await fetch(subscriptionForm.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                formSuccess.style.display = 'block';
                formError.style.display = 'none';
                subscriptionForm.reset();
            } else {
                formSuccess.style.display = 'none';
                formError.querySelector('p').textContent = 'Oops! Something went wrong. Please try again or contact us directly.';
                formError.style.display = 'block';
            }
        } catch (error) {
            console.error('Error subscribing:', error);
            formSuccess.style.display = 'none';
            formError.querySelector('p').textContent = 'Oops! Something went wrong. Please try again or contact us directly.';
            formError.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Join Our Family';
        }
    });
});

// Enhanced WebP fallback with friendlier error handling
(function() {
    var webpTest = new Image();
    webpTest.onload = webpTest.onerror = function () {
        if (webpTest.height !== 2) {
            var hero = document.querySelector('.responsive-hero-bg');
            if (hero) {
                hero.style.backgroundImage = "url('{% static 'img/pstansere.jpg' %}')";
            }
        }
    };
    webpTest.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4TAYAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
})();