import {
  DEV_VALUES_AXES,
  DEV_VALUES_QUESTIONS,
  type DevValuesQuestion,
} from "./data.ts";
import { useCallback, useMemo, useState } from "react";
import {
  DevValuesContext,
  type DevValuesContextType,
  type DevValuesState,
} from "./context.ts";

const getRemainingQuestions = (currentState: DevValuesState) =>
  DEV_VALUES_QUESTIONS.filter(
    (question) =>
      currentState.status === "NOT_STARTED" ||
      (currentState.status === "IN_PROGRESS" &&
        !Object.hasOwn(currentState.answers, question.id)),
  );

const getRandomNextQuestion = (remainingQuestions: DevValuesQuestion[]) => {
  if (remainingQuestions.length === 0) {
    throw new Error("No remaining questions to select from");
  }
  const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
  return remainingQuestions[randomIndex];
};

export function DevValuesProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DevValuesState>({ status: "NOT_STARTED" });

  const answerQuestion = useCallback(
    (questionId: string, answer: -1 | -0.5 | 0 | 0.5 | 1) => {
      if (state.status !== "IN_PROGRESS") {
        throw new Error("Cannot answer question when not in progress");
      }

      const newState: DevValuesState = {
        ...state,
        answers: {
          ...state.answers,
          [questionId]: answer,
        },
      };

      const remainingQuestions = getRemainingQuestions(newState);

      if (remainingQuestions.length === 0) {
        const result: Record<string, number> = Object.fromEntries(
          DEV_VALUES_AXES.map((axis) => [axis.id, 0]),
        );
        for (const [questionId, answerValue] of Object.entries(
          newState.answers,
        )) {
          const question = DEV_VALUES_QUESTIONS.find(
            (q) => q.id === questionId,
          )!;
          for (const axis of question.positiveAxes) {
            result[axis] += answerValue;
          }
          for (const axis of question.negativeAxes) {
            result[axis] -= answerValue;
          }
        }

        setState({
          status: "COMPLETED",
          answers: newState.answers,
          result,
        });
      } else {
        const newNextQuestion: DevValuesQuestion =
          getRandomNextQuestion(remainingQuestions);
        setState({
          ...newState,
          currentQuestionId: newNextQuestion.id,
        });
      }
    },
    [state],
  );

  const currentQuestion = useMemo(() => {
    if (state.status === "IN_PROGRESS") {
      return DEV_VALUES_QUESTIONS.find(
        (q) => q.id === state.currentQuestionId,
      )!;
    }
    return null;
  }, [state]);

  const progress = useMemo(() => {
    if (state.status === "NOT_STARTED") return 0;
    if (state.status === "COMPLETED") return 1;
    const totalQuestions = DEV_VALUES_QUESTIONS.length;
    const answeredQuestions = Object.keys(state.answers).length;
    return answeredQuestions / totalQuestions;
  }, [state]);

  const restart = useCallback(() => {
    setState({ status: "NOT_STARTED" });
  }, []);

  const start = useCallback(() => {
    if (state.status !== "NOT_STARTED") {
      throw new Error("Cannot start when already in progress or completed");
    }
    const nextQuestion = getRandomNextQuestion(DEV_VALUES_QUESTIONS);
    setState({
      status: "IN_PROGRESS",
      answers: {},
      currentQuestionId: nextQuestion.id,
    });
  }, [state]);

  const contextValue = useMemo<DevValuesContextType>(() => {
    return {
      state,
      answerQuestion,
      currentQuestion,
      progress,
      restart,
      start,
    };
  }, [answerQuestion, currentQuestion, progress, restart, start, state]);

  return (
    <DevValuesContext.Provider value={contextValue}>
      {children}
    </DevValuesContext.Provider>
  );
}
