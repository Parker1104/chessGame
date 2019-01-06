package com.springboot.iamp.chessgameserver.controller;

import com.springboot.iamp.chessgameserver.common.ReturnType;
import com.springboot.iamp.chessgameserver.dto.user.*;
import com.springboot.iamp.chessgameserver.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userbehavior")
public class UserBehaviorController {

    @Autowired
    IUserService userService;



    /**
     * @Method Name: registerRequest
     * @Description: TODO(用户注册请求)
     * @param inParam
     * @return OutParamRegisterRespones
     */
    @PostMapping("/register")
    public ReturnType<OutParamRegisterRespones> registerRequest(@RequestBody InParamRegisterRequest inParam){
        OutParamRegisterRespones outParam = userService.register(inParam);
        return ReturnType.isOk().data(outParam);
    }

    /**
     * @Method Name: setPropertiesRequest
     * @Description: TODO(用户设置人物基础属性)
     * @param inParam
     * @return OutParamRegisterRespones
     */
    @PostMapping("/setproperties")
    public ReturnType<OutParamSetPropertiesRespones> setPropertiesRequest(@RequestBody InParamSetPropertiesRequest inParam){
        OutParamSetPropertiesRespones outParam = userService.setProperties(inParam);
        return ReturnType.isOk().data(outParam);
    }

    /**
     * @Method Name: loginRequest
     * @Description: TODO(用户登陆请求)
     * @param inParam
     * @return OutParamLoginRespones
     */
    @PostMapping(value = "/login",consumes = "application/json")
    public ReturnType<OutParamLoginRespones> loginRequest(@RequestBody InParamLoginRequest inParam){
        OutParamLoginRespones outParam = userService.login(inParam);
        return ReturnType.isOk().data(outParam);
    }



}
