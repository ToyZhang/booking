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
    @RequestMapping("/query")
    @ResponseBody
    public TCSL_VO_Result query(HttpServletRequest request,HttpServletResponse response) throws Exception {
        String gcId = request.getParameter("gcId");
        TCSL_VO_Result result = boHotelDetail.query(gcId);
        return result;
    }
}
