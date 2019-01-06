export default class ProtoMan {
    static PROTO_JSON:number = 1;
    static PROTO_BUF:number = 2;

    // 加密
    static encrypeCmd(strBuf){
        return strBuf;
    }

    // 解密
    static decryptCmd(strBuf){
        return strBuf;
    }

    static encodeCmd(protoType, stype, ctype, body){
        let buf = null;
        
        return null;
    }

    static decodeCmd(protoType, strBuf){
        return null;
    }
}