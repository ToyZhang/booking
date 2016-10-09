package com.util;

import javax.net.ssl.X509TrustManager;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

/**
 * 实现X509TrustManager接口，用于创建sslContext
 * Created by zhangtuoyu on 2016-10-09.
 */
public class MyX509TrustManager implements X509TrustManager {
    @Override
    public void checkClientTrusted(X509Certificate[] x509Certificates, String s) throws CertificateException {

    }

    @Override
    public void checkServerTrusted(X509Certificate[] x509Certificates, String s) throws CertificateException {

    }

    @Override
    public X509Certificate[] getAcceptedIssuers() {
        return new X509Certificate[0];
    }
//    X509TrustManager sunJSSEX509TrustManager;
//    //重写构造器
//    MyX509TrustManager() throws Exception {
//        // create a "default" JSSE X509TrustManager.
//        KeyStore ks = KeyStore.getInstance("JKS");
//        ks.load(new FileInputStream("trustedCerts"),
//                "passphrase".toCharArray());
//        TrustManagerFactory tmf =
//                TrustManagerFactory.getInstance("SunX509", "SunJSSE");
//        tmf.init(ks);
//        TrustManager tms [] = tmf.getTrustManagers();
//        /*
//         * Iterate over the returned trustmanagers, look
//         * for an instance of X509TrustManager.  If found,
//         * use that as our "default" trust manager.
//         */
//        for (int i = 0; i < tms.length; i++) {
//            if (tms[i] instanceof X509TrustManager) {
//                sunJSSEX509TrustManager = (X509TrustManager) tms[i];
//                return;
//            }
//        }
//        throw new Exception("Couldn't initialize");
//    }
//
//    /**
//     * 使用默认管理配置
//     * @param chain
//     * @param authType
//     */
//    @Override
//    public void checkClientTrusted(X509Certificate[] chain, String authType){
//        try {
//            sunJSSEX509TrustManager.checkClientTrusted(chain, authType);
//        } catch (CertificateException e) {
//            e.printStackTrace();
//        }
//    }
//    /**
//     * 使用默认管理配置
//     * @param chain
//     * @param authType
//     */
//    @Override
//    public void checkServerTrusted(X509Certificate[] chain, String authType){
//        try {
//            sunJSSEX509TrustManager.checkServerTrusted(chain, authType);
//        } catch (CertificateException e) {
//            e.printStackTrace();
//        }
//    }
//
//    @Override
//    public X509Certificate[] getAcceptedIssuers() {
//        return sunJSSEX509TrustManager.getAcceptedIssuers();
//    }
}
