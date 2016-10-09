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
        //获取微信接口token
        String grantType = "client_credential";
        String appid = "wx50c2ff2ef1979402"; //公众号appid
        String secret = "c6bcf9884e29799f2913c903deb16ede"; //公众号secret
        String token = getWeChatToken(grantType,appid,secret);
        if(token.isEmpty()){
            result.setRet(-1);
            result.setContent("TCSL_BO_SendMessage sendWelcome get token error");
            return result;
        }
        String openId = "oC9iLv-jdd28i0X7pNS1xosEZ9lI";
        String templateId = "yAumrSw7Y9yDOUhXwuE8CxXI7WUb3gmMVeJqri6xB_M";
        template.setTouser(openId);
        template.setTemplate_id(templateId);
        template.setTopcolor("#000000");
        //模板内容
        Map<String,TCSL_VO_WechatTemplateData> data = template.getData();
        TCSL_VO_WechatTemplateData name = new TCSL_VO_WechatTemplateData("张拓宇","#000000");
        data.put("name",name);
        TCSL_VO_WechatTemplateData price = new TCSL_VO_WechatTemplateData("￥123.00","#000000");
        data.put("price",price);
        template.setData(data);
        String sendMessageUrl = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token="+token;
        String dataStr = JSONObject.fromObject(template).toString();
        JSONObject jsonobj = utilCommon.httpsRequest(sendMessageUrl, "POST", dataStr);
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

    /**
     * 获取微信公众号接口token
     * @param grant_type
     * @param appid
     * @param secret
     * @return
     */
    public String getWeChatToken(String grant_type,String appid,String secret){
        String getTokenUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type="+grant_type +
                "&appid="+appid+"&secret="+secret;
        JSONObject result = utilCommon.httpsRequest(getTokenUrl, "GET", null);
        String token = "";
        if(!result.isEmpty()){
            token = result.get("access_token").toString();
        }
        return token;
    }
}
