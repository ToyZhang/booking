package com.bo;

import com.util.TCSL_UTIL_Common;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by zhangtuoyu on 2016-09-14.
 */
@Repository
public class TCSL_BO_UploadPhoto {
    @Resource
    TCSL_UTIL_Common utilCommon;

    /**
     * 保存上传的图片
     * @param shopName
     * @param roomType
     * @param fileName
     * @param fileM
     * @throws Exception
     */
    public void addPhoto(String shopName,String roomType,String fileName,MultipartFile fileM) throws Exception {
        int len = 0;
        CommonsMultipartFile cf = (CommonsMultipartFile) fileM;
        InputStream is = cf.getInputStream();
        //读取上传路径配置文件
        String savePath = utilCommon.getPropertyParam("upload-path.properties","upload.path");
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
    public List<String> queryPhoto(String shopName,String roomType) throws Exception {
        String savePath = utilCommon.getPropertyParam("upload-path.properties","upload.path");
        String folderPath = savePath+"/"+shopName+"/"+roomType;
        List<String> fileNames = new ArrayList<String>();
        File file = new File(folderPath);
        if(file.exists()){
            File[] files = file.listFiles();
            for (File f : files) {
                fileNames.add(f.getName());
            }
        }
        return fileNames;
    }
}
