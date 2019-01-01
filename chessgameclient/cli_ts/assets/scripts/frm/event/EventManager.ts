interface IEvent {
    type:number,
    priority:number,
    class_id:string,
    cb:(data)=> void,
}

export default class EventManager {
    static instance:EventManager = null;
    static getInstance():EventManager {
        if(EventManager.instance == null){
            EventManager.instance = new EventManager();
        }
        return EventManager.instance;
    }

    eventCache:{[key:number]:Array<IEvent>} = null;

    constructor(){
        this.eventCache = {};
    }

    addEventListener(type:number, cb:any, class_id:string = "",priority:number = 0){
        if(!type || !cb){
            return;
        }

        let subCache:Array<IEvent> = this.eventCache[type] || [];
        let hasSame = false;
        for(let i=0; i<subCache.length; i++){
            if(subCache[i].cb === cb){
                hasSame = true;
                break;
            }
        }
        if(hasSame){
            return;
        }

        let iEvent:IEvent = {
            type:type,
            class_id:class_id,
            priority:priority,
            cb:cb,
        };

        if(priority > 0){
            let isPush = true;
            for(let i=subCache.length - 1; i>= 0;i--){
                if(subCache[i].priority > priority){
                    subCache.splice(i + 1, 0, iEvent);
                    isPush = false;
                    break;
                }
            }
            if(isPush){
                subCache.splice(0, 0, iEvent);
            }
        }
        else{
            subCache.push(iEvent);
        }
        this.eventCache[type] = subCache;
    }

    
}