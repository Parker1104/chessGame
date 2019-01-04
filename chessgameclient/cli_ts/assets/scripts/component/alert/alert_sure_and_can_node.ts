let Alert = {
    _alert: null,           // prefab
    _detailLabel:   null,   // 内容
    _cancelButton:  null,   // 确定按钮
    _enterButton:   null,   // 取消按钮
    _enterCallBack: null,   // 回调事件
    _animSpeed:     0.3,    // 动画速度
    _sprite:        null,   //人物
};

const {ccclass, property} = cc._decorator;

@ccclass
export default class alert_sure_and_can_node extends cc.Component {

    onFadeOutFinish(){

    }
    static show(detailString:string, enterCallBack:Function, needCancel:boolean, animSpeed:number){
        let self = this;
        if(Alert._alert != undefined) return;

        Alert._animSpeed = animSpeed?animSpeed:Alert._animSpeed;



        cc.loader.loadRes('prefabs/alert/alert_sure_and_can_node', cc.Prefab, function(err, prefab){
            if(err){
                return;
            }

            let alert = cc.instantiate(prefab);
            Alert._alert = alert;

            let configAlert = function (detailString, enterCallBack, needCancel, animSpeed) {
        
                // 回调
                Alert._enterCallBack = enterCallBack;
        
                // 内容
                Alert._detailLabel.string = detailString;
                // 是否需要取消按钮
                if (needCancel || needCancel == undefined) { // 显示
                    Alert._cancelButton.active = true;
                } else {  // 隐藏
                    Alert._cancelButton.active = false;
                    Alert._enterButton.x = 0;
                }
            };

            let onDestory = function(){
                Alert._alert.destroy();
                Alert._enterCallBack = null;
                Alert._alert = null;
                Alert._detailLabel = null;
                Alert._cancelButton = null;
                Alert._enterButton = null;
                Alert._animSpeed = 0.3;
                Alert._sprite = null;
            }

            // 弹出动画完成回调
            let onFadeOutFinish = function () {
                onDestory();
            };

            // 弹进动画完成回调
            let onFadeInFinish = function () {
                // cc.eventManager.resumeTarget(Alert._alert, true);
            };

            // 动画 
            var cbFadeOut = cc.callFunc(onFadeOutFinish, self);
            var cbFadeIn = cc.callFunc(onFadeInFinish, self);
            let actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(Alert._animSpeed, 255), cc.scaleTo(Alert._animSpeed, 1.0)), cbFadeIn);
            let actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(Alert._animSpeed, 0), cc.scaleTo(Alert._animSpeed, 2.0)), cbFadeOut);

            // 执行弹进动画
            let startFadeIn = function () {
                // cc.eventManager.pauseTarget(Alert._alert, true);
                Alert._alert.position = cc.p(0, 0);
                Alert._alert.setScale(2);
                Alert._alert.opacity = 0;
                Alert._alert.runAction(actionFadeIn);
            };
            
             // 执行弹出动画
             let startFadeOut = function () {
                // cc.eventManager.pauseTarget(Alert._alert, true);
                Alert._alert.runAction(actionFadeOut);
            };

            // 按钮点击事件
            let onButtonClicked = function(event){
                if(event.target.name == "enterButton"){
                    console.log("确认按钮");
                    // if(self._enterCallBack){
                    //     self._enterCallBack();
                    // }
                    if(Alert._enterCallBack){
                        Alert._enterCallBack();
                    }
                }else{
                    console.log("取消按钮");
                }
                startFadeOut();
            };
            

            Alert._detailLabel = cc.find("bg/content_label", alert).getComponent(cc.Label);
            Alert._cancelButton = cc.find("bg/can_btn", alert);
            Alert._enterButton = cc.find("bg/sure_btn", alert);
            Alert._sprite = cc.find("bg/sprite", alert).getComponent(cc.Sprite);

            if (Alert._sprite.spriteFrame) {
                console.log("Alert._sprite");
            }else{
                console.log("找不到");
            }

            // 添加点击事件
            Alert._enterButton.on('click', onButtonClicked);
            Alert._cancelButton.on('click', onButtonClicked);

            // 父视图
            Alert._alert.parent = cc.find("Canvas");

            startFadeIn();
            configAlert(detailString, enterCallBack, needCancel,animSpeed);
        });
    }

    

    
}
