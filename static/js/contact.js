// Contact Page Specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.querySelector('.form-success');
    const formError = document.querySelector('.form-error');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Hide previous messages
            formSuccess.style.display = 'none';
            formError.style.display = 'none';

            // Extract form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Disable button and show spinner
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            try {
                // In a real Django app, you'd send this to a view via a POST request.
                // You'll need to update this to point to your Django view URL.
                // Example: const response = await fetch('{% url "contact_form_submit" %}', { ... });
                const endpoint = '/api/contact'; // Placeholder for API endpoint

                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // You will need to add a CSRF token header for Django forms
                        // 'X-CSRFToken': '{{ csrf_token }}'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    formSuccess.style.display = 'block';
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    formError.querySelector('p').textContent = data.error || 'There was an error sending your message. Please try again.';
                    formError.style.display = 'block';
                }
            } catch (error) {
                console.error('Error sending message:', error);
                formError.querySelector('p').textContent = 'An unexpected error occurred. Please try again later.';
                formError.style.display = 'block';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }
        });
    }
});