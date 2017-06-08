import { IRoutes } from './IRoutes';
import { Router } from "express";

class BuildViewData {
  PilotImgPath: string;
  UpgradeImgPathList: Array<string>;
}

export class IndexRoutes implements IRoutes {
  public createRouter(): Router {
    console.log("Creating IndexRoutes.");

    let router: Router;
    router = Router();

    router.get('/', function (req, res, next) {

      var viewDataObjecct: Array<BuildViewData> = new Array<BuildViewData>();

      var test1 = new BuildViewData();
      test1.PilotImgPath = './img/hortonsalm.png';
      test1.UpgradeImgPathList = new Array<string>();
      test1.UpgradeImgPathList.push('./img/bombloadout.png');
      test1.UpgradeImgPathList.push('./img/twinlaserturret.png');
      viewDataObjecct.push(test1);


      var test2 = new BuildViewData();
      test2.PilotImgPath = 'pilotPath';
      test2.PilotImgPath = './img/hortonsalm.png';
      test2.UpgradeImgPathList = new Array<string>();
      test2.UpgradeImgPathList.push('./img/bombloadout.png');
      test2.UpgradeImgPathList.push('./img/twinlaserturret.png');
      viewDataObjecct.push(test2);

      var test3 = new BuildViewData();
      test3.PilotImgPath = 'pilotPath';
      test3.PilotImgPath = './img/hortonsalm.png';
      test3.UpgradeImgPathList = new Array<string>();
      test3.UpgradeImgPathList.push('./img/bombloadout.png');
      test3.UpgradeImgPathList.push('./img/twinlaserturret.png');
      viewDataObjecct.push(test3);


      res.render('index', { data: viewDataObjecct });
    });

    return router;
  }
}