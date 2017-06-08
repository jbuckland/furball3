import { Build } from '../app/core/models.js';


export interface IMainView {
    addBuild(build: Build);
}

export interface IMainData {
    getBuilds(): Array<Build>;
    getBuilds_ViaApi(): JQueryXHR;
}

export class MainPresenter {

    private view: IMainView;
    private data: IMainData;
    constructor(view: IMainView, data: IMainData) {
        this.view = view;
        this.data = data;
    }

    public DisplayAllBuilds() {
        //let builds = this.data.getBuilds();
        let buildsPromise = this.data.getBuilds_ViaApi();
        buildsPromise.then((builds: Array<Build>, textStatus: string) => {
            for (let build of builds) {
                this.view.addBuild(build);
            }
        });



    }


}