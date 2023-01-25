import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] =useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    .then((resp) => setQuestions(resp))
}, []
  )
  const questionsDisplayed = questions;

  function handleDeleteQuiz(deletedQuestion) {
    const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id);
    setQuestions(updatedQuestions)
  }

  function updatedAnswerOnChange(updatedQuestionId) {
    const updatedQuestions = questions.map((question) => {
      if (question.id === updatedQuestionId) {
        return updatedQuestionId
      } else {
        return question;
      }
    })
    setQuestions(updatedQuestions)
  }
  return (
    <section>
      <h1>Quiz Questions</h1>
      {/* display QuestionItem components here after fetching */}
      <ul>{questionsDisplayed.map((question) => {
        return < QuestionItem 
        key={question.id}
        question={question}
        handleDeleteQuiz={handleDeleteQuiz}
        updatedAnswerOnChange={updatedAnswerOnChange}/>
      })}</ul>
    </section>
  );
}

export default QuestionList;
