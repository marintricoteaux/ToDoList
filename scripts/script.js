// Logique du site de to-do list

let mainBox = document.getElementById("mainBox");
let btnAddTask = document.getElementById("addTaskButton");

let indexTaskAdded = 0;

btnAddTask.addEventListener("click", () => {
    mainBox.insertAdjacentHTML("beforeend",
        (`  <div id="taskZone${indexTaskAdded}" class="taskZoneClass">
                <input type="text" id="inputTask${indexTaskAdded}" name="inputTask"/>
                <button><i class="fa-solid fa-check"></i></button>
                <button><i class="fa-solid fa-xmark"></i></button>
            </div>

            `))
    indexTaskAdded++;
});