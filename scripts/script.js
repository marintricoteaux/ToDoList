/*
Logique du site de to-do list
*/

let mainBox = document.getElementById("mainBox");
let btnAddTask = document.getElementById("addTaskButton");

let indexTaskAdded = 0;

// Ajout d'une tâche grâce au bouton "Add a task"
btnAddTask.addEventListener("click", () => {
    mainBox.insertAdjacentHTML("beforeend",
        (`  <div id="taskZone${indexTaskAdded}" class="taskZoneClass">
                <input type="text" id="inputTask${indexTaskAdded}" class="inputTask" name="inputTask" placeholder="Name your task", data-index="${indexTaskAdded}"/>
                <button id="check${indexTaskAdded}" class="checkButton" value="${indexTaskAdded}">
                    <i class="fa-solid fa-check"></i>
                </button>
                <button id="cross${indexTaskAdded}" class="crossButton" value="${indexTaskAdded}">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            `))
    indexTaskAdded++;
});

// Supression de la tache en cours de création à l'aide du bouton croix
mainBox.addEventListener("click", (event) => {
    if (event.target.closest(".crossButton")) {
        let nTask = event.target.closest(".crossButton").value;
        let taskToSupp = document.getElementById(`taskZone${nTask}`);
        taskToSupp.remove();
    }
});

// Confirmation de la tache en cours de création à l'aide du bouton check

mainBox.addEventListener("click", (event) => {
    if (event.target.closest(".checkButton")) {
        let nTask = event.target.closest(".checkButton").value;
        confirmTask(nTask);
    }
});

// Confirmation de la tache en cours de création à l'aide de la touche "enter"
document.addEventListener("keydown", (event) => {
    if (document.activeElement.tagName === "INPUT") {
        if (event.key === "Enter") {
            let currentInputTask = document.activeElement;
            let nTask = +currentInputTask.dataset.index;
            confirmTask(nTask);
        }
    }
});

/*
Déclaration des fonctions
*/

function confirmTask(nTask) {
    let taskToConfirm = document.getElementById(`taskZone${nTask}`);
    let inputTask = (document.getElementById(`inputTask${nTask}`));
    if (inputTask.value !== "") {
        taskToConfirm.innerHTML = `<input type="checkbox" id="checkboxTask${nTask}"/>${inputTask.value}`;
    } else {
        inputTask.classList.add("errorMessage");
        inputTask.placeholder = "The task can't be empty";
    }
}