package com.util;

import org.springframework.stereotype.Repository;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;

/**
 * Created by Zhangtuoyu on 2016-09-14.
 */
@Repository
public class TCSL_UTIL_Common {
    public String getPropertyParam(String propertyName,String paramName) throws Exception {
        Properties prop = new Properties();
        String path = TCSL_UTIL_Common.class.getResource("/").getPath()+propertyName;
        InputStream ins = new BufferedInputStream(new FileInputStream(path));
        prop.load(ins);
        String result = prop.getProperty(paramName).trim();
        return result;
    }
}
