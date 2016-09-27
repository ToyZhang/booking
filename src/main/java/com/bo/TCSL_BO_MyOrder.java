package com.bo;

import com.dao.mysql.TCSL_DAO_MyOrder;
import com.vo.TCSL_VO_MyOrder;
import com.vo.TCSL_VO_MyOrderInfo;
import com.vo.TCSL_VO_Result;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.security.MessageDigest;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;

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
        List<TCSL_VO_MyOrderInfo> noFinishList = daoMyOrder.query(mcId,dinerId,"1"); //未完成
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
    public TCSL_VO_Result cancelOrder(String id,String mcId,String roomTypeId,String count,String endDate,String startDate){
        TCSL_VO_Result result = new TCSL_VO_Result();
        daoMyOrder.changeOrderStatus(id,"3"); //取消订单
        startDate = startDate + " 00:00:00";
        endDate = endDate + " 00:00:00";
        Timestamp startTime = Timestamp.valueOf(startDate);
        Timestamp endTime = Timestamp.valueOf(endDate);
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        while (!startTime.equals(endTime)){
            String today = format.format(startTime.getTime());
            daoMyOrder.changeRoomCount(mcId,roomTypeId,count,today); //增加可预订数
            long time = startTime.getTime() + (1000 * 60 * 60 * 24);
            Timestamp tomorrow = new Timestamp(time);
            startTime = tomorrow;
        }
        result.setRet(0);
        return result;
    }
    public TCSL_VO_Result finishOrder(String id,String mcId,String roomTypeId,String count,String endDate,String startDate){
        TCSL_VO_Result result = new TCSL_VO_Result();
        daoMyOrder.changeOrderStatus(id,"2"); //完成订单
        startDate = startDate + " 00:00:00";
        endDate = endDate + " 00:00:00";
        Timestamp startTime = Timestamp.valueOf(startDate);
        Timestamp endTime = Timestamp.valueOf(endDate);
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        while (!startTime.equals(endTime)){
            String today = format.format(startTime.getTime());
            daoMyOrder.changeRoomCount(mcId,roomTypeId,count,today); //增加可预订数
            long time = startTime.getTime() + (1000 * 60 * 60 * 24);
            Timestamp tomorrow = new Timestamp(time);
            startTime = tomorrow;
        }
        result.setRet(0);
        return result;
    }

    public TCSL_VO_Result noFinishPay(String id,String mcId,String roomTypeId,String count,String endDate,String startDate){
        TCSL_VO_Result result = new TCSL_VO_Result();
        daoMyOrder.changeOrderStatus(id,"1"); //未完成支付订单
        startDate = startDate + " 00:00:00";
        endDate = endDate + " 00:00:00";
        Timestamp startTime = Timestamp.valueOf(startDate);
        Timestamp endTime = Timestamp.valueOf(endDate);
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        count = "-"+count;
        while (!startTime.equals(endTime)){
            String today = format.format(startTime.getTime());
            daoMyOrder.changeRoomCount(mcId,roomTypeId,count,today); //减少可预订数
            long time = startTime.getTime() + (1000 * 60 * 60 * 24);
            Timestamp tomorrow = new Timestamp(time);
            startTime = tomorrow;
        }
        result.setRet(0);
        return result;
    }

    public TCSL_VO_Result finishPay(String id){
        TCSL_VO_Result result = new TCSL_VO_Result();
        daoMyOrder.changeOrderStatus(id,"2"); //完成订单支付
        result.setRet(0);
        return result;
    }

    /**
     * 检查该房间是否可预订
     * @param mcId 商户id
     * @param roomTypeId 房型id
     * @param count 订房数量
     * @param endDate 离店时间
     * @param startDate 入住时间
     * @return
     */
    public TCSL_VO_Result checkOrder(String mcId, String roomTypeId, String count, String endDate, String startDate) {
        TCSL_VO_Result result = new TCSL_VO_Result();
        Integer num = daoMyOrder.checkOrder(mcId,roomTypeId,count,startDate,endDate);
        if(num == null){
            result.setRet(-1);
            return result;
        }
        Integer iCount = Integer.valueOf(count);
        if(num >= iCount){
            result.setRet(0);
        }else{
            result.setRet(-1);
        }
        SimpleDateFormat format = new SimpleDateFormat("YYYYMMddHHmmss");
        String strNow = format.format(new Date());
        Random r = new Random();
        String strRandom = String.valueOf(r.nextInt(1000)+1);
        String orderId = "WX-" + strNow + "-" + strRandom;
        result.setContent(orderId);
        return result;
    }

    /**
     * 添加订单记录
     * @param orderId
     * @param mcId
     * @param clinker
     * @param ilinktel
     * @param startDate
     * @param endDate
     * @param orderTime
     * @param dinerid
     * @param idcard
     * @param roomTypeId
     * @param count
     * @return
     */
    public TCSL_VO_Result addOrder(String orderId, String mcId, String clinker,
           String ilinktel, String startDate, String endDate, String orderTime, String dinerid, String idcard,
                                   String roomTypeId,String count) {
        TCSL_VO_Result result = new TCSL_VO_Result();
        daoMyOrder.addOrder(orderId,orderId,mcId,
                clinker,ilinktel,startDate,endDate,orderTime,"1",dinerid,idcard);
        result.setRet(0);
        return  result;
    }

    public TCSL_VO_Result createPayMd5(String mcId, String data) {
        TCSL_VO_Result result = new TCSL_VO_Result();
        String param = md5(mcId,"MD5");
        param = param + data;
        param = md5(param,"MD5");
        result.setRet(0);
        result.setContent(param);
        return  result;
    }
    private final char hexDigits[] = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd','e', 'f' };

    public String md5(String string, String chareset) {
        try {
            byte[] bytes = string.getBytes("UTF-8");
            MessageDigest messageDigest = MessageDigest.getInstance("MD5");
            messageDigest.update(bytes);
            byte[] updateBytes = messageDigest.digest();
            int len = updateBytes.length;
            char myChar[] = new char[len * 2];
            int k = 0;
            for (int i = 0; i < len; i++) {
                byte byte0 = updateBytes[i];
                myChar[k++] = hexDigits[byte0 >>> 4 & 0x0f];
                myChar[k++] = hexDigits[byte0 & 0x0f];
            }
            return new String(myChar);
        } catch (Exception e) {

        }
        return "";
    }
}
