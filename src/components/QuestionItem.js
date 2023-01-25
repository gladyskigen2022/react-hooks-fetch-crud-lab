import React from "react";

function QuestionItem({ question, handleDeleteQuiz, updatedAnswerOnChange}) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteOnClick() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => handleDeleteQuiz(id))

  }
  function handleAnswerOnChange(event) {
    let correctIndex =event.target.value;
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...question, correctIndex}),
        
    })
      .then((r) => r.json())
      .then((updatedQuestionId) => { updatedAnswerOnChange(updatedQuestionId)})
  }
  
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerOnChange}>{options}</select>
      </label>
      <button onClick={handleDeleteOnClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
