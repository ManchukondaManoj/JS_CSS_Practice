//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterToDo = document.querySelector('.filter-todo');

let selectedValue = 'all';

//EventListeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

filterToDo.addEventListener('click', filterTodo);

//Functions
function addTodo(event){
    event.preventDefault();
    //Create div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create li
    const newTodo = document.createElement('li');
    newTodo.innerText= todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //CheckMark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //Append todolist;
    todoList.appendChild(todoDiv);

    //Clear todo value
    todoInput.value = '';
}

function deleteCheck(e) {
    const item = e.target;
    //DELETE TODO
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }
    //CHECK MARK
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        if(selectedValue === 'uncompleted'){
            todo.addEventListener('transitionend', function(){
                todo.style.display = 'none';
            })
        }

    }
}


function filterTodo(e) {
    // e.preventDefault();
    selectedValue = e.target.value
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex'
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
            break;
        }
    })
}