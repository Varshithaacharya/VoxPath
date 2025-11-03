document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('voxiCart')) || [];
    const summaryItemsEl = document.getElementById('summary-items');
    const summaryTotalEl = document.getElementById('summary-total');
    const paymentForm = document.getElementById('payment-form');

    // 1. Display the order summary
    if (cart.length > 0) {
        summaryItemsEl.innerHTML = cart.map(item => `
            <div class="summary-item">
                <span>${item.name} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        summaryTotalEl.textContent = total.toFixed(2);
    } else {
        // If cart is empty, redirect back to home
        window.location.href = 'index.html';
    }

    // 2. Handle form submission
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual form submission

        // Simple validation (can be made more robust)
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;

        if (cardNumber.length < 16 || !expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/) || cvv.length < 3) {
            alert('Please enter valid payment details.');
            return;
        }

        // Simulate payment processing
        const payButton = document.querySelector('.pay-now-btn');
        payButton.textContent = 'Processing...';
        payButton.disabled = true;

        setTimeout(() => {
            // "Payment" is successful
            // Clear the cart from local storage
            localStorage.removeItem('voxiCart');
            
            // Redirect to the thank you page
            window.location.href = 'thankyou.html';
        }, 2000); // Simulate a 2-second delay
    });
});