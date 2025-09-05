document.addEventListener('DOMContentLoaded', function() {
    const donationOptions = document.querySelectorAll('.donation-option');
    const customAmountInput = document.getElementById('customAmount');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const purposeOptions = document.querySelectorAll('.purpose-option');
    const purposeInput = document.getElementById('purpose');
    const paymentMethodInput = document.getElementById('paymentMethod');
    const cardDetails = document.getElementById('cardDetails');
    const momoDetails = document.getElementById('momoDetails');

    // Handle Donation Amount Selection
    donationOptions.forEach(option => {
        option.addEventListener('click', () => {
            donationOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            customAmountInput.value = option.dataset.amount;
        });
    });

    // Handle Custom Amount Input
    customAmountInput.addEventListener('input', () => {
        donationOptions.forEach(opt => opt.classList.remove('active'));
    });

    // Handle Purpose Selection
    purposeOptions.forEach(option => {
        option.addEventListener('click', () => {
            purposeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            purposeInput.value = option.dataset.purpose;
        });
    });

    // Handle Payment Method Selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            paymentMethods.forEach(m => m.classList.remove('active'));
            method.classList.add('active');
            const selectedMethod = method.dataset.method;
            paymentMethodInput.value = selectedMethod;

            // Show/hide relevant payment sections
            if (selectedMethod === 'card') {
                cardDetails.classList.add('active');
                momoDetails.classList.remove('active');
                // Set required attribute for card inputs
                document.querySelectorAll('#cardDetails input').forEach(input => input.required = true);
                document.querySelectorAll('#momoDetails input').forEach(input => input.required = false);
            } else if (selectedMethod === 'momo') {
                momoDetails.classList.add('active');
                cardDetails.classList.remove('active');
                // Set required attribute for momo inputs
                document.querySelectorAll('#momoDetails input').forEach(input => input.required = true);
                document.querySelectorAll('#cardDetails input').forEach(input => input.required = false);
            }
        });
    });
});