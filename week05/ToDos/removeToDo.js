//<script src="removeToDo.js">
//Remove a task
function deleteTask(taskNumE) {
    delete taskList[taskNumE];															//using the keyvalue to delete task from object
    localStorage.setItem("taskList", JSON.stringify(taskList));							//convert task list object to string and store to local storage
    //allTask();
    console.log(taskList);
    selectTask('');
}