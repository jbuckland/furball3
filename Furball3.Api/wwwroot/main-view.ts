import * as $ from 'jquery';
import { Data } from './data.js';
import { IMainView, MainPresenter } from './main-presenter.js';
import { Build, Upgrade,Ship } from './app/core/models.js';

class MainView implements IMainView {

    private data: Data;
    private presenter: MainPresenter;

    private IMG_DIR: string = "./img/";

    constructor() {
        this.data = new Data();
    }

    public init() {

        this.presenter = new MainPresenter(this, new Data())

        this.presenter.DisplayAllBuilds();
    }

    public addBuild(build: Build) {
        let listRowTemplate = $("#template_list_row").children().clone();
        let pilotTemplate = $("#template_pilot").children().clone();

        //this.addPilot(pilotTemplate, build.ChosenShip.PilotName);
        var pilot;
        if (build.chosenShip.imagePath != null) {
            var fileName = this.IMG_DIR + build.chosenShip.imagePath
            pilot = $("<img class='pilotCard' />");
            pilot.prop("src", fileName);
        } else {
            pilot = $("<div class='pilotCard text' />");
            pilot.text(build.chosenShip.pilotName);
        }
        pilotTemplate.find(".pilotCardContainer").append(pilot);


        if (build.upgrades != null) {
            for (let upgrade of build.upgrades) {
                this.addUpgrade(pilotTemplate, upgrade);
            }
        }


        listRowTemplate.append(pilotTemplate);
        $("body").append(listRowTemplate);

    }

    private addPilot(template, ship: Ship) {
        var pilotElement;
        if (ship.imagePath != null) {
            var fileName = this.IMG_DIR + ship.imagePath;
            pilotElement = $("<img class='pilotCard' />");
            pilotElement.prop("src", fileName);
        } else {
            pilotElement = $("<div class='pilotCard text' />");
            pilotElement.text(ship.pilotName);
        }
        template.find(".pilotCardContainer").append(pilotElement);
    }
    private addUpgrade(template, upgrade: Upgrade) {
        var upgradeElement;
        if (upgrade.imagePath != null) {
            var fileName = this.IMG_DIR + upgrade.imagePath;
            upgradeElement = $("<img class='upgradeCard' />");
            upgradeElement.prop("src", fileName);
        } else {
            upgradeElement = $("<div class='upgradeCard text' />");
            upgradeElement.text(upgrade.name);
        }
        template.find(".upgradeContainer").append(upgradeElement);
    }

}


var main = new MainView();
main.init();