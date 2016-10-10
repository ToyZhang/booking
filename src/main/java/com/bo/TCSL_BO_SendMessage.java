package com.bo;

import com.util.TCSL_UTIL_Common;
import com.vo.TCSL_VO_Result;
import com.vo.TCSL_VO_WeChatTemplate;
import com.vo.TCSL_VO_WechatTemplateData;
import net.sf.json.JSONObject;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by zhangtuoyu on 2016-10-08.
 */
@Repository
public class TCSL_BO_SendMessage implements ApplicationListener<ContextRefreshedEvent> {
    @Resource
    TCSL_UTIL_Common utilCommon;

    /**
     * 向指定微信用户发送酒店入住信息
     * @return
     */
    public TCSL_VO_Result sendWelcome(){
        TCSL_VO_Result result = new TCSL_VO_Result();
        //模板消息
        TCSL_VO_WeChatTemplate template = new TCSL_VO_WeChatTemplate();
        //获取微信接口token
        String token = TCSL_UTIL_Common.weChat_token;
        if(token.isEmpty()){
            result.setRet(-1);
            result.setContent("TCSL_BO_SendMessage sendWelcome get token error");
            return result;
        }
        String openId = "oC9iLv-jdd28i0X7pNS1xosEZ9lI";//"oC9iLv0GiHMH2ruc0G6DF_VpqhFM"
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
        String returnMsg = jsonobj.get("errmsg").toString();
        if("OK".equalsIgnoreCase(returnMsg)){
            result.setRet(0);
            result.setContent(jsonobj);
        }
        return result;
    }

    /**
     * 向指定微信用户发送离店信息
     * @return
     */
    public TCSL_VO_Result sendLeave(){
        String token = "TIrVp1GPLQMCT_osgH9ERCb4vn1luPfNIgvgT1BH2wLd9XuV5YsIogodXBPXMNmsnN7XFMdTjmDjrVT9DvsJjrgVikBR9veMpXOsJUx26EhFnfh7NSQessC_S3CwJUweSLJfAAAHAY";
        TCSL_VO_Result result = getOpenId(token);
        return result;
    }

    /**
     * 获取openId
     * @param token
     * @return
     */
    public TCSL_VO_Result getOpenId(String token){
        TCSL_VO_Result result = new TCSL_VO_Result();
        String openIdsUrl = "https://api.weixin.qq.com/cgi-bin/user/get?access_token="+token;//+"&next_openid=NEXT_OPENID";
        JSONObject openIdsJson = utilCommon.httpsRequest(openIdsUrl,"GET",null);
        Object data = openIdsJson.get("data");
        JSONObject openIds = JSONObject.fromObject(data);
        List<String> list = (List<String>)openIds.get("openid");
        result.setContent(list);
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

    /**
     * 获取微信公众号token
     * token过期时间为7200s，为了防止在7200s时调用接口token失效的问题，定时器7150s更新一次token
     * @param contextRefreshedEvent
     */
    @Override
    public void onApplicationEvent(final ContextRefreshedEvent contextRefreshedEvent) {
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
//                try {
//                    final String grantType = "client_credential";
//                    final String appId = utilCommon.getPropertyParam("weChat.properties","weChat.appId");//公众号appid
//                    final String secret = utilCommon.getPropertyParam("weChat.properties","weChat.secret");//公众号secret
//                    TCSL_UTIL_Common.weChat_token = getWeChatToken(grantType,appId,secret);
//                } catch (Exception e) {
//                    e.printStackTrace();
//                }
            }
        },0,7150*1000);//0ms后执行，之后每隔7150s后执行
    }
}
