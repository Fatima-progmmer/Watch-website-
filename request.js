$(document).ready(function () {
    // Form step navigation
    $('.next-btn').on('click', function (e) {
        e.preventDefault();
        const currentStep = $(this).closest('.form-step');
        const nextStep = currentStep.next('.form-step');

        if (validateCurrentStep(currentStep)) {
            currentStep.removeClass('active');
            nextStep.addClass('active');
        }
    });

    $('.prev-btn').on('click', function (e) {
        e.preventDefault();
        const currentStep = $(this).closest('.form-step');
        const prevStep = currentStep.prev('.form-step');

        currentStep.removeClass('active');
        prevStep.addClass('active');
    });

    // Form validation
    function validateCurrentStep(step) {
        let isValid = true;

        step.find('input[required], select[required]').each(function () {
            if (!$(this).val()) {
                isValid = false;
                $(this).addClass('error');
                showError($(this));
            } else {
                $(this).removeClass('error');
                hideError($(this));
            }
        });

        return isValid;
    }

    // Error handling
    function showError(element) {
        if (!element.next('.error-message').length) {
            element.after(`<span class="error-message">This field is required</span>`);
        }
    }

    function hideError(element) {
        element.next('.error-message').remove();
    }

    // Remove error on input
    $('input, select').on('input', function () {
        $(this).removeClass('error');
        hideError($(this));
    });

    // Form submission
    $('#requestForm').on('submit', function (e) {
        e.preventDefault();

        const currentStep = $('.form-step.active');
        if (validateCurrentStep(currentStep)) {
            // Collect form data
            const formData = {
                firstName: $('#firstName').val(),
                lastName: $('#lastName').val(),
                email: $('#email').val(),
                date: $('#date').val(),
                timeSlot: $('#timeSlot').val(),
                notes: $('#notes').val()
            };

            // Show loading state
            $('.submit-btn').prop('disabled', true).text('Submitting...');

            // Simulate API call
            setTimeout(function () {
                // Success message
                $('.form-container').html(`
                    <div class="success-message">
                        <h3>Thank You!</h3>
                        <p>Your appointment request has been submitted successfully. We'll contact you shortly to confirm your appointment.</p>
                        <button onclick="window.location.href='index.html'" class="next-btn">Return to Home</button>
                    </div>
                `);
            }, 1500);
        }
    });

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    $('#date').attr('min', today);
}); 