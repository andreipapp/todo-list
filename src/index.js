import Todo from './createTodo';
import './styles.css';


const taskContainer = document.querySelector('.tasks');
const doneContainer = document.querySelector('.done');
const displayForm = document.querySelector('.displayForm');
const addTask = document.querySelector('.addTask');
const form = document.querySelector('form');
const list = [];

displayForm.addEventListener('click', () => form.classList.toggle('hide'));
addTask.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const status = document.getElementById('status').checked;
    if (!name) {
        alert('Please enter todo!');
        return;
    }
    const task = new Todo(name, status);
    list.push(task);
    loadTasks(list);
    form.classList.toggle('hide');
    document.getElementById('name').value = '';
})


function loadTasks(list) {
    taskContainer.textContent = '';
    doneContainer.textContent = '';
    for (let task of list) {
        const taskBody = document.createElement('div');
        taskBody.classList.add('task');
        const statusButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        statusButton.classList.add('toggle');
        statusButton.innerHtml = 'toggle';
        deleteButton.classList.add('delete');
        deleteButton.textContent = 'delete';
        taskBody.textContent = task.title;
        taskBody.appendChild(statusButton);
        taskBody.appendChild(deleteButton);
        if (task.status) {
            doneContainer.appendChild(taskBody);
        } else {
            taskContainer.appendChild(taskBody);
        }
        statusButton.addEventListener('click', () => {
            task.status = toggleStatus(task.status);
            loadTasks(list);
        });
        deleteButton.addEventListener('click', () => {
            let index = findIndex(task, list);
            list.splice(index, 1);
            loadTasks(list);
        })

    }
}
function toggleStatus(status) {
    status = !status;
    return status;
}

function findIndex(taskToFind, list) {
    let index = 0;
    for (let task of list) {
        if (task === taskToFind) {
            return index;
        }
        index++;
    }
    return index;
}



