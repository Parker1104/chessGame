export default class SocketContoller {
    srv_url:string = "";
    sockIo:any = null;
    isPinging:boolean = false;
    fnDisconnect:any = null;
    lastRecieveTime:number = 0;
    delayMS:number = 0;
    handlers:any = null;

    constructor(){
        this.handlers =  {};
    }

    addHandler(event:string, cb:Function){
        if(this.handlers[event]){
            console.log("event:" + event + " handler has been registered.");
            return;
        }

        let handler = function(data){
            console.log("event:" + event + "(" + typeof(data) + ")" + (data?data.toString():"null"));
            if(event != "disconnect" && typeof(data) == "string"){
                data = JSON.parse(data);
            }
            if(data["status"] == 0){
                cb(data);
            }
            else{
                console.log(event + "net err msg:" + data.msg);
            }
        };

        this.handlers[event] = handler;
        if(this.sockIo){
            this.sockIo.on(event, handler);
        }
    }

    connect(fnConnect, fnErr){
        let self = this;
        // this.sockIo = 
    }
}