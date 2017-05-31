
// https://jsonblob.com/d064c276-456f-11e7-ae4c-2fa58361dbb6
var jsonID = "d064c276-456f-11e7-ae4c-2fa58361dbb6";
var jsonObject;


$(document).ready(function() {
    console.log("Starting!");

    hideAllPages();
    showSchedulePage();
    loadJSON();
    console.log("Done!");
});

function loadJSON() {
    $.ajax({
        url: "https://jsonblob.com/api/jsonBlob/" + jsonID,
        dataType: "json",
        success: function (parsed_json) {
            console.log(parsed_json);
            jsonObject = parsed_json;
            console.log("JSON Loaded");
        }
    });
}

function showEmployeePage() {
    hideAllPages();
    $("#employeePage").show();

    //set the colors
    $("#appBarEmployeeBox").attr("style", "background-color: var(--selectRed);");
    $("#appBarScheduleBox").attr("style", "background-color: var(--jimmyRed);");
    $("#appBarAccountBox").attr("style", "background-color: var(--jimmyRed);");
}

function showSchedulePage() {
    hideAllPages();
    $("#schedulePage").show();

    //set the colors
    $("#appBarEmployeeBox").attr("style", "background-color: var(--jimmyRed);");
    $("#appBarScheduleBox").attr("style", "background-color: var(--selectRed);");
    $("#appBarAccountBox").attr("style", "background-color: var(--jimmyRed);");
}

function showAccountPage() {
    hideAllPages();
    $("#accountPage").show();

    //set the colors
    $("#appBarEmployeeBox").attr("style", "background-color: var(--jimmyRed);");
    $("#appBarScheduleBox").attr("style", "background-color: var(--jimmyRed);");
    $("#appBarAccountBox").attr("style", "background-color: var(--selectRed);");
}

function showAddEmployeePage() {
    hideAllPages();
    $("#addEmployeePage").show();
}

function hideAllPages() {
    $("#schedulePage").hide();
    $("#employeePage").hide();
    $("#accountPage").hide();
    $("#addEmployeePage").hide();
}