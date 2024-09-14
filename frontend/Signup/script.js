document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset errors
        nameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';

        // Validate fields
        let isValid = true;

        if (!nameInput.value.trim()) {
            nameError.textContent = 'Full name is required';
            isValid = false;
        }

        if (!emailInput.value.trim()) {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
            emailError.textContent = 'Email is invalid';
            isValid = false;
        }

        if (!passwordInput.value) {
            passwordError.textContent = 'Password is required';
            isValid = false;
        } else if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            isValid = false;
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
            isValid = false;
        }

        if (isValid) {
            // Form is valid, you can submit it
            console.log('Form submitted', {
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            });

            // Reset form
            form.reset();
            alert('Sign up successful! Welcome to YourApp!');
        }
    });
});