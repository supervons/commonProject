package com.commonproject;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.sentry.RNSentryPackage;
import com.syanpicker.RNSyanImagePickerPackage;
import com.beefe.picker.PickerViewPackage;
import io.realm.react.RealmReactPackage;
import com.microsoft.codepush.react.CodePush;
import com.github.yamill.orientation.OrientationPackage;
import com.rnfingerprint.FingerprintAuthPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.react.rnspinkit.RNSpinkitPackage;
import android.content.Intent;
import android.content.res.Configuration;
import cn.jpush.reactnativejpush.JPushPackage;   // <--   导入 JPushPackage
import com.theweflex.react.WeChatPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  // 设置为 true 将不会弹出 toast
  private boolean SHUTDOWN_TOAST = false;

  // 设置为 true 将不会打印 log
  private boolean SHUTDOWN_LOG = false;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNSentryPackage(),
            new RNSyanImagePickerPackage(),
            new PickerViewPackage(),
            new RealmReactPackage(),
            //第一个参数是刚刚申请的key（可以根据环境配置）
            //第三个参数是服务器的URL
            new CodePush("E77ylQ553XXIVzWYahJz2xGWTYP74ksvOXqog", MainApplication.this, BuildConfig.DEBUG,"http://47.93.31.98:3000/"),
            new OrientationPackage(),
            new FingerprintAuthPackage(),
            new RNGestureHandlerPackage(),
            new VectorIconsPackage(),
            new RNSpinkitPackage(),
            new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),   //  <-- 添加 JPushPackage
            new WeChatPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", newConfig);
    this.sendBroadcast(intent);
  }
}
