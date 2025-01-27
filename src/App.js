
import './App.css';
import './css/Style.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container, ThemeProvider, CssBaseline, Switch, } from '@mui/material';
import TaskList from './Components/TaskList';
import TaskForm from './Components/TaskForm';
import EditTaskForm from './Components/EditTaskForm';


function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
        <Route path="/" element={<TaskList />} > </Route>
        <Route path="/TaskForm" element={<TaskForm />} > </Route>
        <Route path="/EditTaskForm/:id" element={<EditTaskForm />} > </Route>
        </Routes>

      </BrowserRouter>


    </>
  );
}


export default App;

