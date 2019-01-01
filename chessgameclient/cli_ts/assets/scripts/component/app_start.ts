const {ccclass, property} = cc._decorator;

@ccclass
export default class app_start extends cc.Component {

    onLoad () {
        this.init();
    }

    init(){

    }
    start () {
        // 进入login场景
        cc.director.loadScene('login');
    }


    // update (dt) {}
}
