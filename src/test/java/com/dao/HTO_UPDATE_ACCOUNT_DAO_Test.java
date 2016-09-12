package com.dao;

import com.po.HTO_UPDATE_ACCOUNT;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
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
    @Test
    public void testStream() throws Exception {
        File sf = new File("C:\\Users\\Administrator\\Desktop\\yilianmengbi\\yilianmenbi\\123.jpg");
        File df = new File("C:\\Users\\Administrator\\Desktop\\yilianmengbi\\yilianmenbi\\test.jpg");
        byte[] buf = new byte[1024];
        int len = 0;
        FileInputStream in = new FileInputStream(sf);
        FileOutputStream out = new FileOutputStream(df,true);
        while( (len = in.read(buf)) != -1 ){
            out.write(buf,0,len);
        }
        out.close();
    }
}
