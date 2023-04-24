// Navigation Menu
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');

navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
  });
});

// Contact Form
const form = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const submitButton = document.querySelector('#submit-button');
const statusText = document.querySelector('#status-text');

form.addEventListener('submit', e => {
  e.preventDefault();

  // Simple validation
  if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === '') {
    statusText.innerHTML = 'Please fill in all fields.';
    return;
  }

  // Send the form data
  submitButton.disabled = true;
  submitButton.innerHTML = 'Sending...';

  fetch('/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim()
    })
  })
  .then(res => {
    if (res.ok) {
      statusText.innerHTML = 'Message sent successfully!';
      form.reset();
    } else {
      statusText.innerHTML = 'An error occurred while sending the message.';
    }
  })
  .catch(err => {
    console.error(err);
    statusText.innerHTML = 'An error occurred while sending the message.';
  })
  .finally(() => {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send';
  });
});
