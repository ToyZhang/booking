package com.bo;

import com.dao.mysql.TCSL_DAO_MyOrder;
import com.vo.TCSL_VO_MyOrder;
import com.vo.TCSL_VO_MyOrderInfo;
import com.vo.TCSL_VO_Result;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-22.
 */
@Repository
public class TCSL_BO_MyOrder {
    @Resource
    TCSL_DAO_MyOrder daoMyOrder;

    public TCSL_VO_Result query(String mcId,String dinerId){
        TCSL_VO_Result result = new TCSL_VO_Result();
        TCSL_VO_MyOrder myorder = new TCSL_VO_MyOrder();
        List<TCSL_VO_MyOrderInfo> noFinishList = daoMyOrder.query(mcId,dinerId,"0"); //未完成
        for (TCSL_VO_MyOrderInfo voMyOrderInfo:noFinishList) {
            //计算房费
            Integer count = voMyOrderInfo.getICOUNT();
            BigDecimal price = voMyOrderInfo.getMPRICE();
            BigDecimal money = price.multiply(new BigDecimal(count));
            voMyOrderInfo.setMoney(money);
            //计算住房天数
            SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-DD");
            String startDate = voMyOrderInfo.getDTBEGDATE();
            startDate = startDate + " 00:00:00";
            Timestamp starTime = Timestamp.valueOf(startDate);
            String endDate = voMyOrderInfo.getDTENDDATE();
            endDate = endDate + " 00:00:00";
            Timestamp endTime = Timestamp.valueOf(endDate);
            long time = endTime.getTime() - starTime.getTime();
            long stayDay = (time / (1000 * 60 * 60 * 24));
            voMyOrderInfo.setStayDays(Math.round(stayDay));
        }
        List<TCSL_VO_MyOrderInfo> finishList = daoMyOrder.query(mcId,dinerId,"2"); //已完成
        for (TCSL_VO_MyOrderInfo voMyOrderInfo:finishList) {
            //计算房费
            Integer count = voMyOrderInfo.getICOUNT();
            BigDecimal price = voMyOrderInfo.getMPRICE();
            BigDecimal money = price.multiply(new BigDecimal(count));
            voMyOrderInfo.setMoney(money);
            //计算住房天数
            SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-DD");
            String startDate = voMyOrderInfo.getDTBEGDATE();
            startDate = startDate + " 00:00:00";
            Timestamp starTime = Timestamp.valueOf(startDate);
            String endDate = voMyOrderInfo.getDTENDDATE();
            endDate = endDate + " 00:00:00";
            Timestamp endTime = Timestamp.valueOf(endDate);
            long time = endTime.getTime() - starTime.getTime();
            long stayDay = (time / (1000 * 60 * 60 * 24));
            voMyOrderInfo.setStayDays(Math.round(stayDay));
        }
        List<TCSL_VO_MyOrderInfo> cancelList = daoMyOrder.query(mcId,dinerId,"3"); //取消
        for (TCSL_VO_MyOrderInfo voMyOrderInfo:cancelList) {
            //计算房费
            Integer count = voMyOrderInfo.getICOUNT();
            BigDecimal price = voMyOrderInfo.getMPRICE();
            BigDecimal money = price.multiply(new BigDecimal(count));
            voMyOrderInfo.setMoney(money);
            //计算住房天数
            SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-DD");
            String startDate = voMyOrderInfo.getDTBEGDATE();
            startDate = startDate + " 00:00:00";
            Timestamp starTime = Timestamp.valueOf(startDate);
            String endDate = voMyOrderInfo.getDTENDDATE();
            endDate = endDate + " 00:00:00";
            Timestamp endTime = Timestamp.valueOf(endDate);
            long time = endTime.getTime() - starTime.getTime();
            long stayDay = (time / (1000 * 60 * 60 * 24));
            voMyOrderInfo.setStayDays(Math.round(stayDay));
        }
        myorder.setNoFinishList(noFinishList);
        myorder.setFinishList(finishList);
        myorder.setCancelList(cancelList);
        result.setContent(myorder);
        result.setRet(0);
        return result;
    }
}
