//<script src="filterToDo.js">
        //Filter Task Table
function selectTask(taskSymbol) {
    var tLabel;
    //document.getElementById("taskStatus").innerHTML = "All Tasks: " + allTotal;
    console.log(taskSymbol);
    switch (taskSymbol) {
        case "☐":
            tLabel = "Active: ";
            filterTask(taskSymbol, tLabel);
            break;
        case "☑":
            tLabel = "Active: ";
            filterTask(taskSymbol, tLabel);
            break;
        case "":
            tLabel = "All: ";
            filterTask(taskSymbol, tLabel);
            break;
    }
}

function filterTask(st, la) {
    taskList = JSON.parse(localStorage.getItem("taskList"));
    console.log(st, la);
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
                r += "<td id='l" + i + "c1' " + crossMark + ">" + taskList[i].taskInput + "</td>";
                //r += "<td id='l" + i + "c1' " + crossMark + ">XXXXX</td>";
                r += "<td id='l" + i + "c2' onclick = getval(this)>" + taskList[i].delTask + "</td><tr>";
                counts++;
                console.log(counts);
            } else if (taskList[i].taskMark != '') {
                r += "<td hidden>" + i + "</td>";
                r += "<td id='l" + i + "c0' onclick = getval(this)>" + taskList[i].taskMark + "</td>";
                r += "<td id='l" + i + "c1' " + crossMark + ">" + taskList[i].taskInput + "</td>";
                r += "<td id='l" + i + "c2' onclick = getval(this)>" + taskList[i].delTask + "</td><tr>";
                counts++;
                console.log(counts);
            }

        }
    }


    var filteredTable = r;
    //console.log(taskList);
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
    selectTask('');
}