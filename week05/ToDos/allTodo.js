﻿//<script src="allToDo.js">


//<script src="addToDo.js">
var taskList = JSON.parse(localStorage.getItem("taskList"));
//allTask();
selectTask();
//Add new task to ToDos Task
function todo(taskMark, taskInput, delTask) {								//keywords refer reservation object
    this.taskMark = taskMark;
    this.taskInput = taskInput;
    this.delTask = delTask;
}


//var taskMarkE; // = "☐"; //"&#9746"
//var taskInputE = document.getElementById("taskInput").value;
//var delTaskE; // = "✖";
//add new task


function addTask() {
    taskMarkE = "☐";      //☐ &#9744, ☒ &#9746, ☑ &#9745;
    taskInputE = document.getElementById("taskInput").value;
    delTaskE = "✖";         //✖ &#10006,  ╳ &#9587
    if (taskInputE != "") {
        var newTodo = new todo(taskMarkE, taskInputE, delTaskE);
        taskList = JSON.parse(localStorage.getItem("taskList"));						//reterive task string from local storage and convert to object
        var newList = [];
        if (taskList === null) {
            taskList = newList;
        }
        //Initial Todos Task
        taskList.push(newTodo);													        //add new task string to local storage
        localStorage.setItem("taskList", JSON.stringify(taskList));						//convert task list object to string and store to local storage
        taskMark = "☐";
        taskInput.value = "";
        delTask = "✖";
        //allTask();
        console.log(taskList);
        selectTask();
    }
}


                //<script src="removeToDo.js">
                //Remove a task
function deleteTask(taskNumE) {
    delete taskList[taskNumE];															//using the keyvalue to delete task from object
    localStorage.setItem("taskList", JSON.stringify(taskList));							//convert task list object to string and store to local storage
    //allTask();
    console.log(taskList);
    selectTask();
}


            //<script src="filterToDo.js">
            //Filter Task Table
function selectTask(taskSymbol) {
    var tLabel;
    //document.getElementById("taskStatus").innerHTML = "All Tasks: " + allTotal;
    console.log(taskSymbol);
    switch (taskSymbol) {
        case "☑":
            tLabel = "Active: ";
            filterTask(taskSymbol, tLabel);
            break;
        case "☐":
            tLabel = "Completed: ";
            filterTask(taskSymbol, tLabel);
            break;
        case " ":
            tLabel = "All: ";
            filterTask(taskSymbol, tLabel);
            break;
    }
}


function filterTask(st, la) {
    //taskList = JSON.parse(localStorage.getItem("taskList"));
    console.log(st, la);
    taskList = JSON.parse(localStorage.getItem("taskList"));
    //var nst = st;
    var r = "<tr>"
    var counts = 0;
    var newList = [];
    if (st = null) {
        st = '';
    }
    if (taskList === null) {
        taskList = newList;
    }
    for (var i = 0; i <= taskList.length; i++) {
        if (taskList[i] != null) {
            var m = taskList[i].taskMark;
            switch (m) {
                case "☐":
                    crossMark = "class='active'"
                    break;
                case "☑":
                    crossMark = "class='completed'"
                    break;
            }
            console.log(st, la);
            console.log(taskList[i].taskMark);
            if (taskList[i].taskMark == st) {
                r += "<td hidden>" + i + "</td>";
                r += "<td id='l" + i + "c0' onclick = getval(this)>" + taskList[i].taskMark + "</td>";
                //r += "<td id='l" + i + "c1' " + crossMark + ">" + taskList[i].taskInput + "</td>";
                r += "<td id='l" + i + "c1' " + crossMark + ">XXXXX</td>";
                r += "<td id='l" + i + "c2' onclick = getval(this)>" + taskList[i].delTask + "</td><tr>";
                //counts++;
                //console.log(r);
                //console.log(counts);
            } else if (taskList[i].taskMark != '') {
                r += "<td hidden>" + i + "</td>";
                r += "<td id='l" + i + "c0' onclick = getval(this)>" + taskList[i].taskMark + "</td>";
                r += "<td id='l" + i + "c1' " + crossMark + ">" + taskList[i].taskInput + "</td>";
                r += "<td id='l" + i + "c2' onclick = getval(this)>" + taskList[i].delTask + "</td><tr>";
                counts++;
                console.log(counts);
            }
        }
        //console.log(counts);
    }
    var filteredTable = r;
    console.log(taskList);
    document.getElementById("fullTask").innerHTML = filteredTable;
    document.getElementById("taskStatus").innerHTML = la + counts;
}


//Get click values
function getval(cell) {
    var x = cell.closest('tr').rowIndex;
    var changeCell = fullTask.rows[x].cells[2];
    var rowIdx = (fullTask.rows[x].cells[0]).innerHTML;
    var strickCellId = "l" + rowIdx + "c1";
    if (cell.innerHTML === "✖") {
        deleteTask(rowIdx);
    } else if (cell.innerHTML === "☐") {
        //taskList[tableRow][tableCol] = "&#9745";
        taskList[rowIdx].taskMark = "☑";
    } else if (cell.innerHTML === "☑") {
        taskList[rowIdx].taskMark = "☐";
    }
    localStorage.setItem("taskList", JSON.stringify(taskList));
    selectTask();
}


            //<script src="resetToDo.js">
            //localStorage.clear();																//**clear the local storage**
function clearStg() {
    localStorage.clear();
    taskList = JSON.parse(localStorage.getItem("taskList"));
    //document.getElementById("toDoForm").reset();
    //allTask();
    selectTask();
}