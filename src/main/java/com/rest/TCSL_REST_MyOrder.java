package com.rest;

import com.bo.TCSL_BO_MyOrder;
import com.vo.TCSL_VO_Result;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by zhangtuoyu on 2016-09-22.
 */
@Controller
@RequestMapping("/myOrder")
public class TCSL_REST_MyOrder {
    @Resource
    TCSL_BO_MyOrder boMyOrder;

    @RequestMapping("/query")
    @ResponseBody
    public TCSL_VO_Result query(HttpServletRequest request, HttpServletResponse response){
        String mcId = request.getParameter("mcId");
        String dinerId = request.getParameter("dinerId");
        TCSL_VO_Result result = boMyOrder.query(mcId,dinerId);
        return result;
    }
}
