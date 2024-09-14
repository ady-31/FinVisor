document.addEventListener('DOMContentLoaded', () => {
    // GSAP animations
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.from('.login-box', { opacity: 0, y: -50, duration: 1 })
      .from('.login-box h2', { opacity: 0, y: -20, duration: 0.5 }, '-=0.5')
      .from('.input-group', { opacity: 0, y: -20, duration: 0.5, stagger: 0.2 }, '-=0.5')
      .from('.login-btn', { opacity: 0, y: -20, duration: 0.5 }, '-=0.3')
      .from('.signup-link', { opacity: 0, y: -20, duration: 0.5 }, '-=0.3')
      .from('.shape', { 
          opacity: 0, 
          scale: 0, 
          duration: 1, 
          stagger: 0.2, 
          ease: 'elastic.out(1, 0.3)' 
      }, '-=1');

    // Floating animation for background shapes
    gsap.to('.shape', {
        y: '+=20',
        rotation: '+=15',
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: {
            each: 0.5,
            from: 'random'
        }
    });

    // Input focus animation
    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input.nextElementSibling, { top: -20, fontSize: 12, color: '#fad0c4', duration: 0.3 });
            gsap.to(input.nextElementSibling.nextElementSibling, { width: '100%', duration: 0.3 });
        });
        input.addEventListener('blur', () => {
            if (input.value === '') {
                gsap.to(input.nextElementSibling, { top: 0, fontSize: 16, color: '#fff', duration: 0.3 });
                gsap.to(input.nextElementSibling.nextElementSibling, { width: '0%', duration: 0.3 });
            }
        });
    });

    // Login button hover animation
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.addEventListener('mouseenter', () => {
        gsap.to(loginBtn, { backgroundColor: '#ff9a9e', color: '#fff', duration: 0.3 });
    });
    loginBtn.addEventListener('mouseleave', () => {
        gsap.to(loginBtn, { backgroundColor: '#fff', color: '#ff9a9e', duration: 0.3 });
    });

    // Form submission animation
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btnText = loginBtn.querySelector('.btn-text');
        const btnLoader = loginBtn.querySelector('.btn-loader');

        // Button click animation
        gsap.to(loginBtn, { 
            scale: 0.95, 
            duration: 0.1, 
            yoyo: true, 
            repeat: 1,
            onComplete: () => {
                // Hide button text, show loader
                gsap.to(btnText, { opacity: 0, duration: 0.2 });
                gsap.to(btnLoader, { opacity: 1, visibility: 'visible', duration: 0.2 });
                
                // Rotate loader
                gsap.to(btnLoader, { 
                    rotation: 360, 
                    duration: 1, 
                    repeat: -1, 
                    ease: 'linear' 
                });

                // Simulate API call
                setTimeout(() => {
                    gsap.to(btnLoader, { opacity: 0, visibility: 'hidden', duration: 0.2 });
                    gsap.to(btnText, { opacity: 1, duration: 0.2, text: 'Success!' });

                    // Success animation
                    gsap.to('.login-box', { 
                        y: -20, 
                        opacity: 0, 
                        duration: 0.5, 
                        delay: 1, 
                        onComplete: () => {
                            alert('Login successful!');
                            loginForm.reset();
                            gsap.to(btnText, { text: 'Login', duration: 0 });
                            gsap.to('.login-box', { y: 0, opacity: 1, duration: 0.5 });
                        }
                    });
                }, 2000);
            }
        });
    });
    const login = document.getElementById('loginForm');
        const message = document.getElementById('message');

        login.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:5000/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    message.textContent = data.message; // Display success message
                    console.log('Login successful! Token:', data.token);
                } else {
                    message.textContent = data.message; // Display error message
                }
            } catch (error) {
                message.textContent = 'An error occurred';
                console.error('Error:', error);
            }
        });
});