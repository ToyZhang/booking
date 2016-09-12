package com.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

/**
 * Created by zhangtuoyu on 2016-09-12.
 */
@Controller
@RequestMapping("/uploadPhoto")
public class TCSL_REST_UploadPhoto {
    @RequestMapping("/addPhoto")
    @ResponseBody
    public Integer addPhoto(/*@RequestParam(value = "file", required = false) MultipartFile file,*/
                            HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("进入接口");
        //1
//        InputStream is =  request.getInputStream();
//        String path = request.getSession().getServletContext().getRealPath("/wechatbooking/images/upload/123.jpg");
//        FileOutputStream fos = new FileOutputStream(path);
//        byte[] uploadImg = new byte[6 * 1024 * 1024];
//        while((is.read(uploadImg)) != -1){
//            fos.write(uploadImg);
//        }
//        is.close();
//        fos.close();
        //2 文件创建出来了 但是不能打开 因为不只有文件内容还有头
        int len = 0;
        InputStream is =  request.getInputStream();
//        FileInputStream in = new FileInputStream(String.valueOf(is));
        String path = "C:\\Users\\zhangtuoyu\\Desktop\\test\\test.png";
        File df = new File(path);
        FileOutputStream out = new FileOutputStream(df,true);
        while( (len = is.read()) != -1 ){
            out.write(len);
        }
        System.out.println("文件传输完毕");
        out.close();
        is.close();
        //3
//        String path ="C:\\Users\\Administrator\\Desktop\\yilianmengbi\\yilianmenbi\\";
//        String fileName = "test.jpg";//file.getOriginalFilename();
//        File baseFile = new File(path);
//        File targetFile = new File(baseFile, fileName);
//        long size=0;
//        //保存
//        try {
//            file.transferTo(targetFile);
//            size  = file.getSize();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        System.out.println(path+fileName);
        return 1;
    }

}
