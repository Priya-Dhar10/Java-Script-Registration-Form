document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const phone = document.getElementById('phone');
    const genderRadios = document.getElementsByName('gender');

    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const phoneError = document.getElementById('phoneError');
    const genderError = document.getElementById('genderError');

    function setError(input, errorElem, message) {
        input.classList.add('invalid');
        errorElem.textContent = message;
    }
    function setSuccess(input, errorElem) {
        input.classList.remove('invalid');
        errorElem.textContent = '';
    }
    function validateFullName() {
        const value = fullName.value.trim();
        if (value.length < 3) {
            setError(fullName, fullNameError, 'Full Name must be at least 3 characters.');
            return false;
        }
        setSuccess(fullName, fullNameError);
        return true;
    }
    function validateEmail() {
        const value = email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setError(email, emailError, 'Enter a valid email address.');
            return false;
        }
        setSuccess(email, emailError);
        return true;
    }
    function validatePassword() {
        const value = password.value;
        const pwRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;
        if (!pwRegex.test(value)) {
            setError(password, passwordError, 'Password must be 6+ chars, 1 uppercase, 1 number, 1 special char.');
            return false;
        }
        setSuccess(password, passwordError);
        return true;
    }
    function validateConfirmPassword() {
        if (confirmPassword.value !== password.value || confirmPassword.value === '') {
            setError(confirmPassword, confirmPasswordError, 'Passwords do not match.');
            return false;
        }
        setSuccess(confirmPassword, confirmPasswordError);
        return true;
    }
    function validatePhone() {
        const value = phone.value.trim();
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value)) {
            setError(phone, phoneError, 'Phone number must be exactly 10 digits.');
            return false;
        }
        setSuccess(phone, phoneError);
        return true;
    }
    function validateGender() {
        let selected = false;
        for (let radio of genderRadios) {
            if (radio.checked) {
                selected = true;
                break;
            }
        }
        if (!selected) {
            genderError.textContent = 'Please select a gender.';
            return false;
        }
        genderError.textContent = '';
        return true;
    }

    // Real-time validation
    fullName.addEventListener('input', validateFullName);
    email.addEventListener('input', validateEmail);
    password.addEventListener('input', validatePassword);
    confirmPassword.addEventListener('input', validateConfirmPassword);
    phone.addEventListener('input', validatePhone);
    genderRadios.forEach(radio => radio.addEventListener('change', validateGender));

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let valid = true;
        if (!validateFullName()) valid = false;
        if (!validateEmail()) valid = false;
        if (!validatePassword()) valid = false;
        if (!validateConfirmPassword()) valid = false;
        if (!validatePhone()) valid = false;
        if (!validateGender()) valid = false;
        if (valid) {
            alert('Registration Successful!');
            form.reset();
        }
    });
});
