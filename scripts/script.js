/*
Logique du site de to-do list : 
Lorsqu'on ajoure une tâche :
- On crée la tâche en javascript en lui attribuant un index.
- On affiche à l'aide d'une fonction la tâche sous forme d'HTML
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
    // Confirmation d'une tâche 
    else if (event.target.closest(".checkBtn")) {
        let taskZone = event.target.closest(".taskZone");
        tasks[taskZone.index].editing = false;
        renderTask(tasks[taskZone.index]);
    }
    // Supression d'une tâche : editing ou non
    else if (event.target.closest(".crossBtn") || event.target.closest(".trashBtn")) {
        let taskZone = event.target.closest(".taskZone");
        suppTask(tasks[taskZone.index]);
    }
    // Modification d'une tâche
    else if (event.target.closest(".editBtn")) {
        console.log("edit");
        let taskZone = event.target.closest(".taskZone");
        tasks[taskZone.index].editing = true;
        renderTask(tasks[taskZone.index]);
    }
});

/*
Déclaration des fonctions
*/

// Cette fonction crée la tâche sous forme d'un objet avec
// les éléments qui la compose et son mode (editing/nEditing)
function addTask(index) {
    let task = {
        index: index,
        text: "",
        done: false,
        editing: true,
    };
    tasks.push(task);
}

// Lorque le bouton cross ou trash est cliqué, on supprime la tâche
function suppTask(task) {
    // Supression en mémoire
    tasks[task] = null;

    // Supression dans la DOM
    let taskZone = document.getElementById(`taskZone${task.index}`)
    taskZone.remove();
}

// La fonction s'occupe d'afficher en HTML la tâche en question,
// soit en mode editing, soit normalement.
function renderTask(task) {
    // Déclaration de la zone de la tâche
    let taskZone = document.createElement("div");
    taskZone.id = `taskZone${task.index}`;
    taskZone.classList = "taskZone";
    taskZone.index = task.index;

    // En fonction du mode, on a :
    if (task.editing) {
        // Création des éléments
        let input = document.createElement("input");
        input.type = "text";
        input.id = `input${task.index}`;
        input.class = "input";
        input.placeholder = "Name yout task";

        let checkBtn = document.createElement("button");
        checkBtn.id = `checkBtn${task.index}`;
        checkBtn.classList = "checkBtn";

        let checkIcon = document.createElement("i");
        checkIcon.classList = "fa-solid fa-check";

        let crossBtn = document.createElement("button");
        crossBtn.id = `crossBtn${task.index}`;
        crossBtn.classList = "crossBtn";

        let crossIcon = document.createElement("i");
        crossIcon.classList = "fa-solid fa-xmark";

        // Mise en place de la DOM
        checkBtn.appendChild(checkIcon);
        crossBtn.appendChild(crossIcon);

        taskZone.appendChild(input);
        taskZone.appendChild(checkBtn);
        taskZone.appendChild(crossBtn);
    } else {
        // Création des éléments
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `checkbox${task.index}`;
        checkbox.classList = "checkbox";

        // Ajout de la valeur de l'input s'il existe
        task.text = document.getElementById(`input${task.index}`).value;
        let textSpan = document.createElement("span");
        textSpan.innerText = task.text;

        let editBtn = document.createElement("button");
        editBtn.id = `editBtn${task.index}`;
        editBtn.classList = "editBtn";

        let editIcon = document.createElement("i");
        editIcon.classList = "fa-solid fa-pen";

        let trashBtn = document.createElement("button");
        trashBtn.id = `trashBtn${task.index}`;
        trashBtn.classList = "trashBtn";

        let trashIcon = document.createElement("i");
        trashIcon.classList = "fa-solid fa-trash-can";

        // Mise en place de la DOM
        editBtn.appendChild(editIcon);
        trashBtn.appendChild(trashIcon);

        taskZone.appendChild(checkbox);

        taskZone.appendChild(textSpan);

        taskZone.appendChild(editBtn);
        taskZone.appendChild(trashBtn);
    }

    // On ajoute enfin la zone de tâche à la mainBox
    let taskToRender = document.getElementById(`taskZone${task.index}`)
    if (taskToRender) {
        taskToRender.replaceWith(taskZone);
    } else {
        mainBox.appendChild(taskZone);
    }
}