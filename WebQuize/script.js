const quizData = [
    // Q1
    {
      question: 'Who had composed the original Ramayana ?',
      options: ['Rishi Valmiki', 
                'Tulsi Das', 
                'Sant Ek Nath', 
                'Anhinanda'],
      answer: 'Rishi Valmiki',
    },
    // Q2
    {
      question: 'Lakshmana is considered to be the incarnation of whom ?',
      options: ['Lord Vishnu', 
                'Lord Shiva', 
                'Lord Brahma', 
                'Sheshnag'],
      answer: 'Sheshnag',
    },
    // Q3
    {
      question: 'What was the name of the forest where Lord Rama, Lakshmana and Goddess Sita stayed during exile ?',
      options: ['Aranya', 
                'Aranyak', 
                'Dandakaranya', 
                'Karanya'],
      answer: 'Dandakaranya',
    },
    // Q4
    {
      question: 'Ravana was a devotee of who among the following God?',
      options: ['Vishnu', 
                'Brahma', 
                'Shiva', 
                'None of the above'],
      answer: 'Shiva',
    },
    // Q5
    {
      question: 'Who was the father of Lord Rama ?',
      options: ['Shalishuka',
                'Nahapana',
                'Rajadhiraj',
                'Dasaratha',],
      answer: 'Dasaratha',
    },
    // Q6
    {
      question: 'Which of the following are the parts of Ramcharitmanas?',
      options: ['Bal Kanda', 
                'Aranya Kanda', 
                'Kiskindha Kanda', 
                'All the above are correct'],
      answer: 'All the above are correct',
    },
    // Q7
    {
      question: 'Who is the main antagonist in the Ramayana?',
      options: ['Ravana',
                'Kumbhakarna',
                'Indrajit',
                'Maricha',],
      answer: 'Ravana',
    },
    // Q8
    {
      question: 'Which of the following is/are the versions of the Ramayana that have emerged outside India?',
      options: ['Cambodia - Reamker', 
                'Thailand - Ramakien', 
                'Burma (Mayanmar) - Yama Zatdaw', 
                'All the above are correct'],
      answer: 'All the above are correct',
    },
    // Q9
    {
      question: 'Which city did Lord Rama rule as the king?',
      options: ['Ayodhya',
                'Lanka',
                'Mithila',
                'Kishkindha',],
      answer: 'Ayodhya',
    },
    // Q10
    {
      question: 'WWho is the wife of Lord Rama? ',
      options: ['Sita', 
                'Radha', 
                'Draupadi', 
                'Parvati'],
      answer: 'Sita',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();