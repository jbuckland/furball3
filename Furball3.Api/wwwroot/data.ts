import { Build, Ship, Upgrade, SlotType } from './app/core/models.js';
import { IMainData } from './main-presenter.js';
import * as $ from 'jquery';

export class Data implements IMainData {
    getBuildsToPrint(): JQueryXHR {
        let promise = $.get("/api/build/toPrint");
        return promise;
    }

    public getBuilds(): JQueryXHR {
        let promise = $.get("/api/build/all");
        return promise;
    }


}