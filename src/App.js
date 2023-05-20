import './App.css';
import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { About } from "./MyComponents/About";
// import {TodoItem} from "./MyComponents/TodoItem";
import { Footer } from "./MyComponents/Footer";
import { AddTodo } from "./MyComponents/AddTodo";
import { Routes } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";

import React, { useState, useEffect } from 'react';


function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const [todos, setTodos] = useState(initTodo);

  const onDelete = (todo) => {
    console.log("I am ondelete", todo);
    setTodos(todos.filter((e) => e !== todo));
  };

  const addTodo = (title, desc) => {
    let sno = (todos.length === 0) ? 1 : todos[todos.length - 1].sno + 1;
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodo]);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Router>
      <Header title="MyTodosList" searchBar={true} />

      <Routes>
        <Route path="/" element={
          <>
            <Routes>
              <Route index element={
                <>
                  <AddTodo addTodo={addTodo} />
                  <Todos todos={todos} onDelete={onDelete} />
                </>
              } />
            </Routes>
          </>
        } />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </Router>
  );
}


export default App;
