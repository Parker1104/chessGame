package com.chessgame.dal.dao;

import com.chessgame.dal.entity.UserEntity;
import com.chessgame.dal.entity.UserEntityExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface UserEntityDao {
    long countByExample(UserEntityExample example);

    int deleteByExample(UserEntityExample example);

    int insert(UserEntity record);

    int insertSelective(UserEntity record);

    List<UserEntity> selectByExample(UserEntityExample example);

    int updateByExampleSelective(@Param("record") UserEntity record, @Param("example") UserEntityExample example);

    int updateByExample(@Param("record") UserEntity record, @Param("example") UserEntityExample example);
}