package com.springboot.iamp.chessgameserver.dto.user;

public class OutParamLoginRespones {

    public String uuid                  = "";   // 用户唯一身份标示
    public String token                 = "";   // 用于用户登陆验证
    public String hallNetServerInfo     = "";   // 大厅网络信息
    public String loginStateCode        = "";   // 状态码

    public String getLoginStateCode() {
        return loginStateCode;
    }

    public void setLoginStateCode(String loginStateCode) {
        this.loginStateCode = loginStateCode;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getHallNetServerInfo() {
        return hallNetServerInfo;
    }

    public void setHallNetServerInfo(String hallNetServerInfo) {
        this.hallNetServerInfo = hallNetServerInfo;
    }
}
