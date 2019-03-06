'use strict';
class Task {
    constructor(name, status) {
        this.name = name;
        this.status = status;
    }
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
    newTr.innerHTML =`<td><center>${num++}</center></td><td>  ${taskName}   </td><td>  ${statusVal}  </td><td></td>`;
    tabbl.appendChild(newTr, trs[(trs.length -1 )]);
    document.getElementById("newTaskName").value = "";
}

let btn = document.getElementById("newTaskButton");
    btn.addEventListener("click", createTask);


function sortByStatus() {


}