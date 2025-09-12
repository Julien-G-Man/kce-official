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

        // Basic client-side validation
        if (!formData.name || !formData.email) {
            formError.style.display = 'block';
            formError.querySelector('p').textContent = 'Name and email are required fields.';
            formSuccess.style.display = 'none';
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-heart fa-beat"></i> Subscribing...';
        formSuccess.style.display = 'none';
        formError.style.display = 'none';

        try {
            const response = await fetch(subscriptionForm.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                formSuccess.style.display = 'block';
                formSuccess.style.color = '#155724';
                formSuccess.style.backgroundColor = '#d4edda';
                formSuccess.style.borderColor = '#c3e6cb';
                formSuccess.style.padding = '10px';
                formSuccess.style.borderRadius = '5px';
                formSuccess.style.marginBottom = '10px';
                formSuccess.querySelector('p').textContent = data.message;
                formError.style.display = 'none';
                subscriptionForm.reset();
            } else {
                const errorData = await response.json();
                let errorMessage = 'An unknown error occurred.';
                if (errorData.errors) {
                    errorMessage = Object.values(errorData.errors).map(fieldErrors => fieldErrors.join(', ')).join(' ');
                }
                
                formSuccess.style.display = 'none';
                formError.style.display = 'block';
                formError.style.color = '#721c24';
                formError.style.backgroundColor = '#f8d7da';
                formError.style.borderColor = '#f5c6cb';
                formError.style.padding = '10px';
                formError.style.borderRadius = '5px';
                formError.style.marginBottom = '10px';
                formError.querySelector('p').textContent = errorMessage;
            }
        } catch (error) {
            console.error('Error subscribing:', error);
            formSuccess.style.display = 'none';
            formError.style.display = 'block';
            formError.style.color = '#721c24';
            formError.style.backgroundColor = '#f8d7da';
            formError.style.borderColor = '#f5c6cb';
            formError.style.padding = '10px';
            formError.style.borderRadius = '5px';
            formError.style.marginBottom = '10px';
            formError.querySelector('p').textContent = 'An unexpected network error occurred. Please try again later.';
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
