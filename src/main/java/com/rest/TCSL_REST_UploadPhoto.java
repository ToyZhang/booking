package com.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Properties;

/**
 * Created by zhangtuoyu on 2016-09-12.
 */
@Controller
@RequestMapping("/uploadPhoto")
public class TCSL_REST_UploadPhoto {
    @RequestMapping("/addPhoto")
    @ResponseBody
    public void addPhoto(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //解析上传的图片
        int len = 0;
        MultipartResolver resolver = new CommonsMultipartResolver(request.getSession().getServletContext());
        MultipartHttpServletRequest re = resolver.resolveMultipart(request);
        MultipartFile fileM = re.getFile("file");
        String shopName = re.getParameter("shopName"); //商户名称
        String roomType = re.getParameter("roomType"); //房型名称
        String fileName = re.getParameter("name"); //图片名称
        CommonsMultipartFile cf = (CommonsMultipartFile) fileM;
        InputStream is = cf.getInputStream();
        //读取上传路径配置文件
        Properties prop = new Properties();
        String path = TCSL_REST_UploadPhoto.class.getResource("/").getPath() + "upload-path.properties";
        InputStream ins = new BufferedInputStream(new FileInputStream(path));
        prop.load(ins);
        String savePath = prop.getProperty("SAVE_PATH").trim();
        String folderPath = savePath+"/"+shopName+"/"+roomType;
        //判断文件夹是否存在
        File df = new File(folderPath);
        if(!df.exists()){
            df.mkdirs();
        }
        //判断文件是否存在
        String filePath = folderPath + "/" + fileName;
        File file = new File(filePath);
        if(file.exists()){
            file.delete();
        }
        file.createNewFile();
        FileOutputStream out = new FileOutputStream(filePath,true);
        while( (len = is.read()) != -1 ){
            out.write(len);
        }
        out.close();
        is.close();
    }
}
