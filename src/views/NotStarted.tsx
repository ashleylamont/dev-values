import { useDevValuesContext } from "../data/context.ts";
import { Button } from "../components/button.tsx";

export function NotStarted() {
  const { start } = useDevValuesContext();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl mb-4">Welcome to devValues</h2>
      <p className="mb-4">
        This is a fun quiz to help you discover your development values.
      </p>
      <Button onClick={start}>Start Questionnaire</Button>
    </div>
  );
}
