export default class UserDataMgr{
    static instance:UserDataMgr = null;
    public static getInstance(){
        if(this.instance === null){
            this.instance = new UserDataMgr();
        }
        return this.instance;
    }
}