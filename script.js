const tasks = [];

function render() {
  const taskList = document.querySelector('.todolist__list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task;
    li.className = 'task';

    const action = document.createElement('div');
    action.className = 'actions';

    const priority = document.createElement('button');
    priority.className = 'btn2';
    priority.textContent = 'Priority';
    priority.addEventListener('click', () => {
      priorityTask(index);
    });

    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn2 btn3';
    removeBtn.textContent = 'Delete';
    removeBtn.addEventListener('click', () => {
      remove(index);
    });

    action.appendChild(priority);
    action.appendChild(removeBtn);

    li.appendChild(action);
    taskList.appendChild(li);
  });
}

function addTask() {
  const input = document.querySelector('.todolist__input');
  const task = input.value.trim();
  if (task) {
    tasks.push(task);
    input.value = '';
    render();
  }
}

function remove(index) {
  tasks.splice(index, 1);
  render();
}

function priorityTask(index) {
  const [item] = tasks.splice(index, 1);
  tasks.unshift(item);
  render();
}

document.querySelector('.btn').addEventListener('click', addTask);
render();
