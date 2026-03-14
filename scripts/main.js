/*
Logique de la ToDoList dans le main.js, qui appelle
des fonctions dans script.js
*/

let mainBox = document.getElementById("mainBox");
let index = 0;
let tasks = [];

// Lorsqu'on clicke sur la mainBox :
mainBox.addEventListener("click", (event) => {
    // Ajout d'une tâche
    if (event.target.closest("#addTaskBtn")) {
        addTask(index);
        renderTask(tasks[index]);
        index++;
    }
    // Concernant une tâche
    else if (event.target.closest(".taskZone")) {
        // On récupère l'id de la tâche
        let taskZone = event.target.closest(".taskZone");

        // Confirmation d'une tâche à l'aide du bouton
        if (event.target.closest(".checkBtn")) {
            // On vérifie d'abord que l'input.value n'est pas empty
            let input = document.querySelector(`#input${taskZone.index}`);
            if (input.value === "") {
                input.placeholder = "You have to name your task !";
            } else {
                tasks[taskZone.index].editing = false;
                renderTask(tasks[taskZone.index]);
            }
        }
        // Supression d'une tâche : editing ou non
        else if (event.target.closest(".crossBtn") || event.target.closest(".trashBtn")) {
            suppTask(tasks[taskZone.index]);
        }
        // Modification d'une tâche
        else if (event.target.closest(".editBtn")) {
            tasks[taskZone.index].editing = true;
            renderTask(tasks[taskZone.index]);
        }
        // Check d'une tâche (marquer comme "fait"), et inversement
        else if (event.target.closest(".checkbox")) {
            isChecked(tasks[taskZone.index]);
        }
    }
});

// Confirmation avec la touche "Enter", dans l'input
document.addEventListener("keydown", (event) => {
    if (document.activeElement.tagName === "INPUT") {
        let taskZone = document.activeElement.closest(".taskZone");
        if (event.key === "Enter") {
            // On vérifie d'abord que l'input.value n'est pas empty
            let input = document.querySelector(`#input${taskZone.index}`);
            if (input.value === "") {
                input.placeholder = "You have to name your task !";
            } else {
                tasks[taskZone.index].editing = false;
                renderTask(tasks[taskZone.index]);
            }
        }
    }
});