package com.springboot.iamp.chessgameserver.service;


import com.springboot.iamp.chessgameserver.dto.user.*;

public interface IUserService {

    /**
     * @Method Name: loginRequest
     * @Description: TODO(用户注册请求)
     * @param inParam
     * @return OutParamLoginRespones
     */
    OutParamRegisterRespones register(InParamRegisterRequest inParam);

    /**
     * @Method Name: setProperties
     * @Description: TODO(用户设置人物基础属性)
     * @param inParam
     * @return OutParamSetPropertiesRespones
     */
    OutParamSetPropertiesRespones setProperties(InParamSetPropertiesRequest inParam);

    /**
     * @Method Name: loginRequest
     * @Description: TODO(用户登陆请求)
     * @param inParam
     * @return OutParamLoginRespones
     */
    OutParamLoginRespones login(InParamLoginRequest inParam);

}
