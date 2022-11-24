
import "./App.css";
import {ToDoList} from './components/todolist'
import {Create} from './components/Create'

function App() {
  return (
    
      <div className ="App">
        <h1>Todos(5)</h1>
        <Create />
        <br></br>
        <ToDoList/>

      </div>
  
  );
}

export default App;
