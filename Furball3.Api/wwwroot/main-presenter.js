"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MainPresenter = (function () {
    function MainPresenter(view, data) {
        this.view = view;
        this.data = data;
    }
    MainPresenter.prototype.DisplayAllBuilds = function () {
        var _this = this;
        //let builds = this.data.getBuilds();
        var buildsPromise = this.data.getBuilds();
        buildsPromise.then(function (builds, textStatus) {
            for (var _i = 0, builds_1 = builds; _i < builds_1.length; _i++) {
                var build = builds_1[_i];
                _this.view.addBuild(build);
            }
        });
    };
    return MainPresenter;
}());
exports.MainPresenter = MainPresenter;
