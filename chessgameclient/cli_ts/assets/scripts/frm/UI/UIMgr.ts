import BaseUI from "./BaseUI";
import UILoader from "../loader/UILoader";

export default class UIMgr{
    static instance:UIMgr = null;
    static getInstance():UIMgr{
        if(UIMgr.instance == null){
            UIMgr.instance = new UIMgr();
        }
        return UIMgr.instance;
    }


    uiStack:cc.Node[] = null;
    constructor(){
        this.uiStack = [];
    }
    
    openUIPrefab(name:string, prefab:cc.Prefab, data:any){
        let node = cc.instantiate(prefab);
        if(name){
            node.name = name;
        }
        cc.director.getScene().addChild(node);

        this.uiStack.push(node);
        let key = cc.loader["_getReferenceKey"](prefab);
        UILoader.getInstance().retatinRes(key);
        UILoader.getInstance().retainNodeRes(node);
        return node;
    }

    openUI(prefabPath:string, data:any, cb){
        let self = this;
        UILoader.getInstance().loadRes(prefabPath, cc.Prefab, (prefab)=>{
            let node = self.openUIPrefab(prefab.name, prefab, data);
            if(cb != null){
                cb();
            }
        });
    }
}