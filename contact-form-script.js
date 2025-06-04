document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Basic client-side validation
        const name = form.querySelector('input[name="name"]').value.trim();
        const email = form.querySelector('input[name="email"]').value.trim();
        const message = form.querySelector('textarea[name="message"]').value.trim();

        if (!name || !email || !message) {
            formMessage.style.color = 'red';
            formMessage.textContent = 'Please fill in all required fields.';
            return;
        }

        // Use Fetch API to submit the form
        fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Submission failed');
            }
        })
        .then(data => {
            formMessage.style.color = 'green';
            formMessage.textContent = data;
            form.reset(); // Clear the form
        })
        .catch(error => {
            formMessage.style.color = 'red';
            formMessage.textContent = 'Sorry, there was an error sending your message. Please try again later.';
        });
    });
});