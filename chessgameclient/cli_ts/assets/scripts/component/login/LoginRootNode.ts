import http from "../../frm/net/http";
import WSManager from "../../frm/net/WSManager";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoginRootNode extends cc.Component {

    @property(cc.EditBox)
    acc_input:cc.EditBox = null;

    @property(cc.EditBox)
    pwd_input:cc.EditBox = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        // WSManager.instance.connect("http://fd73aa68.ngrok.io/ws", 1);
    }

    // update (dt) {}
    onBtnClick(event, customData){
        switch(customData){
            case 'login_btn':
                let acc_str = this.acc_input.string;
                let pwd_str = this.pwd_input.string;

                if(acc_str == null || acc_str == ""){
                    console.log("账号有误");
                    return;
                }

                if(pwd_str == null || pwd_str == ""){
                    console.log("密码有误");
                    return;
                }
                let req_data = {
                    userId:acc_str,
                    password:pwd_str,
                    identifyingCode:null,
                    areaCode:null,
                };

                http.getInstance().httpPost("http://a4c74ab5.ngrok.io/chessgame/userbehavior/login",JSON.stringify(req_data), (data)=>{
                    console.log(" login ret data:" + data);
                });

                break;
        }
    }
}
