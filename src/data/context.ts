import { createContext, useContext } from "react";
import { type DevValuesQuestion } from "./data.ts";

interface DevValuesNotStartedState {
  status: "NOT_STARTED";
}

interface DevValuesInProgressState {
  status: "IN_PROGRESS";
  answers: Record<string, -1 | -0.5 | 0 | 0.5 | 1>;
  currentQuestionId: string;
}

interface DevValuesCompletedState {
  status: "COMPLETED";
  answers: Record<string, -1 | -0.5 | 0 | 0.5 | 1>;
  result: Record<string, number>;
}

export type DevValuesState =
  | DevValuesNotStartedState
  | DevValuesInProgressState
  | DevValuesCompletedState;

export interface DevValuesContextType {
  state: DevValuesState;
  currentQuestion: DevValuesQuestion | null;
  answerQuestion: (questionId: string, answer: -1 | -0.5 | 0 | 0.5 | 1) => void;
  restart: () => void;
  start: () => void;
  progress: number;
}

export const DevValuesContext = createContext<DevValuesContextType | null>(
  null,
);

export function useDevValuesContext(): DevValuesContextType {
  const context = useContext(DevValuesContext);
  if (!context) {
    throw new Error(
      "useDevValuesContext must be used within a DevValuesProvider",
    );
  }
  return context;
}
