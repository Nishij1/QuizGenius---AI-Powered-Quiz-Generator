const API_KEY = 'Your API KEY';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

let quizQuestions = [];

async function generateQuiz(topic, numQuestions) {
    try {
        const response = await fetch('/api/generate-quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ topic, numQuestions })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in generateQuiz:', error);
        throw error;
    }
}

function displayQuiz(questions) {
    const quizContainer = document.getElementById('quizQuestions');
    quizContainer.innerHTML = '';

    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <h4>Question ${index + 1}: ${q.question}</h4>
            <div class="options">
                ${q.options.map((option, i) => `
                    <label>
                        <input type="radio" name="q${index}" value="${i}">
                        ${option}
                    </label>
                `).join('')}
            </div>
        `;
        quizContainer.appendChild(questionDiv);
    });

    // Show the modal
    document.getElementById('quizModal').style.display = 'block';
}

async function fetchQuizQuestions(event) {
    event.preventDefault(); // Prevent form submission
    const topic = document.getElementById('topic').value;
    const numQuestions = document.getElementById('numQuestions').value;

    if (!topic || !numQuestions) {
        alert('Please enter both topic and number of questions.');
        return;
    }

    try {
        quizQuestions = await generateQuiz(topic, numQuestions);
        displayQuiz(quizQuestions);
        document.getElementById('quizForm').style.display = 'none';
    } catch (error) {
        console.error('Error generating quiz:', error);
        if (error.message.includes('401')) {
            alert('Authorization failed. Please check your API key or try again later.');
        } else if (error.message.includes('429')) {
            alert('Too many requests. Please try again later.');
        } else {
            alert('Error generating quiz. Please try again later.');
        }
    }
}

function showResults() {
    const resultsContainer = document.getElementById('quizResultList');
    resultsContainer.innerHTML = '';

    let score = 0;
    quizQuestions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
        const resultDiv = document.createElement('div');
        
        if (selectedAnswer) {
            const userAnswer = parseInt(selectedAnswer.value);
            if (userAnswer === q.correctAnswer) {
                score++;
                resultDiv.innerHTML = `<p class="correct">Question ${index + 1}: Correct!</p>`;
            } else {
                resultDiv.innerHTML = `<p class="incorrect">Question ${index + 1}: Incorrect. The correct answer was: ${q.options[q.correctAnswer]}</p>`;
            }
        } else {
            resultDiv.innerHTML = `<p class="incorrect">Question ${index + 1}: Not answered. The correct answer was: ${q.options[q.correctAnswer]}</p>`;
        }
        
        resultsContainer.appendChild(resultDiv);
    });

    resultsContainer.innerHTML += `<h4>Your score: ${score} out of ${quizQuestions.length}</h4>`;
}

function submitQuiz() {
    document.getElementById('quizModal').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    showResults();
}

function closeModal() {
    document.getElementById('quizModal').style.display = 'none';
    document.getElementById('quizForm').style.display = 'block';
}

// Event listeners
document.getElementById('quizForm').addEventListener('submit', fetchQuizQuestions);
document.getElementById('quizContainer').addEventListener('submit', submitQuiz);

// Add this line to make sure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('quizForm').addEventListener('submit', fetchQuizQuestions);
});