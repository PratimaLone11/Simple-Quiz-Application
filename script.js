document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What is the primary purpose of the .NET Framework?",
      choices: [
        "To provide tools for building mobile apps",
        "To build web apps only",
        "To develop Windows apps in multiple languages",
        "To design animations"
      ],
      answer: "To develop Windows apps in multiple languages",
    },
    {
      question: "Which of these is a component of the .NET Framework?",
      choices: [
        "Common Language Runtime (CLR)",
        "Java Runtime Environment",
        "Python Interpreter",
        "Linux Kernel"
      ],
      answer: "Common Language Runtime (CLR)",
    },
    {
      question: "What is MSIL in the context of .NET?",
      choices: [
        "Machine-Specific Intermediate Language",
        "Managed Source Intermediate Language",
        "Microsoft Intermediate Language",
        "Microsoft Secure Intermediate Language"
      ],
      answer: "Microsoft Intermediate Language",
    },
    {
      question: "Which of the following describes the .NET Framework Class Library?",
      choices: [
        "A runtime environment",
        "A collection of reusable classes",
        "A file manager",
        "A code editor"
      ],
      answer: "A collection of reusable classes",
    },
    {
      question: "What is the purpose of the Common Type System (CTS) in .NET?",
      choices: [
        "Defines types for cross-language compatibility",
        "Handles memory allocation",
        "Sets up permissions",
        "Compiles code"
      ],
      answer: "Defines types for cross-language compatibility",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let hasAnsweredCurrentQuestion = false;
  let selectedAnswers = []; // ✅ NEW

  startBtn.addEventListener("click", startQuiz);

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswers = [];
    resultContainer.classList.add("hidden");
    startQuiz();
  });

  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }

  function showQuestion() {
    hasAnsweredCurrentQuestion = false;
    nextBtn.classList.add("hidden");

    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = "";

    questions[currentQuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;

      // ✅ restore selected option
      if (selectedAnswers[currentQuestionIndex] === choice) {
        li.classList.add("selected");
        hasAnsweredCurrentQuestion = true;
        nextBtn.classList.remove("hidden");
      }

      li.addEventListener("click", () => selectAnswer(choice, li));
      choicesList.appendChild(li);
    });
  }

  function selectAnswer(choice, selectedLi) {
    if (hasAnsweredCurrentQuestion) return;

    hasAnsweredCurrentQuestion = true;
    selectedAnswers[currentQuestionIndex] = choice;

    // remove previous selection
    document.querySelectorAll("#choices-list li").forEach(li =>
      li.classList.remove("selected")
    );

    selectedLi.classList.add("selected");

    if (choice === questions[currentQuestionIndex].answer) {
      score++;
    }

    nextBtn.classList.remove("hidden");
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
  }
});
