package com.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;

/**
 * Created by zhangtuoyu on 2016-09-12.
 */
@Controller
@RequestMapping("/uploadPhoto")
public class TCSL_REST_UploadPhoto {
    @RequestMapping("/addPhoto")
    @ResponseBody
    public Integer addPhoto(@RequestParam(value = "file", required = false) MultipartFile file,
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
        //2
//        FileInputStream in = (FileInputStream)is;
//        File df = new File("C:\\Users\\Administrator\\Desktop\\yilianmengbi\\yilianmenbi\\test.jpg");
//        FileOutputStream out = new FileOutputStream(df,true);
//        while( (len = in.read(buf)) != -1 ){
//            out.write(buf,0,len);
//        }
//        System.out.println("文件传输完毕");
//        out.close();
//        in.close();
        //3
        String path ="C:\\Users\\Administrator\\Desktop\\yilianmengbi\\yilianmenbi\\";
        String fileName = "test.jpg";//file.getOriginalFilename();
        File baseFile = new File(path);
        File targetFile = new File(baseFile, fileName);
        long size=0;
        //保存
        try {
            file.transferTo(targetFile);
            size  = file.getSize();
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(path+fileName);
        return 1;
    }

}
