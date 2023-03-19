import React, { useState } from "react";
import questions from "./questions";
import "./Questionnaire.css";
import { useNavigate } from "react-router-dom";

function AssessmentForm() {
  const [answers, setAnswers] = useState({});
  // const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const handleOptionChange = (questionId, optionId) => {
    const newAnswers = { ...answers };
    newAnswers[questionId] = optionId;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((question) => {
      if (answers[question.id] === "a") {
        newScore += question.points;
      }
    });
    navigate(`/Camera?newScore=${newScore}`);
  };

  return (
    <div className="assessment-form-container">
      <h1 className="assessment-form-title">
        แบบประเมินโรคต้อกระจกและต้อเนื้อ
      </h1>
      <div className="assessment-form-questions">
        {questions.map((question) => (
          <div className="assessment-form-question" key={question.id}>
            <p className="assessment-form-question-text">{question.text}</p>
            <div className="assessment-form-options">
              {question.options.map((option) => (
                <label className="assessment-form-option" key={option.id}>
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value={option.id}
                    checked={answers[question.id] === option.id}
                    onChange={() => handleOptionChange(question.id, option.id)}
                  />
                  {option.text}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="assessment-form-submit" onClick={handleSubmit}>
        ยืนยัน
      </button>
    </div>
  );
}

export default AssessmentForm;
