package com.rest;

import com.dao.HTO_UPDATE_ACCOUNT_DAO;
import com.po.HTO_UPDATE_ACCOUNT;
//import com.vo.TCSL_VO_Result;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-08.
 */
@Controller
@RequestMapping("/test")
public class HelloWorld {
    @RequestMapping("/helloworld")
    @ResponseBody
    public String testHelloWorld(){
        return "testHelloWorld";
    }

    @Resource
    private HTO_UPDATE_ACCOUNT_DAO hto_update_account_dao;

//    @RequestMapping("/queryAll")
//    @ResponseBody
//    public JSONObject queryAll() {
//        List<HTO_UPDATE_ACCOUNT> accounts = hto_update_account_dao.queryAll();
////        for (HTO_UPDATE_ACCOUNT account : accounts) {
////            System.out.println(account.getCGUESTNAME());
////        }
//
//        TCSL_VO_Result result = new TCSL_VO_Result();
//        result.setRet(0);
//        result.setContent(accounts);
//        JSONObject object = JSONObject.fromObject(result);
//        return object;
//    }
}
