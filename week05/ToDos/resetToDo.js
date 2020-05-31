//<script src="resetToDo.js">
//localStorage.clear();																//**clear the local storage**
function clearStg() {
    localStorage.clear();
    //taskList = JSON.parse(localStorage.getItem("taskList"));
    //allTask();
    selectTask('');
}