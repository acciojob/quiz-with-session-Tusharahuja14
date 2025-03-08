// Selecting necessary elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

// Quiz questions
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Venus"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Retrieve stored answers from sessionStorage
function getSavedAnswers() {
  const savedAnswers = sessionStorage.getItem("progress");
  return savedAnswers ? JSON.parse(savedAnswers) : {};
}

// Save the selected answer in sessionStorage
function saveAnswer(questionIndex, answer) {
  const savedAnswers = getSavedAnswers();
  savedAnswers[questionIndex] = answer;
  sessionStorage.setItem("progress", JSON.stringify(savedAnswers));
}

// Render quiz questions
function renderQuestions() {
  const savedAnswers = getSavedAnswers();

  questionsElement.innerHTML = ""; // Clear previous content

  questions.forEach((question, index) => {
    const questionContainer = document.createElement("div");
    questionContainer.innerHTML = `<p>${question.question}</p>`;

    question.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${index}`);
      choiceElement.setAttribute("value", choice);

      // Restore previous selection
      if (savedAnswers[index] === choice) {
        choiceElement.checked = true;
      }

      // Save selection when user clicks
      choiceElement.addEventListener("change", () => {
        saveAnswer(index, choice);
      });

      // Append choice with label
      const label = document.createElement("label");
      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));

      questionContainer.appendChild(label);
      questionContainer.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionContainer);
  });
}

// Calculate and display score
function calculateScore() {
  const savedAnswers = getSavedAnswers();
  let score = 0;

  questions.forEach((question, index) => {
    if (savedAnswers[index] === question.answer) {
      score++;
    }
  });

  // Display and store score
  scoreDisplay.innerText = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
}

// Show last score if available
function displayLastScore() {
  const lastScore = localStorage.getItem("score");
  if (lastScore !== null) {
    scoreDisplay.innerText = `Your last score was ${lastScore} out of 5.`;
  }
}

// Event Listener for Submit Button
submitButton.addEventListener("click", calculateScore);

// Initialize quiz
renderQuestions();
displayLastScore();
