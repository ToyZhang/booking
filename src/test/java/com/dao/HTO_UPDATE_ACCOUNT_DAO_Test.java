package com.dao;

import com.po.HTO_UPDATE_ACCOUNT;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-08.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml"})
public class HTO_UPDATE_ACCOUNT_DAO_Test {
    @Resource
    private HTO_UPDATE_ACCOUNT_DAO hto_update_account_dao;

    @Test
    public void queryAll() {
        List<HTO_UPDATE_ACCOUNT> books = hto_update_account_dao.queryAll();
        for (HTO_UPDATE_ACCOUNT book : books) {
            System.out.println(book.getCGUESTNAME());
        }
    }
}
