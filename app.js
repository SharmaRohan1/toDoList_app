const todoForm = document.querySelector("form");
const todoList = document.querySelector(".todo-list");

const createToDoElement = (todo) => {
  //creation of the div todo
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  if (todo.completed) {
    todoDiv.classList.add("complete");
  }

  const newTodo = document.createElement("li");
  newTodo.textContent = todo.title;
  newTodo.classList.add("todo-item");

  todoDiv.appendChild(newTodo);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-button");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);
  //endng of the div todo

  return todoDiv;
};

let toDoListArr = [];

document.addEventListener("DOMContentLoaded", (e) => {
  if (localStorage.getItem("todo")) {
    toDoListArr = JSON.parse(localStorage.getItem("todo"));
  } else {
    localStorage.setItem("todo", JSON.stringify(toDoListArr));
  }

  toDoListArr.forEach((todo) => {
    //create todo
    const newTodo = createToDoElement(todo);
    todoList.appendChild(newTodo);
  });
});

//adding new task
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = todoForm.todo.value;

  todoList.appendChild(createToDoElement({ title: title, completed: false }));

  toDoListArr.push({ title: title, completed: false });
  localStorage.setItem("todo", JSON.stringify(toDoListArr));

  todoForm.todo.value = "";
});

//modifying older tasks(completing/deleting)
todoList.addEventListener("click", (e) => {
  const item = e.target;

  //complete button
  if (item.classList.contains("complete-button")) {
    const todo = item.parentElement;

    if (!todo.classList.contains("complete")) {
      toDoListArr = toDoListArr.map((todoElement) => {
        if (todoElement.title !== todo.textContent) {
          return todoElement;
        } else {
          return { title: todoElement.title, completed: true };
        }
      });

      localStorage.setItem("todo", JSON.stringify(toDoListArr));
      todo.classList.add("complete");
    } else {
      toDoListArr = toDoListArr.map((todoElement) => {
        if (todoElement.title !== todo.textContent) {
          return todoElement;
        } else {
          return { title: todoElement.title, completed: false };
        }
      });

      localStorage.setItem("todo", JSON.stringify(toDoListArr));
      todo.classList.remove("complete");
    }
  }

  //delete button
  if (item.classList.contains("trash-button")) {
    const todo = item.parentElement;
    todo.classList.add("fallOnDelete");
    todo.addEventListener("transitionend", () => {
      toDoListArr = toDoListArr.filter((todoElement) => {
        return todoElement.title !== todo.textContent;
      });

      localStorage.setItem("todo", JSON.stringify(toDoListArr));

      todo.remove();
    });
  }
});

//filter
const undoneBtn = document.querySelector(".undone-btn");

undoneBtn.addEventListener("click", (e) => {
  const todos = todoList.children;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].classList.contains("complete")) {
      todos[i].classList.add("display-none");
    }
  }
});

const allTasksBtn = document.querySelector(".all-tasks-btn");

allTasksBtn.addEventListener("click", (e) => {
  const todos = todoList.children;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].classList.contains("display-none")) {
      todos[i].classList.remove("display-none");
    }
  }
});
