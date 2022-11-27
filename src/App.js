import "./App.css";
import { Todo } from "./components/Todo";
import Todos from "./components/TodoResolve";

function App() {
  return (
    <>
      <div className="App">
        <Todo />
      </div>
      <Todos />
    </>
  );
}

export default App;
