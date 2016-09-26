package com.bo;

import com.dao.mysql.TCSL_DAO_HotelDetail_mysql;
import com.dao.oracle.TCSL_DAO_HotelDetail;
import com.dao.oracle.TCSL_DAO_MC_orl;
import com.dao.oracle.TCSL_DAO_ServerFacility;
import com.po.oracle.PHO_HT_HOTELITEM;
import com.po.oracle.PHO_MC_O2O;
import com.util.TCSL_UTIL_Common;
import com.vo.TCSL_VO_HotelDetail;
import com.vo.TCSL_VO_Result;
import com.vo.TCSL_VO_RoomInfo;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.io.File;
import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-22.
 */
@Repository
public class TCSL_BO_HotelDetail {
    @Resource
    TCSL_DAO_HotelDetail daoHotelDetail;
    @Resource
    TCSL_DAO_HotelDetail_mysql daoHotelDetailMysql;
    @Resource
    TCSL_UTIL_Common utilCommon;
    @Resource
    TCSL_DAO_MC_orl daoMc_orl; //查询商户信息
    @Resource
    TCSL_DAO_ServerFacility daoServerFacility;

    /**
     * 查询酒店列表
     * @param gcId
     * @return
     * @throws Exception
     */
    public TCSL_VO_Result queryHotelList(String gcId) throws Exception {
        TCSL_VO_Result result = new TCSL_VO_Result();
        List<TCSL_VO_HotelDetail> hotelList= daoHotelDetail.queryHotelList(gcId);
        //查询外景图片名称
        String savePath = utilCommon.getPropertyParam("upload-path.properties","upload.path");
        for (TCSL_VO_HotelDetail voHotelDetail: hotelList) {
            String shopName = voHotelDetail.getNAME(); //商户名称
            String folderPath = savePath+"/"+shopName+"/"+"outdoor_scene";
            //判断文件夹是否存在
            File df = new File(folderPath);
            if(!df.exists()){
                continue;
            }
            File[] files = df.listFiles();
            String fileName = "";
            for (int i = 0; i < files.length; i++){
                if(i == 0){
                    File f = files[i];
                    fileName = f.getName();
                    break;
                }
            }
            voHotelDetail.setHoteImg(fileName);
        }
        result.setContent(hotelList);
        result.setRet(0);
        return result;
    }

    /**
     * 查询酒店详情
     * @param mcId
     * @param startDate
     * @param endDate
     * @return
     * @throws Exception
     */
    public TCSL_VO_Result queryHotelDetail(String mcId,String startDate,String endDate) throws Exception {
        TCSL_VO_Result result = new TCSL_VO_Result();
        TCSL_VO_HotelDetail voHotelDetail = new TCSL_VO_HotelDetail(); //酒店信息
        PHO_MC_O2O mc = daoMc_orl.queryByMcId(mcId);
        String shopName = mc.getNAME();
        voHotelDetail.setNAME(shopName); //商户名称
        voHotelDetail.setADDRESS(mc.getADDRESS()); //商户地址
        voHotelDetail.setMCID(mc.getMCID()); //商户mcId
        voHotelDetail.setPhone(mc.getORDERTEL()); //联系电话
        List<TCSL_VO_RoomInfo> roomList = daoHotelDetailMysql.queryRoomListByTime(mcId,startDate,endDate);
        //获取房间图片名称
        for (TCSL_VO_RoomInfo room:roomList) {
            String roomName = room.getCNAME();
            String savePath = utilCommon.getPropertyParam("upload-path.properties","upload.path");
            String folderPath = savePath+"/"+shopName+"/"+roomName;
            String imgName = "";
            File file = new File(folderPath);
            if(file.exists()){
                File[] files = file.listFiles();
                for (int i=0; i<files.length; i++) {
                    imgName = (files[i].getName());
                }
            }
            room.setImgName(imgName);
        }
        voHotelDetail.setRoomInfoList(roomList);
        result.setRet(0);
        result.setContent(voHotelDetail);
        return result;
    }

    /**
     * 查询商户设施
     * @param mcId
     * @return
     */
    public TCSL_VO_Result queryFacility(String mcId) {
        TCSL_VO_Result result = new TCSL_VO_Result();
        TCSL_VO_HotelDetail voHotelDetail = new TCSL_VO_HotelDetail(); //酒店信息
        PHO_MC_O2O mc = daoMc_orl.queryByMcId(mcId);
        voHotelDetail.setNAME(mc.getNAME()); //商户名称
        voHotelDetail.setDESP(mc.getDESP()); //商户描述
        List<PHO_HT_HOTELITEM> roomList =
                daoServerFacility.queryRoomItems(mcId,"客房设施");
        List<PHO_HT_HOTELITEM> multipleList =
                daoServerFacility.queryRoomItems(mcId,"综合设施");
        List<PHO_HT_HOTELITEM> serverList =
                daoServerFacility.queryRoomItems(mcId,"服务项目");
        List<PHO_HT_HOTELITEM> toyList =
                daoServerFacility.queryRoomItems(mcId,"娱乐设施");
        voHotelDetail.setRoomList(roomList);
        voHotelDetail.setMultipleList(multipleList);
        voHotelDetail.setServerList(serverList);
        voHotelDetail.setToyList(toyList);
        result.setContent(voHotelDetail);
        result.setRet(0);
        return result;
    }

    public TCSL_VO_Result queryRoomList(String mcId) {
        TCSL_VO_Result result = new TCSL_VO_Result();
        List<TCSL_VO_RoomInfo> roomList = daoHotelDetailMysql.queryRoomListByMcId(mcId);
        result.setContent(roomList);
        result.setRet(0);
        return result;
    }
}
