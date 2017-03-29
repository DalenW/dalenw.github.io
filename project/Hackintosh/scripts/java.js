var data;

$("#guidePage").hide();

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

    for (var i = 0; i < data.guides.length; i++) {
        html += "<a href=\"javascript:loadGuide(" + i + ")\">";
        html += "<div class=\"guideListBox\">";
        html += "<img src=\"images/" + data.guides[i].folder + "/" + data.guides[i].image + ".png\" alt=\"" + data.guides[i].image + " Icon\" class=\"guideListBoxImage\">";
        html += "<div class=\"guideListBoxTitleBox\">";
        html += "<p class=\"guideListBoxTitle\">" + data.guides[i].name;
        html += "</p></div></div></a>";
    }
    $("#guideList").html(html);
}

function loadGuide(guideNum) {
    console.log("Loading guide " + guideNum);
    var guide = data.guides[guideNum];

    $("#guideTitle").html(guide.name);

    var guideHTML = "";

    //parse guide
    var lastLine = "";
    for (var i = 0; i < guide.guide.length; i++) {
        var line = guide.guide[i];

        if (line.substring(0, 1) == "/") {
            var type = line.substring(1, 2);
            var content = line.substring(3);

            //if its code
            if (type == "c")
                guideHTML += "<div class=\"code\">" + content + "</div>";

            //if its an image
            if (type == "i")
                guideHTML += "<div class=\"guideImageDiv\"><img src=\"images/" + guide.folder + "/" + content + "\" class=\"guideImage\"></div>";

            //if its a section header
            if (type == "s")
                guideHTML += "<h6>" + content + "</h6>";

            //if its an ordered list 
            //beginning of the list
            if(type == "o" && lastLine.substring(0, 2) != "/o")
                guideHTML += "<ol><li>" + content + "</li></ol>";
            //other list item
            else if(type == "o"){
                //remove the </ol>
                guideHTML = guideHTML.substring(0, guideHTML.length - 5);
                
                guideHTML += "<li>" + content + "</li></ol>";
            }

        } else {
            guideHTML += "<p>" + line + "</p>";
        }
        lastLine = line;
    }

    $("#guide").html(guideHTML);

    $("#homePage").fadeOut(250);
    $("#guidePage").fadeIn(250);
}

function showGuideList() {
    $("#guidePage").fadeOut(250);
    $("#homePage").fadeIn(250);
}