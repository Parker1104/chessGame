package com.springboot.iamp.chessgameserver.service.impl;

import com.chessgame.dal.dao.UserEntityDao;
import com.chessgame.dal.entity.UserEntity;
import com.chessgame.dal.entity.UserEntityExample;
import com.springboot.iamp.chessgameserver.common.Constants;
import com.springboot.iamp.chessgameserver.dto.user.*;
import com.springboot.iamp.chessgameserver.service.IUserService;
import org.apache.commons.codec.digest.DigestUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import java.util.List;


@Transactional
@Service
public class UserServiceImpl implements IUserService {
    private final static Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    protected UserEntityDao userEntityDao;

    @Override
    public OutParamRegisterRespones register(InParamRegisterRequest inParam) {
        OutParamRegisterRespones registerOutParam = new OutParamRegisterRespones();

        // 数据库校验，是否已存在
        UserEntityExample userEntityExample = new UserEntityExample();
        userEntityExample.createCriteria().andUseridEqualTo(inParam.getUserId());
        List<UserEntity> userList = userEntityDao.selectByExample(userEntityExample);
        if(null != userList && !CollectionUtils.isEmpty(userList)){
            logger.info("UserId:" + inParam.getUserId() + " ALREADY EXIST.");
            registerOutParam.setRegisterType(Constants.REGISTERSTATECODE_ALREADYEXIST);
            return registerOutParam;
        }

        // 将用户吗和密码进行加密
        String uuId     = DigestUtils.md5Hex(inParam.getUserId());
        String password = DigestUtils.md5Hex(inParam.getPassword());

        UserEntity user = new UserEntity();
        user.setUserid(inParam.getUserId());
        user.setPassword(password);
        user.setUuid(uuId);
        user.setQuestion(inParam.question);
        user.setAnswer(inParam.answer);
        userEntityDao.insert(user);         // 插入user表

        registerOutParam.setRegisterType(Constants.REGISTERSTATECODE_NORMAL);
        registerOutParam.setUuId(uuId);
        return registerOutParam;
    }

    @Override
    public OutParamSetPropertiesRespones setProperties(InParamSetPropertiesRequest inParam) {
        System.out.print("segisterRequest");
        OutParamSetPropertiesRespones setPropertiesOutParam = new OutParamSetPropertiesRespones();
        return setPropertiesOutParam;
    }

    @Override
    public OutParamLoginRespones login(InParamLoginRequest inParam) {
        System.out.print("loginRequest");
        OutParamLoginRespones loginOutParam = new OutParamLoginRespones();
        try {
            // userId md5加密 TODO 通过useid查uuid 待完成

            // step2 通过uuid查询userinfo表获取是否完成人物属性设置
            if (true) {
                loginOutParam.setLoginStateCode(Constants.LOGINSTATECODE_NORMAL);
            } else {
                loginOutParam.setLoginStateCode(Constants.LOGINSTATECODE_NOREGISTER);
            }

            // token TODO暂时为空
            loginOutParam.setToken("");

            // hallNetServerInfo json字符串封装
            JSONObject hallNetServerInfo = new JSONObject();
            hallNetServerInfo.put("serverIp","e38fec5c.ngrok.io");
            hallNetServerInfo.put("serverPort","");
            loginOutParam.setHallNetServerInfo(hallNetServerInfo.toString());

        }
        catch (JSONException e) {
            e.printStackTrace();
        }
        return loginOutParam;
    }

}
