package com.springboot.iamp.chessgameserver.common;

import java.io.Serializable;

/**
 * @ClassName: ReturnType
 * @Description: TODO(统一格式返回)
 * @Auther: Parker
 * @Date: 2018.12.29
 * @Version: 1.0
 */

public class ReturnType<T> implements Serializable {

    private static final long SerialVersionUID = 1;

    private static final int OK     = 0;
    private static final int FAIL   = 1;

    private T data;             // 服务端数据
    private int status = OK;    // 状态码
    private String msg = "";    // 描述信息

    public static ReturnType isOk(){
        return new ReturnType();
    }

    public ReturnType data(T data){
        this.setData(data);
        return this;
    }

    public Object getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public int getStatus(){
        return status;
    }

    public void setStatus(int status){
        this.status = status;
    }

}
