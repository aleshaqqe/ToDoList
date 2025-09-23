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
    requestAnimationFrame(() => {
      li.classList.add('show');
    });
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
  const taskList = document.querySelector('.todolist__list');
  const li = taskList.children[index];
  li.classList.add('hide');

  li.addEventListener('transitionend', () => {
    tasks.splice(index, 1);
    render();
  }, { once: true });
}

function priorityTask(index) {
  const [item] = tasks.splice(index, 1);
  tasks.unshift(item);
  render();
}
const input = document.querySelector('.todolist__input');

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});
document.querySelector('.btn').addEventListener('click', addTask);
render();
