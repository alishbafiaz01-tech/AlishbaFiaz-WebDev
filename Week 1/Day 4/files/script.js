// Cities data
const cities = {
    pakistan: ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar"],
    india: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"],
    usa: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
    uk: ["London", "Manchester", "Birmingham", "Liverpool", "Leeds"]
};

// Country phone codes
const phoneCodes = {
    pakistan: "+92",
    india:    "+91",
    usa:      "+1",
    uk:       "+44"
};

// Country phone placeholder hints
const phonePlaceholders = {
    pakistan: "3001234567",
    india:    "9876543210",
    usa:      "2025550123",
    uk:       "7700900123"
};

// Get all elements
const name          = document.getElementById('name');
const email         = document.getElementById('email');
const password      = document.getElementById('password');
const phone         = document.getElementById('phone');
const dob           = document.getElementById('dob');
const country       = document.getElementById('country');
const city          = document.getElementById('city');
const submitBtn     = document.getElementById('submitBtn');
const profileImage  = document.getElementById('profileImage');
const preview       = document.getElementById('preview');
const phoneCodeEl   = document.getElementById('phoneCode');
const phoneWrap     = phone.parentElement;

// Auto fill from local storage
window.onload = function() {
    const saved = JSON.parse(localStorage.getItem('userData'));
    if (saved) {
        name.value  = saved.name  || '';
        email.value = saved.email || '';
        phone.value = saved.phone || '';
        dob.value   = saved.dob   || '';
        if (saved.country) {
            country.value = saved.country;
            updateCities(saved.country, saved.city);
            updatePhoneCode(saved.country);
        }
    }
};


profileImage.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});


country.addEventListener('change', function() {
    updateCities(this.value, '');
    updatePhoneCode(this.value);
    validateCountry();
    checkForm();
});

function updateCities(selectedCountry, selectedCity) {
    city.innerHTML = '<option value="">Select City</option>';
    if (selectedCountry && cities[selectedCountry]) {
        cities[selectedCountry].forEach(c => {
            const option = document.createElement('option');
            option.value = c;
            option.textContent = c;
            if (c === selectedCity) option.selected = true;
            city.appendChild(option);
        });
    }
}

function updatePhoneCode(selectedCountry) {
    if (selectedCountry && phoneCodes[selectedCountry]) {
        phoneCodeEl.textContent = phoneCodes[selectedCountry];
        phone.placeholder       = phonePlaceholders[selectedCountry];
        phone.disabled          = false;
    } else {
        phoneCodeEl.textContent = '+__';
        phone.placeholder       = 'Select country first';
        phone.value             = '';
        phone.disabled          = true;
        phoneWrap.classList.remove('valid', 'invalid');
        showError('phoneError', '');
    }
}

// Validate Name
name.addEventListener('input', function() {
    validateName();
    checkForm();
});

function validateName() {
    const val = name.value.trim();
    if (val.length < 3) {
        showError('nameError', 'Name must be at least 3 characters');
        name.className = 'invalid';
        return false;
    }
    showError('nameError', '');
    name.className = 'valid';
    return true;
}

// Validate Email
email.addEventListener('input', function() {
    validateEmail();
    checkForm();
});

function validateEmail() {
    const val   = email.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val)) {
        showError('emailError', 'Enter a valid email address');
        email.className = 'invalid';
        return false;
    }
    showError('emailError', '');
    email.className = 'valid';
    return true;
}

// Validate Password
password.addEventListener('input', function() {
    validatePassword();
    checkForm();
});

function validatePassword() {
    const val = password.value;
    if (val.length < 8) {
        showError('passwordError', 'Password must be at least 8 characters');
        password.className = 'invalid';
        return false;
    }
    if (!/[A-Z]/.test(val)) {
        showError('passwordError', 'Password must contain at least one uppercase letter');
        password.className = 'invalid';
        return false;
    }
    if (!/[0-9]/.test(val)) {
        showError('passwordError', 'Password must contain at least one number');
        password.className = 'invalid';
        return false;
    }
    showError('passwordError', '');
    password.className = 'valid';
    return true;
}

// Validate Phone
phone.addEventListener('input', function() {
    validatePhone();
    checkForm();
});

function validatePhone() {
    const val = phone.value.trim();
    if (!/^\d{10,11}$/.test(val)) {
        showError('phoneError', 'Enter a valid phone number (10-11 digits)');
        phoneWrap.classList.remove('valid');
        phoneWrap.classList.add('invalid');
        return false;
    }
    showError('phoneError', '');
    phoneWrap.classList.remove('invalid');
    phoneWrap.classList.add('valid');
    return true;
}

// Validate DOB (18+)
dob.addEventListener('change', function() {
    validateDob();
    checkForm();
});

function validateDob() {
    const val = dob.value;
    if (!val) {
        showError('dobError', 'Please enter your date of birth');
        return false;
    }
    const birthDate = new Date(val);
    const today     = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 18) {
        showError('dobError', 'You must be at least 18 years old');
        return false;
    }
    showError('dobError', '');
    return true;
}

// Validate Country
function validateCountry() {
    if (!country.value) {
        showError('countryError', 'Please select a country');
        country.className = 'invalid';
        return false;
    }
    showError('countryError', '');
    country.className = 'valid';
    return true;
}

// Validate City
city.addEventListener('change', function() {
    validateCity();
    checkForm();
});

function validateCity() {
    if (!city.value) {
        showError('cityError', 'Please select a city');
        city.className = 'invalid';
        return false;
    }
    showError('cityError', '');
    city.className = 'valid';
    return true;
}

// Check if whole form is valid
function checkForm() {
    if (
        validateName()    &&
        validateEmail()   &&
        validatePassword()&&
        validatePhone()   &&
        validateDob()     &&
        validateCountry() &&
        validateCity()
    ) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// Show error message
function showError(id, message) {
    document.getElementById(id).textContent = message;
}

// Submit form
document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const selectedCode = phoneCodeEl.textContent;

    const userData = {
        name:    name.value,
        email:   email.value,
        phone:   selectedCode + ' ' + phone.value,
        dob:     dob.value,
        country: country.value,
        city:    city.value
    };

    // Save to local storage
    localStorage.setItem('userData', JSON.stringify(userData));

    // Show modal
    document.getElementById('modalData').innerHTML = `
        <p><strong>Name:</strong> ${userData.name}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Phone:</strong> ${userData.phone}</p>
        <p><strong>Date of Birth:</strong> ${userData.dob}</p>
        <p><strong>Country:</strong> ${userData.country}</p>
        <p><strong>City:</strong> ${userData.city}</p>
    `;

    document.getElementById('modal').classList.add('active');
});

// Close modal
function closeModal() {
    document.getElementById('modal').classList.remove('active');
}