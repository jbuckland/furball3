


var main = function () {
    for (var listIndex = 0; listIndex < buildLists.length; listIndex++) {
        var list = buildLists[listIndex];
        console.log(list.name)

        //is this a single build with multiple ships in it?
        //or multiple builds with a single ship each?

        if(list.description != null && list.description == "multiple"){

            var listRowTemplate = $("#template_list_row").children().clone();

            for (var j = 0; j < list.pilots.length; j++) {
                var pilot = list.pilots[j];
                var pilotTemplate = $("#template_pilot").children().clone();

                //add the pilot to the template
                addPilot(pilotTemplate, pilot.name);
                console.log("  " + pilot.ship + " - " + pilot.name);
                for (var upgradeKey in pilot.upgrades) {
                    var upgrades = pilot.upgrades[upgradeKey];
                    for (var k = 0; k < upgrades.length; k++) {
                        //add the upgrade to the template
                        addUpgrade(pilotTemplate, upgrades[k]);
                        console.log("    " + upgradeKey + ": " + upgrades[k]);
                    }
                }

                listRowTemplate.append(pilotTemplate);
            }

            $("body").append(listRowTemplate);
        }else{
            for (var j = 0; j < list.pilots.length; j++) {
                var listRowTemplate = $("#template_list_row").children().clone();

                var pilot = list.pilots[j];
                var pilotTemplate = $("#template_pilot").children().clone();

                //add the pilot to the template
                addPilot(pilotTemplate, pilot.name);
                console.log("  " + pilot.ship + " - " + pilot.name);
                for (var upgradeKey in pilot.upgrades) {
                    var upgrades = pilot.upgrades[upgradeKey];
                    for (var k = 0; k < upgrades.length; k++) {
                        //add the upgrade to the template
                        addUpgrade(pilotTemplate, upgrades[k]);
                        console.log("    " + upgradeKey + ": " + upgrades[k]);
                    }
                }

                listRowTemplate.append(pilotTemplate);
                $("body").append(listRowTemplate);
            }
        }
    }
}


function addPilot(template, pilotName) {
    var pilot;
    if (imageExists(pilotName)) {
        var fileName = getFileName(pilotName);
        pilot = $("<img class='pilotCard' />");
        pilot.prop("src", fileName);
    } else {
        pilot = $("<div class='pilotCard text' />");
        pilot.text(pilotName);
    }
    template.find(".pilotCardContainer").append(pilot);
}
function addUpgrade(template, upgradeName) {
    var upgrade;
    if (imageExists(upgradeName)) {
        var fileName = getFileName(upgradeName);
        upgrade = $("<img class='upgradeCard' />");
        upgrade.prop("src", fileName);
    } else {
        upgrade = $("<div class='upgradeCard text' />");
        upgrade.text(upgradeName);
    }
    template.find(".upgradeContainer").append(upgrade);
}

function getFileName(indexName) {
    var fileName = nameToFileMap[indexName];
    fileName = "./img/" + fileName;
    return fileName
}


function imageExists(index) {
    return nameToFileMap[index] != null && nameToFileMap[index].length > 0;
}
