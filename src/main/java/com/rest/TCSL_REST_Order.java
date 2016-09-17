package com.rest;

import com.vo.TCSL_VO_BookInfo;
import com.vo.TCSL_VO_Result;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by zhangtuoyu on 2016/9/17.
 */
@Controller
@RequestMapping("/order")
public class TCSL_REST_Order {
    @RequestMapping("/query")
    @ResponseBody
    public TCSL_VO_Result query(HttpServletRequest request, HttpServletResponse response){
        TCSL_VO_Result result = new TCSL_VO_Result();
        TCSL_VO_BookInfo bookInfo = new TCSL_VO_BookInfo();
        result.setContent(bookInfo);
        return result;
    }

}
