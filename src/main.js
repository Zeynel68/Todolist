document.addEventListener("DOMContentLoaded", function() {
  const todoInput = document.getElementById("todo-input");
  const addTodoButton = document.getElementById("add-todo");
  const clearTodosButton = document.getElementById("clear-todos");
  const todoList = document.getElementById("todo-list");

  // Load todos from localStorage
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach(todo => addTodoToDOM(todo));

  // Add new todo
  addTodoButton.addEventListener("click", function() {
    const todoText = todoInput.value.trim();
    if (todoText) {
      addTodoToDOM(todoText);
      todos.push(todoText);
      localStorage.setItem("todos", JSON.stringify(todos));
      todoInput.value = "";
    }
  });

  // Clear all todos
  clearTodosButton.addEventListener("click", function() {
    localStorage.removeItem("todos");
    while (todoList.firstChild) {
      todoList.removeChild(todoList.firstChild);
    }
  });

  function addTodoToDOM(todoText) {
    const li = document.createElement("li");
    li.className = "border p-2 mb-2 flex justify-between items-center bg-gray-200 rounded";

    const span = document.createElement("span");
    span.textContent = todoText;
    li.appendChild(span);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "×";
    deleteButton.className = "text-red-500 ml-4";
    deleteButton.addEventListener("click", function() {
      const index = todos.indexOf(todoText);
      if (index > -1) {
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
      }
      todoList.removeChild(li);
    });

    li.appendChild(deleteButton);
    todoList.appendChild(li);
  }
});

