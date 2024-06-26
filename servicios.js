document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

    form.addEventListener('input', function(event) {
        const target = event.target;
        validateField(target);
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;
        const fields = ['name', 'email', 'subject', 'message'];

        fields.forEach(function(fieldId) {
            const field = document.getElementById(fieldId);
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            alert('Formulario enviado correctamente.');
            form.reset();
            clearErrors();
        }
    });

    function validateField(field) {
        const errorElement = document.getElementById(`${field.id}Error`);
        let isValid = true;

        if (field.value.trim() === '') {
            showError(errorElement, 'Este campo es obligatorio.');
            isValid = false;
        } else {
            if (field.type === 'email' && !isValidEmail(field.value)) {
                showError(errorElement, 'Formato de correo electrónico incorrecto.');
                isValid = false;
            } else if (field.hasAttribute('minlength') && field.value.length < field.getAttribute('minlength')) {
                showError(errorElement, `Debe tener al menos ${field.getAttribute('minlength')} caracteres.`);
                isValid = false;
            } else if (field.hasAttribute('maxlength') && field.value.length > field.getAttribute('maxlength')) {
                showError(errorElement, `No debe exceder los ${field.getAttribute('maxlength')} caracteres.`);
                isValid = false;
            } else {
                clearError(errorElement);
            }
        }

        return isValid;
    }

    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }

    function clearError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(function(element) {
            clearError(element);
        });
    }

    function isValidEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }
});
