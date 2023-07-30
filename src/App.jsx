import Navbar from "./Navbar"
import Task from "./Task"
import TodoList from "./input"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<TodoList />} ></Route>
        <Route path="/task" element={<Task />} ></Route>
      </Routes>
    </Router>
  )
}

export default App
