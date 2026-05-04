"use client";

import { create } from "zustand";
import { AnswerRecord, Question, QuizConfig } from "@/lib/types";

interface QuizState {
  config: QuizConfig | null;
  questions: Question[];
  answers: AnswerRecord[];
  currentIndex: number;
  startedAt: number | null;
  questionStartedAt: number | null;

  setConfig: (config: QuizConfig) => void;
  setQuestions: (questions: Question[]) => void;
  submitAnswer: (selectedIndex: number) => void;
  nextQuestion: () => void;
  reset: () => void;

  score: () => number;
  isFinished: () => boolean;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  config: null,
  questions: [],
  answers: [],
  currentIndex: 0,
  startedAt: null,
  questionStartedAt: null,

  setConfig: (config) => set({ config }),

  setQuestions: (questions) =>
    set({
      questions,
      answers: [],
      currentIndex: 0,
      startedAt: Date.now(),
      questionStartedAt: Date.now(),
    }),

  submitAnswer: (selectedIndex) => {
    const { questions, currentIndex, answers, questionStartedAt } = get();
    const question = questions[currentIndex];
    if (!question) return;

    const timeTaken = questionStartedAt ? Date.now() - questionStartedAt : 0;
    const record: AnswerRecord = {
      questionId: question.id,
      selectedIndex,
      correct: selectedIndex === question.correctIndex,
      timeTaken,
    };
    set({ answers: [...answers, record] });
  },

  nextQuestion: () => {
    set((state) => ({
      currentIndex: state.currentIndex + 1,
      questionStartedAt: Date.now(),
    }));
  },

  reset: () =>
    set({
      config: null,
      questions: [],
      answers: [],
      currentIndex: 0,
      startedAt: null,
      questionStartedAt: null,
    }),

  score: () => get().answers.filter((a) => a.correct).length,

  isFinished: () => {
    const { answers, questions } = get();
    return questions.length > 0 && answers.length >= questions.length;
  },
}));
