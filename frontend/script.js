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

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Reset error messages
        nameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';

        // Validate form fields
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

        // If form validation fails, stop here
        if (!isValid) return;

        // Prepare the form data for backend submission
        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };       
    })
})
try {
    const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password
        })
    });

    if (!response.ok) {
        const errorDetails = await response.text(); // Get detailed error message
        throw new Error(`Network response was not ok: ${errorDetails}`);
    }

    const result = await response.json();

    if (result.success) {
        alert('Signup successful!');
        window.location.href = '/login.html'; // Redirect to login page
    } else {
        alert(`Signup failed: ${result.message}`);
    }
} catch (error) {
    console.error('Error during signup:', error);
    alert(`An error occurred during signup: ${error.message}`);
}
