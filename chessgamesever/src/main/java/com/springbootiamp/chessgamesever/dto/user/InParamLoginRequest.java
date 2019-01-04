package com.springbootiamp.chessgamesever.dto.user;

public class InParamLoginRequest {

    public String userId            = "";   // 用户名
    public String password          = "";   // 密码
    public String identifyingCode   = "";   // 验证码



    public int areaCode;                    // 区域编码

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getIdentifyingCode() {
        return identifyingCode;
    }

    public void setIdentifyingCode(String identifyingCode) {
        this.identifyingCode = identifyingCode;
    }

    public int getAreaCode() {
        return areaCode;
    }

    public void setAreaCode(int areaCode) {
        this.areaCode = areaCode;
    }
}
