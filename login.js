document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.toLowerCase();
        const password = document.getElementById('password').value;

        // Retrieve the stored users
        const users = JSON.parse(localStorage.getItem('voxiUsers')) || [];

        // Find the user with matching credentials
        const foundUser = users.find(user => user.email === email && user.password === password);

        if (foundUser) {
            alert(`Login successful! Welcome back, ${foundUser.name}.`);
            // In a real app, you'd create a session here.
            // For this project, we'll just redirect to the homepage.
            window.location.href = 'index.html';
        } else {
            alert('Invalid email or password. Please try again or sign up.');
        }
    });
});