package com.bo;

import com.vo.TCSL_VO_HotelInfo;
import org.springframework.stereotype.Repository;

/**
 * Created by zhangtuoyu on 2016/9/19.
 */
@Repository
public class TCSL_BO_HotelInfo {
    /**
     * 查询酒店信息
     * @param mcId
     * @return
     */
    public TCSL_VO_HotelInfo queryInfo(String mcId){
        TCSL_VO_HotelInfo voHotelInfo = new TCSL_VO_HotelInfo();
        voHotelInfo.setHotelName("万丽天津宾馆");
        voHotelInfo.setAddress("天津市河西区");
        voHotelInfo.setDescription("非常好");
        voHotelInfo.setPhoneNum("15900345728");
        //TODO
        System.out.println("调用dao层查询酒店信息内容"+mcId);
        return voHotelInfo;
    }

    /**
     * 保存酒店信息
     * @param mcId
     * @param hotelName
     * @param phoneNum
     * @param address
     * @param desp
     */
    public void saveInfo(String mcId, String hotelName, String phoneNum, String address, String desp) {
        System.out.println("mcId--"+mcId+"；hotelName--"+
                hotelName+"；phoneNum--"+phoneNum+"；address---"+address+"；desp---"+desp);
        //1.查询该酒店信息是否存在
        //2.存在 执行dao更新
        //3.不存在 执行dao添加
    }
}
