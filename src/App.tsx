import "./App.css";
import { useDevValuesContext } from "./data/context.ts";
import { NotStarted } from "./views/NotStarted.tsx";
import { InProgress } from "./views/InProgress.tsx";
import { Completed } from "./views/Completed.tsx";

function App() {
  const { state } = useDevValuesContext();
  return (
    <div className="p-2 flex flex-col min-h-screen font-mono">
      <header>
        <h1 className="text-2xl">devValues</h1>
      </header>
      <hr className="my-4" />
      <main className="grow">
        {state.status === "NOT_STARTED" && <NotStarted />}
        {state.status === "IN_PROGRESS" && <InProgress />}
        {state.status === "COMPLETED" && <Completed />}
      </main>
      <hr className="my-4" />
      <footer>
        Made by{" "}
        <a className="underline" href="https://ashl.dev">
          Ashley
        </a>
      </footer>
    </div>
  );
}

export default App;
