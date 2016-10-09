package com.bo;

import com.util.TCSL_UTIL_Common;
import com.vo.TCSL_VO_Result;
import com.vo.TCSL_VO_WeChatTemplate;
import com.vo.TCSL_VO_WechatTemplateData;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.Map;

/**
 * Created by zhangtuoyu on 2016-10-08.
 */
@Repository
public class TCSL_BO_SendMessage {
    @Resource
    TCSL_UTIL_Common utilCommon;

    public TCSL_VO_Result sendWelcome(){
        TCSL_VO_Result result = new TCSL_VO_Result();
        //模板消息
        TCSL_VO_WeChatTemplate template = new TCSL_VO_WeChatTemplate();
        Map<String,TCSL_VO_WechatTemplateData> data = template.getData();
        //第一个参数
        TCSL_VO_WechatTemplateData param1 = new TCSL_VO_WechatTemplateData("param1","#ffffff");
        data.put("param1",param1);
        template.setTemplate_id("bGblXs86Ov8Zblg8tIMYOKgesLVL_tJnAVu22nO3rXQ");//测试消息模板id
//        M5J5ySBzZaldpPwc-o9fcPa9Uto5q6cz3ifhAJTwpDMmXUj5D3wDYphQRL-dC7Rbn_dQBa8Sprtj65CLvOszFta5HjlOo3xre7fl0znDIbBtjbqDmpUpV2LIjUxOkxOdVOOfAIAQJJ
        JSONObject jsonobj = utilCommon.httpRequest(
                "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=rNdcZ5iFOfjgjc-6seJUYo9HYt0oOAmKYeP2hp9T-9FxSVjYnXSYDBU85bLMn0jA0sG7VDP6knwlP6EFylqLhAmjdVSpzRYS726m9ObJwioPMObABALIK",
                "POST",
                JSONObject.fromObject(template).toString());
        result.setRet(0);
        result.setContent(jsonobj);
        return result;
    }

    public TCSL_VO_Result sendLeave(){
        TCSL_VO_Result result = new TCSL_VO_Result();
        result.setRet(0);
        result.setContent("发送告别语成功");
        return result;
    }
}
