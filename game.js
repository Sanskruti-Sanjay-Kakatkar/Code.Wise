// game.js - Code.Wise quiz game
// Expects localStorage key 'codewise_user' (object with .level)
// If none found, defaults to Beginner

// Simple question sets for each level
const QUESTIONS = {
  Beginner: [
    {
      q: "What does HTML stand for?",
      choices: ["HyperText Markup Language", "HotText Markdown Link", "Hyperlinks Text Markup", "Hyper Tool Markup"],
      a: "HyperText Markup Language"
    },
    {
      q: "Which tag makes a paragraph?",
      choices: ["<p>", "<div>", "<span>", "<h1>"],
      a: "<p>"
    },
    {
      q: "Which property changes text color in CSS?",
      choices: ["font-size", "color", "background", "border"],
      a: "color"
    },
    {
      q: "JS stands for?",
      choices: ["JavaScript", "JustScript", "JollyScript", "JavaStyle"],
      a: "JavaScript"
    },
    {
      q: "Which tag adds an image?",
      choices: ["<img>", "<picture>", "<image>", "<src>"],
      a: "<img>"
    }
  ],

  Intermediate: [
    {
      q: "Which method converts JSON string to JS object?",
      choices: ["JSON.parse()", "JSON.stringify()", "Object.create()", "JSON.toObj()"],
      a: "JSON.parse()"
    },
    {
      q: "Which CSS selector targets an ID called 'main'?",
      choices: [".main", "#main", "main", "*main"],
      a: "#main"
    },
    {
      q: "What does `let` do in JavaScript?",
      choices: ["Declare a block-scoped variable", "Declare a constant", "Create a function", "Create a class"],
      a: "Declare a block-scoped variable"
    },
    {
      q: "Which HTML element is used to include JavaScript?",
      choices: ["<script>", "<js>", "<code>", "<link>"],
      a: "<script>"
    },
    {
      q: "In CSS, which layout uses rows and columns explicitly?",
      choices: ["Flexbox", "Grid", "Inline", "Block"],
      a: "Grid"
    }
  ],

  "Pro Hacker 😎": [
    {
      q: "What does `===` check in JS?",
      choices: ["Strict equality (type & value)", "Assignment", "Prototype chain", "Type coercion"],
      a: "Strict equality (type & value)"
    },
    {
      q: "Which function would you use to debounce calls?",
      choices: ["setTimeout wrapper", "setInterval", "requestAnimationFrame", "clearTimeout"],
      a: "setTimeout wrapper"
    },
    {
      q: "What is a closure in JS?",
      choices: [
        "A function plus its lexical environment",
        "A special array",
        "An HTML wrapper",
        "CSS scoping method"
      ],
      a: "A function plus its lexical environment"
    },
    {
      q: "Which HTTP status code indicates success?",
      choices: ["200", "404", "500", "302"],
      a: "200"
    },
    {
      q: "Which avoids blocking the main thread?",
      choices: ["Web Workers", "Synchronous XHR", "alert()", "document.write()"],
      a: "Web Workers"
    }
  ]
};

// Helper functions
function $(sel){ return document.querySelector(sel); }
function $all(sel){ return Array.from(document.querySelectorAll(sel)); }
function shuffle(arr){ return arr.sort(() => Math.random() - 0.5); }

// UI elements
const levelTag = $('#levelTag');
const questionText = $('#questionText');
const choicesArea = $('#choicesArea');
const feedback = $('#feedback');
const progressLabel = $('#progressLabel');
const scoreLabel = $('#scoreLabel');
const nextQBtn = $('#nextQBtn');
const skipBtn = $('#skipBtn');
const resultScreen = $('#resultScreen');
const quizCard = $('#quizCard');
const questionArea = $('#questionArea');
const resultText = $('#resultText');
const retryBtn = $('#retryBtn');
const homeBtn = $('#homeBtn');

let user = { name: '', email: '', level: 'Beginner' };
try {
  const raw = localStorage.getItem('codewise_user');
  if (raw) user = JSON.parse(raw);
} catch(e){ /* ignore */ }

let levelName = (user.level && QUESTIONS[user.level]) ? user.level : 'Beginner';
let questions = QUESTIONS[levelName] ? [...QUESTIONS[levelName]] : [...QUESTIONS['Beginner']];
questions = shuffle(questions);

let currentIndex = 0;
let score = 0;
const total = questions.length;
let answered = false;

function renderProgress(){
  progressLabel.textContent = `Question ${Math.min(currentIndex+1, total)} / ${total}`;
  scoreLabel.textContent = `Score: ${score}`;
  levelTag.textContent = `${levelName}`;
}

function showQuestion(i){
  answered = false;
  feedback.textContent = '';
  nextQBtn.disabled = true;
  const item = questions[i];
  if (!item) return;
  questionText.textContent = item.q;
  choicesArea.innerHTML = '';
  const shuffled = shuffle([...item.choices]);
  shuffled.forEach(ch => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn choice-game';
    btn.textContent = ch;
    btn.addEventListener('click', () => handleChoice(btn, item));
    choicesArea.appendChild(btn);
  });
  renderProgress();
}

function handleChoice(btn, item){
  if (answered) return;
  answered = true;
  const picked = btn.textContent.trim();
  if (picked === item.a){
    feedback.textContent = '✅ Correct!';
    score += 1;
    btn.classList.add('correct');
  } else {
    feedback.textContent = `❌ Nope. Correct: ${item.a}`;
    btn.classList.add('wrong');
    // highlight correct one
    $all('.choice-game').forEach(b => {
      if (b.textContent.trim() === item.a) b.classList.add('correct');
    });
  }
  nextQBtn.disabled = false;
  scoreLabel.textContent = `Score: ${score}`;
}

nextQBtn.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= total) {
    showResult();
  } else {
    showQuestion(currentIndex);
  }
});

skipBtn.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= total) {
    showResult();
  } else {
    showQuestion(currentIndex);
  }
});

function showResult(){
  questionArea.hidden = true;
  resultScreen.hidden = false;
  resultText.textContent = `You scored ${score} out of ${total}. ${score/total >= 0.7 ? 'Epic job — you leveled up!' : 'Nice effort — keep practising!'}`;
  // store last score
  try{
    const old = JSON.parse(localStorage.getItem('codewise_scores') || '{}');
    old[levelName] = score;
    localStorage.setItem('codewise_scores', JSON.stringify(old));
  }catch(e){}
}

retryBtn.addEventListener('click', () => {
  // reset
  questions = shuffle(QUESTIONS[levelName]);
  currentIndex = 0;
  score = 0;
  questionArea.hidden = false;
  resultScreen.hidden = true;
  showQuestion(0);
});

homeBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

// small visual helpers in CSS ideally; but add class toggles
// initialize
(function init(){
  // If user has a name, personalize the title
  if (user.name) {
    $('#titleSmall').textContent = `Ready, ${user.name.split(' ')[0]}?`;
  }
  showQuestion(0);
})();
