import ProtoMan from './ProtoMan'
export default class WSManager {
    static instance:WSManager = null;
    static getInstance():WSManager{
        if(WSManager.instance === null){
            WSManager.instance = new WSManager();
        }
        return WSManager.instance;
    }

    sock:WebSocket = null;
    serivcesHandler:Object = null;
    protoType:number = 0;
    isConnected:boolean = false;
    // 心跳包id
    heartBeatId:number = null;
    // 心跳检测的间隔时间
    heartBeatTime:number = 10;
    // 心跳检测的未连接的次数
    heartBeatNum:number = 0;
    // 是否已经开启了心跳检测
    isStartHeartBeat:boolean = false;
    // 缓存发送数据
    cacheSendCmd:any[] = [];

    _OnOpen(event){
        console.log("ws connect server success");
        this.isConnected = true;
        if(this.cacheSendCmd.length > 0){
            let cache = this.cacheSendCmd.shift();
            // this.sendCmd(cache[0], cache[1], cache[2]);
            this.cacheSendCmd = [];
        }

        this.sendCmd("hello");
    }

    // 开启心跳
    _StartCheckHeartBeat(){

    }

    // 停止心跳检测
    _StopCheckHeartBeat(){
        clearInterval(this.heartBeatId);
        this.heartBeatId = null;
    }

    _OnRecvData(event){
        let strOrBuf = event.data;
        console.log(strOrBuf);
        return;

        if(!this.serivcesHandler){
            return;
        }

        let cmd = ProtoMan.decodeCmd(this.protoType, strOrBuf);
        if(!cmd){
            return;
        }

        let stype = cmd[0];
        let ctype = cmd[1];

        if(stype === 2 && ctype === 4){
            //心跳
            console.log("收到心跳处理");
            this._StartCheckHeartBeat();
        }

        if(this.serivcesHandler[stype]){
            this.serivcesHandler[stype](cmd[0], cmd[1], cmd[2]);
        }
    }

    _OnScoektClose(event){
        if(this.sock){
            this.close();
        }
    }

    _onSocketErr(event){
        this.close();
    }

    connect(url, protoType){
        this.sock = new WebSocket(url);
        this.sock.binaryType = "arraybuffer";

        this.sock.onopen = this._OnOpen.bind(this);
        this.sock.onmessage = this._OnRecvData.bind(this);
        this.sock.onclose = this._OnScoektClose.bind(this);
        this.sock.onerror = this._onSocketErr.bind(this);

        this.protoType = protoType;
    }
    sendCmd(str:string){
        if(!this.sock || !this.isConnected){
            return;
        }
        console.log("str = " + str);
        this.sock.send(str);
    }
    // sendCmd(stype, ctype, body){
    //     if(!this.sock || this.isConnected){
    //         // 重新连接
    //         let cache = [];
    //         cache[0] = stype;
    //         cache[1] = ctype;
    //         cache[2] = body;
    //         this.cacheSendCmd.push(cache);
    //         this.connect("ws://127.0.0.1:6081/ws", 1);
    //         return;
    //     }
    //     console.log('stype:${stype}, ctype:${ctype}, body:${body}');
    //     let buf = ProtoMan.encodeCmd(this.protoType, stype, ctype, body);
    //     this.sock.send(buf);
    //     this._StartCheckHeartBeat();
    // }
    close(){
        this.isConnected = false;
        this._StopCheckHeartBeat();
        if(this.sock !== null){
            this.sock.close();
            this.sock = null;
        }
    }

    registerServiceHandler(handler){
        this.serivcesHandler = handler;
    }
}