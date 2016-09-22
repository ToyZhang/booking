package com.bo;

import com.dao.oracle.TCSL_DAO_HotelDetail;
import com.util.TCSL_UTIL_Common;
import com.vo.TCSL_VO_HotelDetail;
import com.vo.TCSL_VO_Result;
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
    TCSL_UTIL_Common utilCommon;

    /**
     * 查询酒店信息
     * @param gcId
     * @return
     * @throws Exception
     */
    public TCSL_VO_Result query(String gcId) throws Exception {
        TCSL_VO_Result result = new TCSL_VO_Result();
        List<TCSL_VO_HotelDetail> hotelList= daoHotelDetail.query(gcId);
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
}
