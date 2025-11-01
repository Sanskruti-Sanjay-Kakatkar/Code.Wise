// Simple gamified signup flow for Code.Wise
// Stores data in localStorage and redirects to the selected language lesson

const steps = Array.from(document.querySelectorAll('.step'));
const progressBar = document.getElementById('progressBar');

let current = 0;
const state = {
  name: '',
  email: '',
  level: '',
  lang: ''
};

function showStep(i) {
  steps.forEach(s => s.hidden = true);
  const step = steps[i];
  if (!step) return;
  step.hidden = false;
  current = i;
  const percent = Math.round((i / (steps.length - 1)) * 100);
  progressBar.style.width = percent + '%';
}

// Start
document.getElementById('startBtn').addEventListener('click', () => showStep(1));

// Step 1: name
document.getElementById('next1').addEventListener('click', () => {
  const name = document.getElementById('nameInput').value.trim();
  if (!name) {
    alert('Type your name so we can call you something cool 😏');
    return;
  }
  state.name = name;
  showStep(2);
});
document.getElementById('back1').addEventListener('click', () => showStep(0));

// Step 2: email
document.getElementById('next2').addEventListener('click', () => {
  const email = document.getElementById('emailInput').value.trim();
  if (!email || !email.includes('@')) {
    alert('Enter a valid email (so progress can be saved).');
    return;
  }
  state.email = email;
  showStep(3);
});
document.getElementById('back2').addEventListener('click', () => showStep(1));

// Step 3: level
document.getElementById('levelChoices').addEventListener('click', (e) => {
  if (!e.target.classList.contains('choice')) return;
  Array.from(e.currentTarget.children).forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  state.level = e.target.textContent.trim();
});
document.getElementById('next3').addEventListener('click', () => {
  if (!state.level) { alert('Pick your level to move on.'); return; }
  showStep(4);
});
document.getElementById('back3').addEventListener('click', () => showStep(2));

// Step 4: language
document.getElementById('langChoices').addEventListener('click', (e) => {
  if (!e.target.classList.contains('choice')) return;
  Array.from(e.currentTarget.children).forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  state.lang = e.target.textContent.trim();
});
document.getElementById('finishBtn').addEventListener('click', () => {
  if (!state.lang) { alert('Pick a language, it helps us personalize your experience.'); return; }
  saveAndShowSummary();
});
document.getElementById('back4').addEventListener('click', () => showStep(3));

// Summary
function saveAndShowSummary() {
  localStorage.setItem('codewise_user', JSON.stringify(state));
  const summary = document.getElementById('summaryText');
  summary.innerHTML = `Welcome <strong>${escapeHtml(state.name)}</strong> — we saved your email <strong>${escapeHtml(state.email)}</strong>. Level: <strong>${escapeHtml(state.level)}</strong>. First language: <strong>${escapeHtml(state.lang)}</strong>.`;
  showStep(5);
}

// Redirect after “Start Learning!”
document.getElementById('goToSiteBtn').addEventListener('click', () => {
  const selectedLanguage = state.lang.toLowerCase();
  if (selectedLanguage === "html") {
    window.location.href = "html-lessons.html";
  } else if (selectedLanguage === "css") {
    window.location.href = "css-lessons.html";
  } else if (selectedLanguage === "javascript") {
    window.location.href = "js-lessons.html";
  } else if (selectedLanguage === "python") {
    window.location.href = "python-lessons.html";
  } else {
    window.location.href = "index.html";
  }
});

// Small helper to sanitize input
function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  }[c]));
}

// Initialize
showStep(0);
