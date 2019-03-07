'use strict';
const storage = localStorage;
let statusChangers;
class Task {
    constructor(name, status) {
        this.name = name;
        this.status = status;
    }
}

window.onload = function () {
    const tabbl = document.getElementById('tasksTable');
    const trs = tabbl.children;
    let num = 1;
    for (let key in storage) {
        let newTr = document.createElement('tr');
        let item = storage.getItem(key)
        if (item && key != 'randid') {
                        newTr.innerHTML = `<td><center>${num++}</center></td><td>  ${key}   </td><td class="currStatus">  ${item} </td><td><select class="statusChanger"> <option value="Запланировано">Запланировано</option><option value="Выполнено">Выполнено</option> <option value="Неплохо">Неплохо бы</option> </select></td>`;
            tabbl.appendChild(newTr, trs[(trs.length - 1)]);
        }
    }
    statusChangers = document.getElementsByClassName("statusChanger");
}

function changeStatus(e) {
alert('sdf');
}

function createTask() {
    if (document.getElementById("newTaskName").value == "") return;
    const taskName = document.getElementById('newTaskName').value;
    const status = document.getElementById('newStatus');
    const statusVal = status.options[status.selectedIndex].text;
    const tabbl = document.getElementById('tasksTable');
    const trs = tabbl.children;
    let num = trs.length;
    const newTr = document.createElement('tr');
    storage.setItem(taskName,statusVal);
    newTr.innerHTML =`<td><center>${num++}</center></td><td>  ${taskName}   </td><td>  ${statusVal}  </td><td><select onchange=""> <option value="Запланировано">Запланировано</option> `+
        +`<option value="Выполнено">Выполнено</option>` +
        +`<option value="Неплохо">Неплохо бы</option> </select></td>`;
    tabbl.appendChild(newTr, trs[(trs.length -1 )]);
    document.getElementById("newTaskName").value = "";
}

function clearTasks() {
    if (confirm("Очистить весь список? Вы уверены?")) {
        storage.clear();
        location.reload();
    }
}

const createBtn = document.getElementById("newTaskButton");
createBtn.addEventListener("click", createTask);
const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", clearTasks);
for (let i = 0; i < statusChangers.length; i++) {
    statusChangers(i).addEventListener("change",changeStatus);
}


//
// function sortByStatus() {
// let sortArr =
//
// }