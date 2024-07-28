//set up event listener for page load
/* document.addEventListener('DOMContentLoaded', function(){

    // sellecting DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // creating the add task function
    function addTask(){
        const taskText = taskInput.value.trim();

        //checking empty tasks and creating alerts
        if (taskText === ''){
            alert('Enter a task');
            return;
        }
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // adding event listener to the removebtn
        removeButton.onclick = function(){
            taskList.removeChild(listItem);
        }
        listItem.appendChild('removeButton');
        taskList.appendChild('list') 

        taskInput.value = '';
        
        // adding event listener to the add button 
        addButton.addEventListener('click', addTask)

        taskInput.addEventListener('keypress', function(event){
            if (event.key === 'Enter'){
                addTask();
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        addTask();
    }); 
}); */


document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTaskToDOM(taskText) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        removeButton.onclick = () => {
            taskList.removeChild(listItem);
            tasks = tasks.filter(task => task !== taskText);
            saveTasks();
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        tasks.push(taskText);
        saveTasks();

        addTaskToDOM(taskText);
        taskInput.value = ""; // Clear the input field
    }

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    tasks.forEach(addTaskToDOM); // Load tasks from localStorage on page load

    document.addEventListener('DOMContentLoaded', () => {
        addTask();
    }); 
});