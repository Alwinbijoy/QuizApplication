"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";

const page = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState({ correct: 0, wrong: 0 });
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/get");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    };

    fetchData();
  }, []);

  const checkAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentIndex];
    if (currentQuestion.correctAnswer === selectedAnswer) {
      setResult((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setResult((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
    }

    if (currentIndex === questions.length - 1) {
      setShowResult(true);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  if (showResult) {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Quiz" />
        <div className="container mx-auto p-4">
          <h1 className="mb-4 text-3xl font-bold">Quiz Result</h1>
          <div className="mt-8">
            <p className="text-lg font-semibold">
              Correct Answers:{" "}
              <span className="text-green-500">{result.correct}</span>
            </p>
            <p className="text-lg font-semibold">
              Wrong Answers:{" "}
              <span className="text-red-500">{result.wrong}</span>
            </p>
          </div>
          <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-20">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              <button onClick={'restartQuiz'}>Play Again</button>
            </Link>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  if (questions.length === 0 || !questions[currentIndex]) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  const restartQuiz = () => {
    window.location.reload(); // Reloads the page
  };

  const currentQuestion = questions[currentIndex];
  const optionsMap = {
    1: currentQuestion.option1,
    2: currentQuestion.option2,
    3: currentQuestion.option3,
    4: currentQuestion.option4,
  };

  return (
    <DefaultLayout>
      
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-3xl font-bold">Quiz</h1>
        <div className="mb-8">
          <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>
          <div className="mt-4 grid grid-cols-1 gap-4">
            {[1, 2, 3, 4].map((optionIndex) => (
              <button
                key={optionIndex}
                className="rounded-md bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600"
                onClick={() => checkAnswer(optionsMap[optionIndex])}
              >
                {optionsMap[optionIndex]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default page;
