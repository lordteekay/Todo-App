// Selectors
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoLists = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")

// Eventlistner
document.addEventListener("DOMContentLoaded",getTodo)
todoButton.addEventListener("click",addTodo)
todoLists.addEventListener("click",checkDelete)
filterOption.addEventListener("click",filterTodo)

// Functions

function addTodo(event) {
    // Preventing it from Refreshing
    event.preventDefault()
    // Create a Todo Div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    // Add local storage
    saveLocalTodos(todoInput.value)
    // Create a list


    const newTodo = document.createElement("li")
    newTodo.classList.add("todo-item")
    newTodo.innerText = todoInput.value
    todoDiv.appendChild(newTodo)

    // Check Mark Button
    const completedButton  = document.createElement("button")
    completedButton.classList.add("complete-btn")
    completedButton.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    todoDiv.appendChild(completedButton)

    // Check Cancel Button
    const trashButton  = document.createElement("button")
    trashButton.classList.add("trash-btn")
    trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    todoDiv.appendChild(trashButton)

    // Append todoDiv to todolists
    todoLists.appendChild(todoDiv)

    // Clear Input
    todoInput.value = ""
}

function checkDelete(e) {
    const item = e.target
    // Delete Button
    if(item.classList[0]==="trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("remove-anime")
        removeLocaltodos(todo)
        todo.addEventListener("transitionend", function () {
            todo.remove()
        })
        // todo.remove()
    }
    // Checked Button
    if(item.classList[0]==="complete-btn"){
        const newElement = item.parentElement;
        newElement.classList.toggle("completed")
    }
} 

function filterTodo(e) {
    const todos = todoLists.childNodes
    todos.forEach(function(todo){
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex"
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none"
                }
                break;
            default:
                break;
        }
    })
}

function saveLocalTodos(todo) {
    // To know if the local storage is already stored or not
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodo() {
    let todos;

    if(localStorage.getItem("todos")=== null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function(todo){
     // Create a Div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    // Create a list

    const newTodo = document.createElement("li")
    newTodo.classList.add("todo-item")
    newTodo.innerText = todo
    todoDiv.appendChild(newTodo)

    // Check Mark Button
    const completedButton  = document.createElement("button")
    completedButton.classList.add("complete-btn")
    completedButton.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    todoDiv.appendChild(completedButton)

    // Check Cancel Button
    const trashButton  = document.createElement("button")
    trashButton.classList.add("trash-btn")
    trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    todoDiv.appendChild(trashButton)

    // Append todoDiv to todolists
    todoLists.appendChild(todoDiv)

    })
    // todos.push(todo)
    // localStorage.setItem("todos", JSON.stringify(todos))
}

function removeLocaltodos(todo) {
    let todos;

    if(localStorage.getItem("todos")=== null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.childNodes[0].innerText
    todos.splice(todos.indexOf(todoIndex),1)
    localStorage.setItem("todos",JSON.stringify(todos))
}