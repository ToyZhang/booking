package com.rest;

import com.dao.HTO_UPDATE_ACCOUNT_DAO;
import com.po.HTO_UPDATE_ACCOUNT;
import org.springframework.context.ApplicationContext;
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

    @RequestMapping("/queryAll")
    @ResponseBody
    public void queryAll() {
        List<HTO_UPDATE_ACCOUNT> books = hto_update_account_dao.queryAll();
        for (HTO_UPDATE_ACCOUNT book : books) {
            System.out.println(book.getCGUESTNAME());
        }
    }
}
