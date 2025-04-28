package io.ionic.starter;
import com.getcapacitor.BridgeActivity;

import com.getcapacitor.community.firebaseanalytics.FirebaseAnalytics;
import android.os.Bundle;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import com.google.firebase.FirebaseApp;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

// for video player
import com.google.android.gms.cast.framework.CastContext;

//for background activity
import android.content.Intent;
import android.os.PowerManager;
import android.provider.Settings;
import android.net.Uri;
import android.content.Context;

import android.app.NotificationManager;

import android.annotation.SuppressLint;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    registerPlugin(FirebaseAnalytics.class);
    registerPlugin(GoogleAuth.class);
    FirebaseApp.initializeApp(this);
    // for video player
    CastContext.getSharedInstance(this);
    checkBatteryOptimization();
  }

//  private void checkBatteryOptimization() {
//    PowerManager pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
//    if (pm != null && !pm.isIgnoringBatteryOptimizations(getPackageName())) {
//      Intent intent = new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
//      intent.setData(Uri.parse("package:" + getPackageName()));
//      startActivity(intent);
//    }
//  }

//  private void checkBatteryOptimization() {
//    Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
//    intent.setData(Uri.parse("package:" + getPackageName()));
//    startActivity(intent);
//  }

  private void checkBatteryOptimization() {
    Intent intent = new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
    intent.setData(Uri.parse("package:" + getPackageName()));
    startActivity(intent);
  }

  @SuppressLint("NewApi")
  private void checkAndRequestNotificationPermission() {
    NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

    if (notificationManager != null) {
        if (!notificationManager.areNotificationsEnabled()) {
          openNotificationSettings();
        }
    }
  }

  private void openNotificationSettings() {
    Intent intent = new Intent(Settings.ACTION_APP_NOTIFICATION_SETTINGS);
    intent.putExtra(Settings.EXTRA_APP_PACKAGE, getPackageName());
    startActivity(intent);
  }
}
