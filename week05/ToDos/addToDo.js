//<script src="addToDo.js">
var taskList = JSON.parse(localStorage.getItem("taskList"));
var currentTable;

//Add new task to ToDos Task
function todo(taskMark, taskInput, delTask) {								//keywords refer reservation object
    this.taskMark = taskMark;
    this.taskInput = taskInput;
    this.delTask = delTask;
}

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
        //console.log(taskList);
        selectTask(currentTable);
    }

}
