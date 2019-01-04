window["bb"] = {};
 
// public String LOGINSTATECODE_NORMAL     = "1000";   // 正常
// public String LOGINSTATECODE_NOREGISTER = "1001";   // 未注册状态


import SceneCtrl from './view/base/SceneCtrl'
(window["bb"] as any).SceneCtrl = SceneCtrl;

import SceneComponent from './view/base/SceneComponent'
(window["bb"] as any).SceneComponent = SceneComponent;



// import BaseComponent from './view/base/BaseComponent';
// (window["bb"] as any).BaseComponent = BaseComponent;

// import ViewCtrl from './view/base/ViewCtrl'
// (window["bb"] as any).ViewCtrl = ViewCtrl;

// import UILoader from './loader/UILoader';
// (window["bb"] as any).UILoader = UILoader.getInstance();

// import ViewManager from './view/ViewManager';
// (window["bb"] as any).ViewManager = ViewManager.getInstance();