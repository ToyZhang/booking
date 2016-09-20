package com.bo;

import com.dao.oracle.TCSL_DAO_Login;
import com.po.oracle.PHO_MC_O2O;
import com.vo.TCSL_VO_HotelInfo;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

/**
 * Created by zhangtuoyu on 2016/9/19.
 */
@Repository
public class TCSL_BO_HotelInfo {
    @Resource
    TCSL_DAO_Login daoLogin;
    /**
     * 查询酒店信息
     * @param mcId
     * @return
     */
    public TCSL_VO_HotelInfo queryInfo(String mcId){
        TCSL_VO_HotelInfo voHotelInfo = new TCSL_VO_HotelInfo();
        PHO_MC_O2O mcInfo = daoLogin.queryByMcid(mcId);
        if(mcInfo == null){
            return voHotelInfo;
        }
        voHotelInfo.setHotelName(mcInfo.getNAME());
        voHotelInfo.setAddress(mcInfo.getADDRESS());
        voHotelInfo.setDescription(mcInfo.getDESP());
        voHotelInfo.setPhoneNum(mcInfo.getORDERTEL());
        return voHotelInfo;
    }

    /**
     * 更新酒店信息
     * @param mcId
     * @param hotelName
     * @param phoneNum
     * @param address
     * @param desp
     */
    public void saveInfo(String mcId, String hotelName, String phoneNum, String address, String desp) {
        daoLogin.updateMc(hotelName,phoneNum,address,desp,mcId);
    }
}
