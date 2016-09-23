package com.dao.mysql;

import com.vo.TCSL_VO_HotelDetail;
import com.vo.TCSL_VO_RoomInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-23.
 */
public interface TCSL_DAO_HotelDetail_mysql {
    TCSL_VO_HotelDetail queryDetail(
        @Param("MCID") String mcId
    );
    List<TCSL_VO_RoomInfo> queryRoomList(
        @Param("MCID") String mcId,
        @Param("STARTDATE") String startDate,
        @Param("ENDDATE") String endDate
    );
}
