const questions = [
  {
    question: "ما اسم مدرب جيرونا ",
    options: ["روبي", "مونيز", "بيليغريني", "بالادينو"],
    answer: "مونيز",
  },
  {
    question:
      "افضل فريق بالعالم عمك وعم الجميع",
    options: ["ريال مدرييد", "برشلونه", "مان سيتي", "بايرن ميونخ"],
    answer: "برشلونه",
  },
  {
    question: "اخر لاعب سجل ضد مدريد بكاس الملك",
    options: ["لينو", "موراتا", "جريزمان", "ريكيلمي"],
    answer: "ريكلمي",
  },
  {
    question: "بسنه 2001 من كان الوصيف كاس العالم",
    options: ["البرازيل", "الأرجنتين", "ايطاليا", "المانيا"],
    answer: "المانيا",
  },
  {
    question: "بكاس العالم قطر من سجل اخر ركله جزاء للارجنتين بالنهائي",
    options: [
      "ديبالا",
      "باريديس",
      "مونتييل",
      "انزو",
    ],
    answer: "مونتييل",
  },
  {
    question: "من  اخر من سجل لنادي برشلونه بدوري ابطال اوروبا",
    options: ["رافينيا", "لوبيز", "لامال", "ليفاندوسكي"],
    answer: "ليفاندوسكي",
  },
  {
    question: "من الاعب الذي سجل هدف البرايزيل على المانيا بكاس العالم سنه 2014",
    options: ["غوستافو", "اوسكار", "غابراييل", "نيمار"],
    answer: "اوسكار",
  },
  {
    question: "مين اخذ دوري الانجليزي سنه 2003",
    options: ["ارسنال", "ليفربول", "مان سيتي", "مان يونايتد"],
    answer: "مان يونايتد",
  },
  {
    question:
      "من اي نادي تم شراء الاعب هالير",
    options: ["ليدز","شاختار", "اياكس", "رين"],
    answer: "اياكس",
  },
  {
    question: "ما هو الفيق الذي فازن بابطال اوروبا سنه 1978",
    options: ["اي سي ميلان", "ليفربول", "برشلونه", "ريال مدريد"],
    answer: "ليفربول",
  },
  {
    question: "ما هو النادي الملقب بالضفادع",
    options: ["الجزيره", "الرمثا", "الوحدات", "الفيصلي"],
    answer: "الوحدات",
  },
];

let currentQuestion = 0;
let score = 0;
const totalQuestions = questions.length;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultsElement = document.getElementById("results");
const counterElement = document.getElementById("counter");
const messageElement = document.getElementById("message");
let timer;

function displayQuestion() {
  if (currentQuestion >= questions.length) {
    showResults();
    return;
  }

  const question = questions[currentQuestion];

  // Display the question
  questionElement.textContent = question.question;

  // Clear previous options and display new ones
  optionsElement.innerHTML = "";
  question.options.forEach((option) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("option");
    optionElement.textContent = option;
    optionElement.addEventListener("click", () => {
      checkAnswer(option);
    });
    optionsElement.appendChild(optionElement);
  });

  // Update the results display
  updateResults();

  // Start the timer
  startTimer();
}

function startTimer() {
  let timeLeft = 15; // 15 seconds
  counterElement.textContent = `Time : ${timeLeft}`;

  timer = setInterval(() => {
    timeLeft--;
    counterElement.textContent = `Time : ${timeLeft}`;

    if (timeLeft === 0) {
      clearInterval(timer);
      checkAnswer(null); // Move to the next question when time runs out
    }
  }, 1000);
}

function checkAnswer(selectedOption) {
  clearInterval(timer); // Stop the timer when an answer is selected

  const correctAnswer = questions[currentQuestion].answer;

  // Get all option elements
  const optionElements = optionsElement.querySelectorAll(".option");

  // Immediately apply styling based on correctness
  optionElements.forEach((optionElement) => {
    if (optionElement.textContent === selectedOption) {
      if (selectedOption === correctAnswer) {
        optionElement.classList.add("correct");
        score++;
      } else {
        optionElement.classList.add("incorrect");
      }
    } else if (optionElement.textContent === correctAnswer) {
      optionElement.classList.add("correct");
    }
  });

  // Wait for a short delay before moving to the next question
  setTimeout(() => {
    currentQuestion++;
    displayQuestion();
  }, 1000); // Delay for 1 second
}

function showResults() {
  // Display the custom message
  messageElement.textContent = `Your score is ${score} of ${totalQuestions}`;
  messageElement.style.display = "block";
}

function updateResults() {
  resultsElement.textContent = `Score: ${score} // ${totalQuestions}`;
}

// Start the quiz
displayQuestion();