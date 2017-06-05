var employeeList;

function loadEmployeePage() {
    console.log("Loading Employee Page");

    $("#employeeList").hide();
    $("#employeeGrid").hide();
    employeeList = scheduleData.employees;
    //loadEmployeeGrid();
    loadEmployeeList();
}

function loadEmployeeGrid() {
    $("#employeeList").hide();
    $("#employeeGrid").show();
    var html = "";

    for(var i = 0; i < employeeList.length; i++) {
        html += "<a href=\"javascript:editEmployee(" + i + ")\">";
        html += "<div class=\"employeeGridBox\">";
        html += "<h1 class=\"employeeGridInitials\">" + employeeList[i].firstName.substring(0,1) + employeeList[i].lastName.substring(0,1) + "</h1>";
        html += "<div class =\"employeeGridBoxTitleBox\">";
        html += "<p class=\"employeeGridBoxTitle\">" + employeeList[i].firstName;
        html += "</p></div></div></a>";
    }

    $("#employeeGrid").html(html);
    console.log("Loaded Employee Grid");
}

function loadEmployeeList() {
    $("#employeeGrid").hide();
    $("#employeeList").show();

    var html = "";

    for(var i  = 0; i < employeeList.length; i++) {
        html += "<tr class=\"employeeListItem\">";
        html += "<td class=\"employeeListNum\">" + (i + 1) + "</td>";
        html += "<td class=\"employeeListName\">" + employeeList[i].firstName + " " + employeeList[i].lastName + "</td>";
        html += "<td class=\"employeeListEditCol\"><a href=\"javascript:editEmployee(" + i + ")\">";
        html += "<div class=\"employeeListEditBox\">Edit</div>";
        html += "</a></td></tr>";

        $("#employeeListTable").html(html);
        console.log("Loaded Employee List");
    }
}