document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');

    // Toggle password visibility
    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Toggle icon
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Handle form submission
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember-me').checked;

        // Hide error message
        errorMessage.style.display = 'none';

        // Validate the existing demo credentials.
        if (username === '8392746157' && password === '47298193') {
            // Successful login
            sessionStorage.setItem('accountStatus', 'active');
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('userFullName', 'MAURICE BYNE');
            sessionStorage.setItem('accountBalance', '331425.00');
            sessionStorage.setItem('clientNumber', '8392746157');

            if (rememberMe) {
                localStorage.setItem('rememberedUser', username);
            }

            // Add loading effect
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connessione in corso...';
            submitBtn.disabled = true;

            // Redirect after delay
            setTimeout(() => {
                window.location.href = 'dashboard.html?v=20260814-2';
            }, 1500);
        } else {
            // Show error
            errorText.textContent = 'Numero cliente o codice riservato errato';
            errorMessage.style.display = 'flex';

            // Shake animation
            loginForm.style.animation = 'shake 0.5s';
            setTimeout(() => {
                loginForm.style.animation = '';
            }, 500);
        }
    });

    // Check if user is remembered
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('username').value = rememberedUser;
        document.getElementById('remember-me').checked = true;
    }

    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);

    // Forgot password link
    const forgotLink = document.querySelector('.forgot-link');
    if (forgotLink) {
        forgotLink.addEventListener('click', function (e) {
            e.preventDefault();
            alert('Per reimpostare il tuo codice segreto, ti preghiamo di contattare la tua filiale BBVA o di chiamare il servizio clienti al numero 09 69 36 96 96.');
        });
    }
});
