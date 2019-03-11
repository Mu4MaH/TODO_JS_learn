'use strict';
const storage = localStorage;
let statusChangersCollectionHTML;
class Task {
    constructor(name, status, uid) {
        this.uid = uid
        this.name = name;
        this.status = status;
    }
}
//
// function valueSelector(value) {
//     switch (value) {
//         case 'Запланировано': return 1
//     }
// }

window.onload = function () {
    const tabbl = document.getElementById('tasksTable');
    const trs = tabbl.children;
    let num = 1;
    for (const key in storage) {
        const newTr = document.createElement('tr');
        const item = storage.getItem(key);
        if (item && key != 'randid') {
            let task = new Task();
            task = JSON.parse(storage.getItem(key));
            task.uid = key;
            newTr.id = key;
            newTr.innerHTML = `<td align="center">${num++}</td><td>${task.name}</td><td class="currStatus">${task.status}</td><td> <select class="statusChanger"  onchange="statusChange(event)" ><option selected>---</option> <option value="Запланировано">Запланировано</option><option value="Выполнено">Выполнено</option><option value="Неплохо бы">Неплохо бы</option> </select></td>`;
            tabbl.appendChild(newTr, trs[(trs.length - 1)]);
        }
    }
    statusChangersCollectionHTML = document.getElementsByClassName("statusChanger");
}

function createTask() {
    if (document.getElementById("newTaskName").value == "") return;//если имя новой задачи отсутствует, то выходим
    let task = new Task();
    const uid = `f${(+new Date).toString(16)}`;
    task.name = document.getElementById('newTaskName').value; //гребём имя создаваемой задачи
    const status = document.getElementById('newStatus'); //гребём выбралку со статусами
    task.status = status.options[status.selectedIndex].text;//гребём выбранный в вибиралке статус
    task.uid = uid;
    const tabbl = document.getElementById('tasksTable'); //гребём таблицу тасков со страницы
    const trs = tabbl.children; //гребём все ряды таблицы тасков
    let num = trs.length;
    const newTr = document.createElement('tr'); // создание нового ряда
    newTr.id = uid;//хранение ид таска в ид роу
    storage.setItem(uid, JSON.stringify(task));//пишем в ЛС новую запись вида <ид "таск_в_джейсоне">
    newTr.innerHTML =`<td align="center">${num++}</td><td>  ${task.name}   </td><td>  ${task.status}  </td><td><select onchange="statusChange(event)" class="statusChanger"><option selected>---</option> <option value="Запланировано">Запланировано</option> `+
        +`<option value="Выполнено">Выполнено</option>` +
        +`<option value="Неплохо бы">Неплохо бы</option> </select></td>`; //заполнение нового ряда созданным таском
    tabbl.appendChild(newTr, trs[(trs.length -1 )]); //приделали новый ряд к таблице
    document.getElementById("newTaskName").value = "";//обнуляем текст в едите для нового таска
}

function clearTasks() {
    if (confirm("Очистить весь список? Вы уверены?")) {
        storage.clear();
        location.reload();
    }
}

function statusChange(e) {
    if (e.target.options[e.target.selectedIndex].text == '---') return;
    const taskId = e.target.parentElement.parentElement.id;
    let modifiedTask;
    const modifiedRow = document.getElementById(taskId);
    if (e.target.selectedIndex == 2) {
        modifiedRow.cells[1].textContent.strike();
    }
    modifiedTask = JSON.parse(storage.getItem(taskId));
    modifiedTask.status = e.target.options[e.target.selectedIndex].text;
    storage.setItem(taskId, JSON.stringify(modifiedTask));
    modifiedRow.cells[2].innerHTML = modifiedTask.status;
    e.target.selectedIndex = 0;
    //location.reload();
}

const createBtn = document.getElementById("newTaskButton");
createBtn.addEventListener("click", createTask);
const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", clearTasks);
