function toggleForm() {
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');
  const formTitle = document.getElementById('form-title');
  const toggleText = document.getElementById('toggle-text');
  const toggleButton = document.querySelector('button[onclick="toggleForm()"]');

  if (registerForm.classList.contains('hidden')) {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    formTitle.innerText = 'Register';
    toggleText.innerText = 'Already have an account?';
    toggleButton.innerText = 'Login';
  } else {
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    formTitle.innerText = 'Login';
    toggleText.innerText = "Don't have an account?";
    toggleButton.innerText = 'Register';
  }
}
// Automatically dismiss message after 3 seconds
setTimeout(() => dismissMessage(), 3000);

// Dismiss message function
function dismissMessage() {
  const message = document.getElementById('message');
  if (message) {
    message.style.display = 'none';
  }
}
