
// https://jsonblob.com/d064c276-456f-11e7-ae4c-2fa58361dbb6
var jsonID = "d064c276-456f-11e7-ae4c-2fa58361dbb6";
var jsonObject;
var scheduleData;

var pageIdList = ["#aboutPage", "#contactPage", "#loginPage", "#schedulePage", "#employeePage", "#storePage", "#accountPage", "#addEmployeePage"];
var barItemIdList = ["#guestBarAboutBox", "#guestBarContactBox", "#guestBarLoginBox", "#appBarScheduleBox", "#appBarEmployeeBox", "#appBarStoreBox", "#appBarAccountBox"]

$(document).ready(function() {
    console.log("Starting!");

    $("#appBar").hide();

    hideAllPages();
    $("body").show();
    //showGuestPage("aboutPage");
    showGuestPage("loginPage");
    loadJSON();
});

function loadJSON() {
    $.ajax({
        url: "https://jsonblob.com/api/jsonBlob/" + jsonID,
        dataType: "json",
        success: function (parsed_json) {
            console.log(parsed_json);
            jsonObject = parsed_json;
            console.log("JSON Loaded");
            login("sample");
        }
    });
}

function onLoginSubmit() {
    var loginValue = $("#loginBar").val();
    login(loginValue);

}

function login(username) {
    for(var i = 0; i < jsonObject.length; i++) 
        if(username === jsonObject[i].id) {
            scheduleData = jsonObject[i];
            //showAppPage("schedulePage");
            showAppPage("employeePage");
            return true;
        }
    return false;
}

function showPage(id, callId) {
    hideAllPages();
    $("#" + id).show();
    $("#" + callId).addClass("barItemSelected");

    if(id == "schedulePage") 
        loadSchedulePage();
    else if(id == "employeePage")
        loadEmployeePage();
}

function showGuestPage(id, callId) {
    showGuestBar();
    showPage(id, callId);
}

function showAppPage(id, callId) {
    showAppBar();
    showPage(id, callId);
}

function hideAllPages() {
    for(var i = 0; i < pageIdList.length; i++) {
        $(pageIdList[i]).hide();
        $(barItemIdList[i]).removeClass("barItemSelected");
    }
}

function showGuestBar() {
    $("#guestBar").show();
    $("#appBar").hide();
}

function showAppBar() {
    $("#guestBar").hide();
    $("#appBar").show();
}