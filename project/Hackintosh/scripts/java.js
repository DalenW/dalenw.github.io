var data;

readData();

function readData() {
    console.log("Reading JSON file.");
    $.ajax({
        url: "guides.json",
        dataType: "json",
        success: function (parsed_json) {
            console.log("Found the JSON file.");
            console.log(parsed_json);
            data = parsed_json;
            createGuideList();
        }
    });
}

function createGuideList() {
    var html = "";

    for(var i = 0; i < data.guides.length; i++) {
        html += "<a href=\"" + data.guides[i].name + ".html\">";
        html += "<div class=\"guideListBox\">";
        html += "<img src=\"images/" + data.guides[i].image + ".png\" alt=\"" + data.guides[i].image + " Icon\" class=\"guideListBoxImage\">";
        html += "<div class=\"guideListBoxTitleBox\">";
        html += "<p class=\"guideListBoxTitle\">" + data.guides[i].name;
        html += "</p></div></div></a>";
    }
    $("#guideList").html(html);    
}