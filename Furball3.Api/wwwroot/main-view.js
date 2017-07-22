"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var data_js_1 = require("./data.js");
var main_presenter_js_1 = require("./main-presenter.js");
var MainView = (function () {
    function MainView() {
        this.IMG_DIR = "./img/";
        this.data = new data_js_1.Data();
    }
    MainView.prototype.init = function () {
        this.presenter = new main_presenter_js_1.MainPresenter(this, new data_js_1.Data());
        this.presenter.DisplayAllBuilds();
    };
    MainView.prototype.addBuild = function (build) {
        var listRowTemplate = $("#template_list_row").children().clone();
        var pilotTemplate = $("#template_pilot").children().clone();
        //this.addPilot(pilotTemplate, build.ChosenShip.PilotName);
        var pilot;
        if (build.chosenShip.imagePath != null) {
            var fileName = this.IMG_DIR + build.chosenShip.imagePath;
            pilot = $("<img class='pilotCard' />");
            pilot.prop("src", fileName);
        }
        else {
            pilot = $("<div class='pilotCard text' />");
            pilot.text(build.chosenShip.pilotName);
        }
        pilotTemplate.find(".pilotCardContainer").append(pilot);
        if (build.upgrades != null) {
            for (var _i = 0, _a = build.upgrades; _i < _a.length; _i++) {
                var upgrade = _a[_i];
                this.addUpgrade(pilotTemplate, upgrade);
            }
        }
        listRowTemplate.append(pilotTemplate);
        $("body").append(listRowTemplate);
    };
    MainView.prototype.addPilot = function (template, ship) {
        var pilotElement;
        if (ship.imagePath != null) {
            var fileName = this.IMG_DIR + ship.imagePath;
            pilotElement = $("<img class='pilotCard' />");
            pilotElement.prop("src", fileName);
        }
        else {
            pilotElement = $("<div class='pilotCard text' />");
            pilotElement.text(ship.pilotName);
        }
        template.find(".pilotCardContainer").append(pilotElement);
    };
    MainView.prototype.addUpgrade = function (template, upgrade) {
        var upgradeElement;
        if (upgrade.imagePath != null) {
            var fileName = this.IMG_DIR + upgrade.imagePath;
            upgradeElement = $("<img class='upgradeCard' />");
            upgradeElement.prop("src", fileName);
        }
        else {
            upgradeElement = $("<div class='upgradeCard text' />");
            upgradeElement.text(upgrade.name);
        }
        template.find(".upgradeContainer").append(upgradeElement);
    };
    return MainView;
}());
var main = new MainView();
main.init();
