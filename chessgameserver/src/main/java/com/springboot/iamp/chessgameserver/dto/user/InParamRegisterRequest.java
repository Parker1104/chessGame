package com.springboot.iamp.chessgameserver.dto.user;

public class InParamRegisterRequest {
    public String userId            = "";   // 用户名
    public String password          = "";   // 密码
    public String question          = "";   // 密保问题
    public String answer            = "";   // 密保回答
    public String identifyingCode   = "";   // 验证码
    public int gameCode;                    // 游戏编码


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

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getIdentifyingCode() {
        return identifyingCode;
    }

    public void setIdentifyingCode(String identifyingCode) {
        this.identifyingCode = identifyingCode;
    }

    public int getGameCode() {
        return gameCode;
    }

    public void setGameCode(int gameCode) {
        this.gameCode = gameCode;
    }
}
