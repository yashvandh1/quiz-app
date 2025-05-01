import React, { useState } from "react";
import "./Quiz.css";

const quizData = [
    {
      question: "What is the capital of India?",
      options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
      correctAnswer: "Delhi",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correctAnswer: "Mars",
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4",
    },
    {
      question: "Who wrote the national anthem of India?",
      options: ["Rabindranath Tagore", "Mahatma Gandhi", "Jawaharlal Nehru", "Subhash Chandra Bose"],
      correctAnswer: "Rabindranath Tagore",
    },
    {
      question: "Which is the largest ocean in the world?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correctAnswer: "Pacific Ocean",
    },
    {
      question: "How many continents are there on Earth?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "7",
    },
];
  

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    // Validate answer
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback("❌ Incorrect!");
    }

    // Move to next question after 1 sec
    setTimeout(() => {
      setFeedback("");
      setSelectedOption("");

      if (currentQuestion + 1 < quizData.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption("");
    setFeedback("");
  };

  return (
    <div className="quiz-container">
      <h1>📝 Simple Quiz App</h1>

      {showScore ? (
        <div className="score-section">
          <h2>Your Score: {score} / {quizData.length}</h2>
          <button onClick={handleRestart}>Restart Quiz 🔄</button>
        </div>
      ) : (
        <div>
          <h2>
            Question {currentQuestion + 1} / {quizData.length}
          </h2>
          <p>{quizData[currentQuestion].question}</p>

          <div className="options">
            {quizData[currentQuestion].options.map((option, index) => (
              <label key={index} className="option">
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                />
                {option}
              </label>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className="next-btn"
          >
            Next ➡️
          </button>

          {feedback && <p className="feedback">{feedback}</p>}
        </div>
      )}
    </div>
  );
}

export default Quiz;
