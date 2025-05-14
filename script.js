function showSection(id) {
  const sections = document.querySelectorAll("main section");
  sections.forEach(section => section.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  if (id === "progress") updateProgressStats();
}

// Quiz Generator
function generateQuiz() {
  const topic = document.getElementById("quiz-topic").value.trim();
  const num = parseInt(document.getElementById("quiz-num").value);
  const output = document.getElementById("quiz-output");

  if (!topic || isNaN(num) || num <= 0) {
    output.innerHTML = "<p>Please enter a topic and valid number of questions.</p>";
    return;
  }

  let quiz = `<h3>Quiz on ${topic} (${num} questions)</h3><ol>`;
  for (let i = 1; i <= num; i++) {
    quiz += `<li>Question ${i} on ${topic}?</li>`;
  }
  quiz += "</ol>";
  output.innerHTML = quiz;
  quizzesAttempted += 1;
}

// Notes Generator
function generateNotes() {
  const input = document.getElementById("notes-input").value.trim();
  const output = document.getElementById("notes-output");

  if (!input) {
    output.innerHTML = "<p>Please enter some lesson text to generate notes.</p>";
    return;
  }

  const sentences = input.split('.').slice(0, 3).map(s => s.trim()).filter(Boolean);
  const summary = sentences.map(s => `<li>${s}.</li>`).join("");
  output.innerHTML = `<ul>${summary}</ul>`;
  lessonsCompleted += 1;
}

// Reminder Generator
function addReminder() {
  const lessonName = document.getElementById("lesson-name").value.trim();
  const list = document.getElementById("reminder-list");

  if (!lessonName) {
    alert("Please enter a lesson name.");
    return;
  }

  const days = [1, 3, 7, 14, 30];
  const reminders = days.map(day => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + day);
    return `<li>Review "${lessonName}" in ${day} day(s) → ${futureDate.toDateString()}</li>`;
  });

  list.innerHTML = reminders.join("");
}

// Simulated Data
let lessonsCompleted = 3;
let quizzesAttempted = 5;
let hoursStudied = 12;

function updateProgressStats() {
  document.getElementById("lesson-progress").textContent = `Lessons completed: ${lessonsCompleted}`;
  document.getElementById("quiz-attempts").textContent = `Total quizzes attempted: ${quizzesAttempted}`;
  document.getElementById("study-hours").textContent = `Hours studied this week: ${hoursStudied}`;
}

// Survey Handler
function submitSurvey() {
  const form = document.getElementById("survey-form");
  const data = new FormData(form);
  const output = [];

  output.push("✔️ Preferences saved!");
  output.push("Learning Methods: " + data.getAll("learningMethod").join(", "));
  output.push("Session Length: " + data.get("sessionLength"));
  output.push("Best Time: " + data.get("studyTime"));
  output.push("Goal: " + data.get("goal"));
  output.push("Feedback: " + data.getAll("feedbackType").join(", "));

  document.getElementById("survey-output").innerHTML = output.map(o => `<p>${o}</p>`).join("");
}

// Dark Mode
document.getElementById("toggle-dark-mode").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
function handleAISearch() {
  const input = document.getElementById("ai-search").value.trim();
  const responseEl = document.getElementById("ai-search-response");

  if (!input) {
    responseEl.innerHTML = "<em>Please type a question.</em>";
    return;
  }

  // Simulated AI response logic
  let response = "🤖 Brillexa says: ";
  if (input.toLowerCase().includes("best way to study")) {
    response += "Try using active recall with flashcards and spaced repetition!";
  } else if (input.toLowerCase().includes("html")) {
    response += "HTML stands for HyperText Markup Language. It's the foundation of web pages.";
  } else if (input.toLowerCase().includes("how long should I study")) {
    response += "Study in 25–30 minute sessions with 5-minute breaks. That's the Pomodoro method!";
  } else {
    response += "Great question! Brillexa is still learning how to answer that.";
  }

  responseEl.innerHTML = response;
}
