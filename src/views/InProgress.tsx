import { useDevValuesContext } from "../data/context.ts";
import { Button } from "../components/button.tsx";
import { DEV_VALUES_QUESTIONS } from "../data/data.ts";

export const InProgress = () => {
  const { state, currentQuestion, answerQuestion } = useDevValuesContext();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {state.status === "IN_PROGRESS" && currentQuestion ? (
        <>
          <h2 className="text-lg mb-4 min-h-20">{currentQuestion.text}</h2>
          <p className="mb-4 text-xs text-gray-500">
            [{Object.keys(state.answers).length + 1} of{" "}
            {DEV_VALUES_QUESTIONS.length}]
          </p>
          <div className="flex flex-col items-center justify-center gap-2 w-80 mt-8">
            <Button
              color="lightBlue"
              onClick={() => answerQuestion(currentQuestion.id, 1)}
            >
              Strongly Agree
            </Button>
            <Button
              color="deepBlue"
              onClick={() => answerQuestion(currentQuestion.id, 0.5)}
            >
              Somewhat Agree
            </Button>
            <Button
              color="neutral"
              onClick={() => answerQuestion(currentQuestion.id, 0)}
            >
              Neutral/Unsure
            </Button>
            <Button
              color="deepRed"
              onClick={() => answerQuestion(currentQuestion.id, -0.5)}
            >
              Somewhat Disagree
            </Button>
            <Button
              color="lightRed"
              onClick={() => answerQuestion(currentQuestion.id, -1)}
            >
              Strongly Disagree
            </Button>
          </div>
        </>
      ) : (
        <p>Looks like something went wrong. You shouldn't see this.</p>
      )}
    </div>
  );
};
