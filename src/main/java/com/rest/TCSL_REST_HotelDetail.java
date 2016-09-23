package com.rest;

import com.bo.TCSL_BO_HotelDetail;
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
@RequestMapping("/hotelDetail")
public class TCSL_REST_HotelDetail {
    @Resource
    TCSL_BO_HotelDetail boHotelDetail;
    @RequestMapping("/queryHotelList")
    @ResponseBody
    public TCSL_VO_Result queryHotelList(HttpServletRequest request,HttpServletResponse response) throws Exception {
        String gcId = request.getParameter("gcId");
        TCSL_VO_Result result = boHotelDetail.queryHotelList(gcId);
        return result;
    }
    @RequestMapping("/queryHotelDetail")
    @ResponseBody
    public TCSL_VO_Result queryHotelDetail(HttpServletRequest request,HttpServletResponse response) throws Exception {
        String mcId = request.getParameter("mcId");
        String startDate = request.getParameter("startDate");
        String endDate = request.getParameter("endDate");
        TCSL_VO_Result result = boHotelDetail.queryHotelDetail(mcId,startDate,endDate);
        return result;
    }
}
