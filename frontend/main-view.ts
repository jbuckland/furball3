import * as $ from 'jquery';
import { Data } from './data.js';
import { IMainView, MainPresenter } from './main-presenter.js';
import { Build } from '../app/core/models.js';

class MainView implements IMainView {

    private data: Data;
    private presenter: MainPresenter;

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
        if (this.imageExists(build.ChosenShip.PilotName)) {
            var fileName = this.getFileName(build.ChosenShip.PilotName);
            pilot = $("<img class='pilotCard' />");
            pilot.prop("src", fileName);
        } else {
            pilot = $("<div class='pilotCard text' />");
            pilot.text(build.ChosenShip.PilotName);
        }
        pilotTemplate.find(".pilotCardContainer").append(pilot);


        if (build.Upgrades != null) {
            for (let upgrade of build.Upgrades) {
                this.addUpgrade(pilotTemplate, upgrade.Name);
            }
        }


        listRowTemplate.append(pilotTemplate);
        $("body").append(listRowTemplate);

    }

    private addPilot(template, pilotName: string) {
        var pilot;
        if (this.imageExists(pilotName)) {
            var fileName = this.getFileName(pilotName);
            pilot = $("<img class='pilotCard' />");
            pilot.prop("src", fileName);
        } else {
            pilot = $("<div class='pilotCard text' />");
            pilot.text(pilotName);
        }
        template.find(".pilotCardContainer").append(pilot);
    }
    private addUpgrade(template, upgradeName: string) {
        var upgrade;
        if (this.imageExists(upgradeName)) {
            var fileName = this.getFileName(upgradeName);
            upgrade = $("<img class='upgradeCard' />");
            upgrade.prop("src", fileName);
        } else {
            upgrade = $("<div class='upgradeCard text' />");
            upgrade.text(upgradeName);
        }
        template.find(".upgradeContainer").append(upgrade);
    }

    private getFileName(indexName): string {
        var fileName = this.data.nameToFileMap[indexName];
        fileName = "./img/" + fileName;
        return fileName
    }


    private imageExists(index): boolean {
        return this.data.nameToFileMap[index] != null && this.data.nameToFileMap[index].length > 0;
    }



}


var main = new MainView();
main.init();