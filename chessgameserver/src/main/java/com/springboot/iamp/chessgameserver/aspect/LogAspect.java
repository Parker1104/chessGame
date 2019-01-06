package com.springboot.iamp.chessgameserver.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

/**
 * <p>@Author: Parker</p>
 * <p>@ClassName: LogAspect</p>
 * <p>@Description: 日志切面</p>
 * <p>@Date: 2019/1/4 10:19</p>
 * <p>@Version: 1.0.0 </p>
 **/

@Component
@Aspect
public class LogAspect {

    private final static Logger log = LoggerFactory.getLogger(LogAspect.class);

    @Pointcut(value = "execution(public * com.springbootiamp.chessgameserver.controller..*.*(..))")
    private void doLog(){}

    // 调用前日志记录
    @Before("doLog()")
    public void doLogBefore(JoinPoint joinPoint){
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();

        // 记录下请求内容
        log.info("URL : " + request.getRequestURL().toString());
        log.info("HTTP_METHOD : " + request.getMethod());
        log.info("IP : " + request.getRemoteAddr());
        log.info("CLASS_METHOD : " + joinPoint.getSignature().getDeclaringTypeName() + "." + joinPoint.getSignature().getName());
        log.info("ARGS : " + Arrays.toString(joinPoint.getArgs()));
    }

    // 记录方法返回值
    @AfterReturning(returning = "object", pointcut = "doLog()")
    public void doLogAfterReturning(JoinPoint joinPoint, Object object){
        log.info("doLogAfterReturning");
    }

    // 抛异常后日志记录
    @AfterThrowing(throwing = "ex",pointcut = "doLog()")
    public void doLogAfterThrowing(JoinPoint joinPoint, Throwable ex){
        log.info("doLogAfterThrowing");
    }
}
