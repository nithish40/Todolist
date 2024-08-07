let todoinput = document.querySelector(".input");
let addtodo = document.querySelector(".button");
let todolist = document.querySelector(".todo-container");

let localData = JSON.parse(localStorage.getItem("todos"));
let todoList = localData || [];

function uniqueid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(param) {
        let number = Math.random() * 16 | 0;
        let randomnumber = param == 'x' ? number : (number & 0x3 | 0x8);
        return randomnumber.toString(16);
    });
}

addtodo.addEventListener("click", (e) => {
    e.preventDefault();
    let todo = todoinput.value.trim();
    if (todo.length > 0) {
        todoList.push({ todo, id: uniqueid(), isCompleted: false });
    }
    console.log(todoList);
    localStorage.setItem("todos", JSON.stringify(todoList));
    rendertodolist(todoList);
    todoinput.value = "";
});

todolist.addEventListener("click", (e) => {
    e.preventDefault();
    let key = e.target.dataset.key;
    let delTodoKey = e.target.dataset.todokey;

    if (key) {
        todoList = todoList.map(todo => todo.id === key ? { ...todo, isCompleted: !todo.isCompleted } : todo);
    }

    if (delTodoKey) {
        todoList = todoList.filter(todo => todo.id !== delTodoKey);
    }

    localStorage.setItem("todos", JSON.stringify(todoList));
    console.log(todoList);
    rendertodolist(todoList);
});

function rendertodolist(todoList) {
    todolist.innerHTML = todoList.map(({ todo, id, isCompleted }) => `
        <div class="todo">
            <div>
                <input type="checkbox" class="t-checkbox t-pointer" id="item-${id}" data-key=${id} ${isCompleted ? "checked" : ""}>
                <label data-key=${id} class="todo-text t-pointer ${isCompleted ? "checked-todo" : ""}" for="item-${id}">
                    ${todo}
                </label>
            </div>
            <button class="button del-btn" data-todokey=${id}>
                <span class="material-icons-outlined">delete</span>
            </button>
        </div>
    `);
}

rendertodolist(todoList);
