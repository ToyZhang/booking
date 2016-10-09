package com.bo;

import com.dao.mysql.TCSL_DAO_Book_mysql;
import com.dao.oracle.TCSL_DAO_Login;
import com.po.oracle.PHO_MC_O2O;
import com.util.TCSL_UTIL_Common;
import com.vo.TCSL_VO_OrderFormInfo;
import com.vo.TCSL_VO_Result;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.io.File;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-26.
 */
@Repository
public class TCSL_BO_Book {
    @Resource
    TCSL_DAO_Book_mysql daoBookMysql;
    @Resource
    TCSL_DAO_Login daoLogin;
    @Resource
    TCSL_UTIL_Common utilCommon;

    /**
     * 查询订单信息
     * @param mcId
     * @param startDate
     * @param endDate
     * @param roomTypeId
     * @return
     */
    public TCSL_VO_Result queryInfo(String mcId, String startDate, String endDate, String roomTypeId) throws Exception {
        TCSL_VO_Result result = new TCSL_VO_Result();
        TCSL_VO_OrderFormInfo voOrderFormInfo =
                daoBookMysql.queryRoomCount(roomTypeId,mcId,startDate,endDate);//提交订单信息
        PHO_MC_O2O mcO2O = daoLogin.queryByMcid(mcId);
        String name = mcO2O.getNAME(); //商户名称
        voOrderFormInfo.setShopName(name);
        String roomTypeName = voOrderFormInfo.getCNAME(); //房型名称
        String savePath = utilCommon.getPropertyParam("upload-path.properties","upload.path");
        String folderPath = savePath+"/"+name+"/"+roomTypeName;
        String imgName = "";
        //判断文件夹是否存在
        File df = new File(folderPath);
        if(df.exists()){
            File[] f = df.listFiles();
            if(f[0] != null){
                imgName = f[0].getName();
            }
        }
        voOrderFormInfo.setImgName(imgName);
        //计算入住时长
        startDate = startDate + " 00:00:00";
        Timestamp starTime = Timestamp.valueOf(startDate);
        endDate = endDate + " 00:00:00";
        Timestamp endTime = Timestamp.valueOf(endDate);
        long time = endTime.getTime() - starTime.getTime();
        long stayDay = (time / (1000 * 60 * 60 * 24));
        voOrderFormInfo.setDays(String.valueOf(stayDay));
        List<BigDecimal> priceList = daoBookMysql.queryPrice(roomTypeId,mcId,startDate,endDate);
        BigDecimal price = new BigDecimal(0);
        for (int i = 0; i< (priceList.size()-1); i++) {
            price = price.add(priceList.get(i));
        }
        price =   price.multiply(new BigDecimal(stayDay));
        voOrderFormInfo.setTotalPrice(price.toString());
        result.setRet(0);
        result.setContent(voOrderFormInfo);
        return result;
    }
}
