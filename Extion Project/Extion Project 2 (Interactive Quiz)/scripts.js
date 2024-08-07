const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: 1
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timer;

const timerDisplay = document.getElementById("time");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const nextButton = document.getElementById("next-btn");
const finalScoreSection = document.getElementById("final-score");
const totalScoreDisplay = document.getElementById("total-score");
const retryButton = document.getElementById("retry-btn");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    finalScoreSection.classList.add("hidden");
    nextButton.classList.remove("hidden");
    answersContainer.classList.remove("hidden");
    startTimer();
    showQuestion();
}

function startTimer() {
    timerDisplay.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    answersContainer.innerHTML = "";
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.addEventListener("click", () => selectAnswer(index));
        answersContainer.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    const correctIndex = quizQuestions[currentQuestionIndex].correct;
    if (selectedIndex === correctIndex) {
        score++;
        document.querySelectorAll("#answers-container button")[selectedIndex].classList.add("correct");
    } else {
        document.querySelectorAll("#answers-container button")[selectedIndex].classList.add("wrong");
        document.querySelectorAll("#answers-container button")[correctIndex].classList.add("correct");
    }
    nextButton.disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
        nextButton.disabled = true;
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    answersContainer.classList.add("hidden");
    nextButton.classList.add("hidden");
    finalScoreSection.classList.remove("hidden");
    totalScoreDisplay.textContent = score;
}

nextButton.addEventListener("click", nextQuestion);
retryButton.addEventListener("click", startQuiz);

startQuiz();
