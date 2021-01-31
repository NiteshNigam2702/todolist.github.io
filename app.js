//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.filter-todo')

//Event listneres
document.addEventListener('DOMContentLoaded', loadTodo);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deletecheck);
todoFilter.addEventListener('click', filtertodo);


//Functions
function addTodo(event) {
    event.preventDefault();
    
    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    
    //create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add to local storage
    saveLocalTodo(todoInput.value);
    //check mark btn
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    
    //check trash btn
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    
    //append to list
    todoList.appendChild(todoDiv);
    
    //clear input value
    todoInput.value = "";
}
function deletecheck(e){
    const item = e.target;
    const todo = item.parentElement;
    
    //delete
    if(item.classList[0] === "trash-btn"){
        //animation
        todo.classList.add('fall');
        removeLocalTodo(todo);
        todo.addEventListener('transitionend', ()=>{
            todo.remove();
        });
    }
    //checked
    if(item.classList[0] === "complete-btn"){
        todo.classList.toggle('completed');
    }
}
//filter
function filtertodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "checked":
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            case "unchecked":
                if(todo.classList.contains('completed')){
                    todo.style.display = "none";
                }
                else{
                    todo.style.display = "flex";
                }
                break;

        }
    });
}
//local storage funciton

function saveLocalTodo(todo){
    //check for already present todo
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
};
function loadTodo(e){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        
        //create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //check mark btn
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        
        //check trash btn
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        
        //append to list
        todoList.appendChild(todoDiv);
    })
}
//delete todo item
function removeLocalTodo(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
var myVar = setInterval(()=>{
    myTimer();
}, 1000);

function myTimer(){
    var d =new Date();
    document.getElementById('Clock').innerHTML = d.toLocaleTimeString();
}
