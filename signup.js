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
document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  const progressBar = document.getElementById("progressBar");
  let currentStep = 0;
  let selectedLanguage = "";
  let selectedLevel = "";

  function showStep(stepIndex) {
    steps.forEach((step, i) => {
      step.hidden = i !== stepIndex;
    });
    progressBar.style.width = ((stepIndex) / (steps.length - 1)) * 100 + "%";
  }

  function nextStep() {
    if (currentStep < steps.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  }

  // Buttons
  document.getElementById("startBtn").onclick = nextStep;
  document.getElementById("next1").onclick = nextStep;
  document.getElementById("back1").onclick = prevStep;
  document.getElementById("next2").onclick = nextStep;
  document.getElementById("back2").onclick = prevStep;
  document.getElementById("next3").onclick = nextStep;
  document.getElementById("back3").onclick = prevStep;
  document.getElementById("back4").onclick = prevStep;

  // Choice selections
  document.querySelectorAll("#levelChoices .choice").forEach(choice => {
    choice.onclick = () => {
      document.querySelectorAll("#levelChoices .choice").forEach(c => c.classList.remove("active"));
      choice.classList.add("active");
      selectedLevel = choice.textContent.toLowerCase();
    };
  });

  document.querySelectorAll("#langChoices .choice").forEach(choice => {
    choice.onclick = () => {
      document.querySelectorAll("#langChoices .choice").forEach(c => c.classList.remove("active"));
      choice.classList.add("active");
      selectedLanguage = choice.textContent.toLowerCase();
    };
  });

  document.getElementById("finishBtn").onclick = () => {
    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;

    if (!name || !email || !selectedLanguage) {
      alert("Please fill all fields!");
      return;
    }

    document.getElementById("summaryText").innerHTML = `
      Welcome, <b>${name}</b>!<br>
      Level: ${selectedLevel}<br>
      Language: ${selectedLanguage.toUpperCase()}<br>
      Email: ${email}
    `;
    nextStep();
  };

  document.getElementById("goToSiteBtn").onclick = () => {
    if (selectedLanguage === "html") {
      window.location.href = "html-lessons.html";
    } else if (selectedLanguage === "css") {
      window.location.href = "css-lessons.html";
    } else if (selectedLanguage === "javascript") {
      window.location.href = "js-lessons.html";
    } else if (selectedLanguage === "python") {
      window.location.href = "python-lessons.html";
    }
  };

  showStep(currentStep);
});

