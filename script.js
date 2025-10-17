// ---------- Flashcards: click to flip ----------
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
  });
});

// ---------- Mobile menu toggle ----------
const menuBtn = document.getElementById('menuBtn');
menuBtn && menuBtn.addEventListener('click', () => {
  const nav = document.querySelector('.nav');
  if (nav) nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

// ---------- Simple quiz: Guess the Output ----------
const quizData = [
  {
    q: "What will `console.log(2 + '3')` print?",
    choices: ["5", "23", "undefined", "Error"],
    answer: "23"
  },
  {
    q: "What does `===` do in JavaScript?",
    choices: ["Assignment", "Strict equality", "Loose equality", "Function call"],
    answer: "Strict equality"
  },
  {
    q: "Which method converts JSON string to JS object?",
    choices: ["JSON.parse()", "JSON.stringify()", "Object.convert()", "JSON.toObj()"],
    answer: "JSON.parse()"
  }
];

let quizIndex = 0;
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const feedbackEl = document.getElementById('quizFeedback');
const nextBtn = document.getElementById('nextBtn');

function renderQuizItem(i){
  const item = quizData[i];
  questionEl.textContent = item.q;
  choicesEl.innerHTML = '';
  feedbackEl.textContent = '';
  item.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.addEventListener('click', () => {
      if (choice === item.answer) {
        feedbackEl.textContent = '✅ Correct! Nice.';
      } else {
        feedbackEl.textContent = `❌ Nope. Correct: ${item.answer}`;
      }
    });
    choicesEl.appendChild(btn);
  });
}
renderQuizItem(quizIndex);

nextBtn && nextBtn.addEventListener('click', () => {
  quizIndex = (quizIndex + 1) % quizData.length;
  renderQuizItem(quizIndex);
});
