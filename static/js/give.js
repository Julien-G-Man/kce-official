// give.js

document.addEventListener('DOMContentLoaded', () => {
    const donationForm = document.getElementById('donationForm');
    const donationOptions = document.querySelectorAll('.donation-option');
    const customAmount = document.getElementById('customAmount');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const cardDetails = document.getElementById('cardDetails');
    const momoDetails = document.getElementById('momoDetails');
    const formSuccess = document.querySelector('.form-success');
    const formError = document.querySelector('.form-error');
    const paymentMethodInput = document.getElementById('paymentMethod');

    // Handle donation amount selection
    donationOptions.forEach(option => {
        option.addEventListener('click', () => {
            donationOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            customAmount.value = ''; // Clear custom amount field
        });
    });

    customAmount.addEventListener('input', () => {
        donationOptions.forEach(opt => opt.classList.remove('active'));
    });

    // Handle payment methods
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            paymentMethods.forEach(m => m.classList.remove('active'));
            method.classList.add('active');
            
            const selectedMethod = method.dataset.method;
            paymentMethodInput.value = selectedMethod;

            cardDetails.style.display = 'none';
            momoDetails.style.display = 'none';

            // Set required attributes based on selected method
            document.getElementById('cardName').required = false;
            document.getElementById('cardNumber').required = false;
            document.getElementById('expiryDate').required = false;
            document.getElementById('cvv').required = false;
            document.getElementById('momoNumber').required = false;

            if (selectedMethod === 'card') {
                cardDetails.style.display = 'block';
                document.getElementById('cardName').required = true;
                document.getElementById('cardNumber').required = true;
                document.getElementById('expiryDate').required = true;
                document.getElementById('cvv').required = true;
            } else if (selectedMethod === 'momo') {
                momoDetails.style.display = 'block';
                document.getElementById('momoNumber').required = true;
            }
        });
    });

    // Handle form submission
    donationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        formSuccess.style.display = 'none';
        formError.style.display = 'none';

        const amountElement = document.querySelector('.donation-option.active') || customAmount;
        let amount = amountElement.dataset ? amountElement.dataset.amount : customAmount.value;
        amount = parseFloat(amount);
        const selectedMethod = paymentMethodInput.value;
        const momoNumber = document.getElementById('momoNumber').value;
        
        if (isNaN(amount) || amount <= 0) {
            formError.style.display = 'block';
            formError.innerHTML = `<i class="fas fa-exclamation-circle"></i><p>Please enter a valid donation amount.</p>`;
            return;
        }

        // Basic validation for Mobile Money
        if (selectedMethod === 'momo' && !momoNumber.match(/^(0|\+233)[0-9]{9}$/)) {
            formError.style.display = 'block';
            formError.innerHTML = `<i class="fas fa-exclamation-circle"></i><p>Please enter a valid Ghana Mobile Money number.</p>`;
            return;
        }

        const formData = new FormData(donationForm);
        formData.set('amount', amount);

        // Here you would typically send the data to your Django backend.
        // This is a placeholder for your AJAX call.
        try {
            // Example fetch request (you need to implement the Django view for this)
            // const response = await fetch(donationForm.action, {
            //     method: 'POST',
            //     body: formData,
            //     headers: {
            //         'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
            //     }
            // });

            // const data = await response.json();
            
            // if (response.ok && data.status === 'success') {
            //     formSuccess.style.display = 'block';
            //     donationForm.reset();
            // } else {
            //     formError.style.display = 'block';
            //     formError.innerHTML = `<i class="fas fa-exclamation-circle"></i><p>${data.message || 'An unexpected error occurred.'}</p>`;
            // }

            // Simulating a successful response for demonstration
            console.log('Form submitted successfully with data:', Object.fromEntries(formData.entries()));
            formSuccess.style.display = 'block';
            donationForm.reset();

        } catch (error) {
            console.error('Error submitting form:', error);
            formError.style.display = 'block';
            formError.innerHTML = `<i class="fas fa-exclamation-circle"></i><p>An error occurred. Please try again later.</p>`;
        }
    });
});