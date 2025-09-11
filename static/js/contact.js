// contact.js

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.querySelector('.form-success');
    const formError = document.querySelector('.form-error');
    const submitBtn = document.getElementById('contactForm').querySelector('button[type="submit"]');

    function displayErrors(errors) {
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Loop through each field with an error and display it
        for (const field in errors) {
            const errorList = errors[field];
            const inputElement = document.getElementById(field);
            if (inputElement) {
                const errorMessageDiv = document.createElement('div');
                errorMessageDiv.classList.add('error-message');
                errorMessageDiv.style.color = 'red';
                errorMessageDiv.style.fontSize = '0.9em';
                errorMessageDiv.style.marginTop = '5px';
                errorMessageDiv.innerHTML = errorList.map(error => `<p>${error}</p>`).join('');
                inputElement.parentNode.appendChild(errorMessageDiv);
            }
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Clear any old messages
            displayErrors({});
            formSuccess.style.display = 'none';
            formError.style.display = 'none';

            // new FormData API
            // This line gathers all data from the form
            const formData = new FormData(contactForm);
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            try {
                const endpoint = '/members/contact_submit/';
                
                const response = await fetch(endpoint, {
                    method: 'POST',
                    body: formData // This sends the data directly
                });
                
                const data = await response.json();

                if (response.ok) {
                    formSuccess.style.display = 'block';
                    contactForm.reset();
                } else {
                    formError.style.display = 'block';
                    if (data.errors) {
                        displayErrors(data.errors);
                    } else {
                        formError.querySelector('p').textContent = data.message || 'There was an error sending your message. Please try again.';
                    }
                }
            } catch (error) {
                console.error('Error sending message:', error);
                formError.style.display = 'block';
                formError.querySelector('p').textContent = 'A network error occurred. Please try again.';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }
        });
    }

    // Function to get CSRF token from cookie
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});