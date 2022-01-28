const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Using energy efficent devices will lower your Carbon Footprint',
    answers: [
      { text: 'True', correct: true },
      { text: 'False', correct: false }
    ]
  },
  {
    question: 'What is a way that you can reduce your Carbon Footprint?',
    answers: [
      { text: 'Eating less food', correct: false },
      { text: 'Cleaning clothes less often', correct: false },
      { text: 'Unplugging household electronics when they are not in use', correct: true },
      { text: 'Drinking more water', correct: false }
    ]
  },
  {
    question: 'What percent does vehicle emissions represent in our global Carbon Emission?',
    answers: [
      { text: '29%', correct: true },
      { text: '75%', correct: false },
      { text: '39%', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'What is one way you can reduce your Carbon Footprint?',
    answers: [
      { text: 'By making sure to be aware of your energy usage and conserving recourses when possible.', correct: true },
      { text: 'By making sure you do not just takle it yourself by getting together as a community and working together on setting up a service project.', correct: true }
    ]
  },
  {
    question: 'Why is reducing your Carbon Footprint important?',
    answers: [
      { text: 'To help the enviornment', correct: true },
      { text: 'To save money', correct: false },
      { text: 'It is not important', correct: false },
      { text: 'IDK', correct: false }
    ]
  }
]
