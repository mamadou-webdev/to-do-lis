function validateForm() {
    const taskInput= document.getElementById('task');
    const taskliste = document.getElementById('task-list');
    const newTask = document. createElement('li')
    const tasktexte = taskInput.value ;

    newTask.innerText =tasktexte ;

    const deleteButton =document.createElement('button');
    deleteButton.textContent = 'supprimer';
    deleteButton.onclick = function() {
        taskliste.removeChild(newTask);
    };

    newTask.appendChild(deleteButton);

    newTask.onclick = function() {
        newTask.classList.toggle('completed');
    };
 


    taskliste.appendChild(newTask);
    taskInput.value ='';
}