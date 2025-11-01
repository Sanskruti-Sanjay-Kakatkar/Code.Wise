// login.js — simple localStorage-based login

document.getElementById('loginBtn').addEventListener('click', () => {
  const email = document.getElementById('emailInput').value.trim();
  if (!email) {
    alert("Please enter your email.");
    return;
  }

  // retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem('codewise_user'));

  if (!user) {
    alert("No user found! Please sign up first.");
    window.location.href = "signup.html";
    return;
  }

  if (user.email.toLowerCase() === email.toLowerCase()) {
    alert(`Welcome back, ${user.name}! 🎉`);
    // redirect based on their chosen language
    switch (user.lang.toLowerCase()) {
      case 'html':
        window.location.href = "html-lessons.html";
        break;
      case 'css':
        window.location.href = "css-lessons.html";
        break;
      case 'javascript':
        window.location.href = "js-lessons.html";
        break;
      case 'python':
        window.location.href = "python-lessons.html";
        break;
      default:
        window.location.href = "index.html";
    }
  } else {
    alert("Email doesn’t match our records. Try again or sign up.");
  }
});
