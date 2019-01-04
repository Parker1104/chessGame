export default class http {
    static singleInstance: http = null;
    static getInstance(): http {
        if (http.singleInstance == null) {
            http.singleInstance = new http();
        }
        return http.singleInstance;
    }

    httpGet(url_path:string, data:Object,cb:Function){
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;

        let send_path = url_path;
        let send_text = '?';
        for(let k in data){
            if(send_text !== '?'){
                send_text += '&';
            }
            send_text += k + '=' + data[k];
        }

        let url = send_path + send_text;
        console.log('get url = ' + url);
        xhr.onreadystatechange = function(){
            let rep = null;
            let err = 0;
            let msg = '';
            let data = null;

            //请求成功
            if(xhr.readyState === 4){
                //TODO 关闭loade界面
            }
            if(xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300){
                let json_str = xhr.responseText;
                console.log("rep json str:" + json_str);
                rep = JSON.parse(json_str);
                err = rep["status"];
                data = rep["data"];
                msg = rep["msg"];

                if(err != 200){
                    //TODO 提示错误信息
                }
                else{
                    cb(data);
                }
            }
            else if(xhr.readyState === 4){
                err = -1;
                msg = "网络不佳!!!";
                //TODO 提示信息添加

            }
            else{
                console.log("xhr.readyState = " +  xhr.readyState + " xhr.status = " + xhr.status);
            }
        }
        xhr.open("GET", url, true);
        if(cc.sys.isNative){
            xhr.setRequestHeader("Accept", "text/html");
            xhr.setRequestHeader("Accept-Charset", "utf-8");
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }
        xhr.send();
    }
    httpPost(url_path:string, data:any, cb:Function){
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;

        xhr.open("POST", url_path, true);
        if(cc.sys.isNative){
            xhr.setRequestHeader("Accept", "text/html");
            xhr.setRequestHeader("Accept-Charset", "utf-8");
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }
        if(data){
            xhr.setRequestHeader("Content-Type", "application/json");
            // xhr.setRequestHeader("Content-Length", data.length);
        }

        console.log("url:" + url_path);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)){
                let rep = null;
                let err = 0;
                let msg = '';
                let data = null;
                try{
                    let json_str = xhr.responseText;
                    console.log("rep json str:" + json_str);
                    rep = JSON.parse(json_str);
                    err = rep["status"];
                    data = rep["data"];
                    msg = rep["msg"];
                    if(err != 200){
                        //TODO 提示错误
                        console.log("提示错误信息!!!");
                    }
                    else{
                        if(cb !== null){
                            cb(data)
                        }
                    }
                    
                    return;
                } catch(e){
                    console.log("未知错误!!!");
                }
            }
            else{
                console.log(xhr.readyState + ":" + xhr.status)
            }
        };
        
        if(data){
            xhr.send(data);
        }
    }
}