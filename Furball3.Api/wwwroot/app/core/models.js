"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Record = (function () {
    function Record() {
    }
    return Record;
}());
exports.Record = Record;
var Ship = (function (_super) {
    __extends(Ship, _super);
    function Ship() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Ship;
}(Record));
exports.Ship = Ship;
var CardImage = (function () {
    function CardImage() {
    }
    return CardImage;
}());
exports.CardImage = CardImage;
var Upgrade = (function (_super) {
    __extends(Upgrade, _super);
    function Upgrade() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Upgrade;
}(Record));
exports.Upgrade = Upgrade;
var SlotType;
(function (SlotType) {
    SlotType[SlotType["Astromech"] = 1] = "Astromech";
    SlotType[SlotType["Bomb"] = 2] = "Bomb";
    SlotType[SlotType["Cannon"] = 3] = "Cannon";
    SlotType[SlotType["Crew"] = 4] = "Crew";
    SlotType[SlotType["ElitePilot"] = 5] = "ElitePilot";
    SlotType[SlotType["Illicit"] = 6] = "Illicit";
    SlotType[SlotType["Missile"] = 7] = "Missile";
    SlotType[SlotType["Modification"] = 8] = "Modification";
    SlotType[SlotType["SalvagedAstromech"] = 9] = "SalvagedAstromech";
    SlotType[SlotType["System"] = 10] = "System";
    SlotType[SlotType["Tech"] = 11] = "Tech";
    SlotType[SlotType["Title"] = 12] = "Title";
    SlotType[SlotType["Torpedo"] = 13] = "Torpedo";
    SlotType[SlotType["Turret"] = 14] = "Turret";
})(SlotType = exports.SlotType || (exports.SlotType = {}));
var Build = (function () {
    function Build() {
    }
    return Build;
}());
exports.Build = Build;
