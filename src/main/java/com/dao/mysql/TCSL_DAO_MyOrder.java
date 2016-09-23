package com.dao.mysql;

import com.vo.TCSL_VO_MyOrderInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-22.
 */
public interface TCSL_DAO_MyOrder {
    List<TCSL_VO_MyOrderInfo> query(
        @Param("MCID") String mcId,
        @Param("DINERID") String dinerId,
        @Param("STATEID") String stateId
    );
    void changeOrderStatus(
        @Param("ORDERID") String orderId,
        @Param("STATUS") String status
    );
    void changeRoomCount(
      @Param("MCID") String mcId,
      @Param("ROOMTYPEID") String roomId,
      @Param("ROOMNUM") String roomNum,
      @Param("ENDDATE") String endDate
    );
}