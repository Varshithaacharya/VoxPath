document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value.toLowerCase();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // --- Validation ---
        if (!name || !email || !password || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        // Retrieve existing users from localStorage or initialize an empty array
        const users = JSON.parse(localStorage.getItem('voxiUsers')) || [];

        // Check if the email is already registered
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            alert('An account with this email already exists. Please log in.');
            return;
        }

        // Create the new user object
        // In a real application, you would hash the password here before saving!
        const newUser = {
            name: name,
            email: email,
            password: password 
        };

        // Add the new user to the array
        users.push(newUser);

        // Save the updated users array back to localStorage
        localStorage.setItem('voxiUsers', JSON.stringify(users));

        alert('Account created successfully! You can now log in.');

        // Redirect to the login page
        window.location.href = 'login.html';
    });
});