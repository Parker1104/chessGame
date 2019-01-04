package com.springbootiamp.chessgamesever.dto.user;

public class OutParamRegisterRespones {
    public String uuId              = "";   // 用户uuid
    public String registerType      = "";   // 注册返回类型

    public String getUuId() {
        return uuId;
    }

    public void setUuId(String uuId) {
        this.uuId = uuId;
    }

    public String getRegisterType() {
        return registerType;
    }

    public void setRegisterType(String registerType) {
        this.registerType = registerType;
    }
}
