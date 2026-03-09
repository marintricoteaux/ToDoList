/*
Logique du site de to-do list : 
Lorsqu'on ajoure une tâche :
- On crée la tâche en javascript en lui attribuant un index.
- On affiche à l'aide d'une fonction la tâche sous forme d'HTML
*/

let mainBox = document.getElementById("mainBox");
let btnAddTask = document.getElementById("addTaskButton");
let indexTaskCount = 0;

// Ajout d'une tâche grâce au bouton "Add a task"
btnAddTask.addEventListener("click", () => {
    addTaskZone(indexTaskCount);
    indexTaskCount++;
});

// Confirmation de la tache en cours de création à l'aide du bouton check
mainBox.addEventListener("click", (event) => {
    if (event.target.closest(".checkButton")) {
        confirmTask(+event.target.closest(".checkButton").dataset.index);
    }
});
// Confirmation de la tache en cours de création à l'aide de la touche "enter"
document.addEventListener("keydown", (event) => {
    if (document.activeElement.tagName === "INPUT") {
        if (event.key === "Enter") {
            confirmTask(+document.activeElement.dataset.index);
        }
    }
});

// Supression de la tache en cours de création à l'aide du bouton croix
mainBox.addEventListener("click", (event) => {
    if (event.target.closest(".crossButton")) {
        suppTask(+event.target.closest(".crossButton").dataset.index);
    }
});

// Modification de la tâche après création grâce au bouton editTask
mainBox.addEventListener("click", (event) => {
    if (event.target.closest(".editTask")) {
        // On vérifie un potentiel précédent textSaved
        let currentIndex = +event.target.closest(".editTask").dataset.index;
        let currentTask = document.getElementById(`taskZone${currentIndex}`)
        let textSaved = currentTask.innerText.trim(); // Supprime les espaces inutiles avant et après la chaîne de caractère
        //On vérifie une potentielle précédente checkbox checked
        let wasChecked = document.getElementById(`checkboxTask${currentIndex}`).checked;

        editTask(+event.target.closest(".editTask").dataset.index, textSaved, wasChecked);
    }
})
// Supression de la tâche après création grâce au bouton trashButton
mainBox.addEventListener("click", (event) => {
    if (event.target.closest(".trashButton")) {
        suppTask(+event.target.closest(".trashButton").dataset.index);
    }
})


/*
Déclaration des fonctions
*/

// Cette fonction ajoute une zone de tâche, elle passe la tâche en mode "edit"
function addTaskZone(indexTask) {
    let stringHTML = `<div id="taskZone${indexTask}" class="taskZoneClass" data-index="${indexTask}" data-wasChecked="false"></div>`;

    mainBox.insertAdjacentHTML("beforeend", stringHTML)
    editTask(indexTask);
}

// Cette fonction confirme la tâche en récupérant la valeur de l'input et en placant les boutons appropriés
function confirmTask(indexTask) {
    let currentTask = document.getElementById(`taskZone${indexTask}`);
    let inputTask = (document.getElementById(`inputTask${indexTask}`));
    
    let stringHTML = (
        `<input type="checkbox" id="checkboxTask${indexTask}"/>
        ${inputTask.value}
        <button id="editTask${indexTask}" class="editTask" data-index="${indexTask}">
            <i class="fa-solid fa-pen"></i>
        </button>
        <button id="trashButton${indexTask}" class="trashButton" data-index="${indexTask}">
            <i class="fa-solid fa-trash-can"></i>
        </button>`
    );

    if (inputTask.value !== "") {
        currentTask.innerHTML = stringHTML;

        // On check la box si elle l'était avant modification
        let wasChecked = document.getElementById(`taskZone${indexTask}`).dataset.wasChecked;
        if (wasChecked === "true") {
            let checkboxTask = document.getElementById(`checkboxTask${indexTask}`);
            checkboxTask.checked = true;
        }
    } else {
        inputTask.classList.add("errorMessage");
    }
}

// Cette fonction suprrime completement la tâche, ainsi que sa zone
function suppTask(indexTask) {
    let taskToSupp = document.getElementById(`taskZone${indexTask}`);

    taskToSupp.remove();
}

// Cette fonction permet de modifier une tâche
function editTask(indexTask, inputSaved="", wasChecked = false) {
    let stringHTML = (
        `<input type="text" id="inputTask${indexTask}" class="inputTask" name="inputTask" placeholder="Name your task" data-index="${indexTask}"/>
        <button id="check${indexTask}" class="checkButton" data-index="${indexTask}">
            <i class="fa-solid fa-check"></i>
        </button>
        <button id="cross${indexTask}" class="crossButton" data-index="${indexTask}">
            <i class="fa-solid fa-xmark"></i>
        </button>`
    );
    let currentTask = document.getElementById(`taskZone${indexTask}`);
    
    //On vérifie au préalable que la tâche n'était pas checked
    if (wasChecked) {
        currentTask.dataset.wasChecked = true;
    } else {
        currentTask.dataset.wasChecked = false;
    }

    // On passe en mode "edit"
    currentTask.innerHTML = stringHTML;

    // On vérifie qu'il n'y ai pas déjà un input rentré
    if (inputSaved !== "") {
        let currentInputTask = document.getElementById(`inputTask${indexTask}`);
        currentInputTask.value = inputSaved;
    }
}