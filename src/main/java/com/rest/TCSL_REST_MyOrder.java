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

    @RequestMapping("/cancelOrder")
    @ResponseBody
    public TCSL_VO_Result cancelOrder(HttpServletRequest request, HttpServletResponse response){
        String id = request.getParameter("id");
        String mcId = request.getParameter("mcId");
        String roomTypeId = request.getParameter("roomTypeId");
        String count = request.getParameter("count");
        String endDate = request.getParameter("endDate");
        TCSL_VO_Result result = boMyOrder.cancelOrder(id,mcId,roomTypeId,count,endDate);
        return result;
    }
    @RequestMapping("/finishOrder")
    @ResponseBody
    public TCSL_VO_Result finishOrder(HttpServletRequest request, HttpServletResponse response){
        String id = request.getParameter("id");
        String mcId = request.getParameter("mcId");
        String roomTypeId = request.getParameter("roomTypeId");
        String count = request.getParameter("count");
        String endDate = request.getParameter("endDate");
        TCSL_VO_Result result = boMyOrder.finishOrder(id,mcId,roomTypeId,count,endDate);
        return result;
    }
}
