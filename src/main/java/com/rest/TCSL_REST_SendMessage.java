package com.rest;

import com.bo.TCSL_BO_SendMessage;
import com.vo.TCSL_VO_Result;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by zhangtuoyu on 2016-10-08.
 */
@Controller
@RequestMapping("/sendMessage")
public class TCSL_REST_SendMessage {
    @Resource
    TCSL_BO_SendMessage boSendMessage;
    /**
     * 发送欢迎语
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/sendWelcome")
    @ResponseBody
    public TCSL_VO_Result sendWelcome(HttpServletRequest request, HttpServletResponse response){
        String a = request.getParameter("a");
        String b = request.getParameter("b");
        System.out.println("a:"+a+","+"b:"+b);
        TCSL_VO_Result result = boSendMessage.sendWelcome();
        return result;
    }

    /**
     * 发送告别语
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/sendLeave")
    @ResponseBody
    public TCSL_VO_Result sendLeave(HttpServletRequest request, HttpServletResponse response){
        TCSL_VO_Result result = boSendMessage.sendLeave();
        return result;
    }
}
