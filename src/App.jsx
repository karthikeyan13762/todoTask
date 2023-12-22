import "./App.css";
import React, { useState } from "react";

function App() {
  const [inputName, setInputName] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [todos, setTodos] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  const handleNameChange = (e) => {
    setInputName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setInputDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos];
        updatedTodos[editIndex].name = inputName;
        updatedTodos[editIndex].description = inputDescription;
        setEditIndex(null);
        return updatedTodos;
      });
    } else {
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          name: inputName,
          description: inputDescription,
          status: "Not Completed",
        },
      ]);
    }

    setInputName("");
    setInputDescription("");
  };

  const handleStatusChange = (index, newStatus) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[index].status = newStatus;
      return updatedTodos;
    });
  };

  const handleEdit = (index) => {
    const todoToEdit = todos[index];
    setInputName(todoToEdit.name);
    setInputDescription(todoToEdit.description);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos.splice(index, 1);
      setEditIndex(null);
      return updatedTodos;
    });
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredTodos =
    statusFilter === "All"
      ? todos
      : todos.filter((todo) => todo.status === statusFilter);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <form method="post" onSubmit={handleSubmit}>
            <div id="tidoHeading">
              <h2>My todo</h2>
            </div>
            <div className="input-group" id="inputFeilds-sibmit">
              <input
                type="text"
                placeholder="Todo Name"
                id="todo-Name"
                value={inputName}
                onChange={handleNameChange}
                required
              />
              <input
                type="text"
                placeholder="Todo Description"
                id="todo-Description"
                value={inputDescription}
                onChange={handleDescriptionChange}
                required
              />
              <button type="submit" id="todoButton">
                {editIndex !== null ? "Update Todo" : "Add Todo"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="row">
        <div className="col-12" id="statusDropDown">
          <div className="myTodo">
            <h5>My Todos</h5>
          </div>
          <div className="dropDown">
            <h5>Status Filter :</h5>
            <select onChange={handleFilterChange} value={statusFilter}>
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Not Completed">Not Completed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        {filteredTodos.map((todo, index) => (
          <div key={index} className="col-sm-12 col-lg-4">
            <div className="card">
              <p>Name: {todo.name}</p>
              <p>Description: {todo.description}</p>
              <p>
                Status:
                <select
                  value={todo.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <option value="Completed">Completed</option>
                  <option value="Not Completed">Not Completed</option>
                </select>
              </p>
              <div className="editDelet">
                <button 
                  type="button"
                  className="btn"
                  onClick={() => handleEdit(index)}
                >
                <label for="todo-Name">Edit</label>   
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
