package com.bo;

import com.vo.TCSL_VO_Result;
import org.springframework.stereotype.Repository;

/**
 * Created by zhangtuoyu on 2016/9/15.
 */
@Repository
public class TCSL_BO_Login {
    public TCSL_VO_Result login(String shopId, String password){
        TCSL_VO_Result result = new TCSL_VO_Result();
        //调用dao层查询用户名密码是否正确
        //TODO
        result.setRet(0); //正确返回0 否则返回-1
        result.setContent("testZTY");
        System.out.println("登录,商户id  "+shopId+"-----"+"密码  "+password);
        return result;
    }
}
