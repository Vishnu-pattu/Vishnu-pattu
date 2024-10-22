const questions = [
    "What is your favorite color? 🌈",
    "What is your favorite food? 🍕",
    "Where do you live? 🏡",
    "What is your hobby? 🎨",
    "What is your favorite movie? 🎬",
    "What is your dream job? 💼",
    "What is your favorite book? 📚",
    "What is your favorite travel destination? ✈️",
    "What is your favorite music genre? 🎵",
    "What is your favorite season? ☀️"
];

function login() {
    const username = document.getElementById('username').value;
    if (username) {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('surveyContainer').style.display = 'block';
    }
}

function displayQuestions() {
    const questionContainer = document.getElementById('questions');
    questionContainer.innerHTML = '';
    const randomQuestions = getRandomQuestions();

    randomQuestions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.innerHTML = `
            <label for="q${index}">${question}</label>
            <input type="text" id="q${index}" placeholder="Your answer" required>
        `;
        questionContainer.appendChild(questionElement);
    });

    document.getElementById('submitButton').style.display = 'block';
    document.getElementById('questionContainer').style.display = 'block';
}

function getRandomQuestions() {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
}

function submitAnswers() {
    const answers = [];
    for (let i = 0; i < 5; i++) {
        const answer = document.getElementById(`q${i}`).value;
        answers.push(answer);
    }
    console.log("User Answers:", answers);
    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('thankYouContainer').style.display = 'block';
}

window.onload = function() {
    document.getElementById('loginContainer').style.display = 'block';
};
