package io.ionic.starter;
import com.getcapacitor.BridgeActivity;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import android.util.Log;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.RemoteMessage;

import java.util.concurrent.atomic.AtomicInteger;

//@SuppressLint("MissingPermission")
public class MainActivity extends BridgeActivity {
//  private final ActivityResultLauncher<String> requestPermissionLauncher =
//    registerForActivityResult(new ActivityResultContracts.RequestPermission(), isGranted -> {
//      if (isGranted) {
//        // FCM SDK (and your app) can post notifications.
//      } else {
//      }
//    });
//
//  public void runtimeEnableAutoInit() {
//    // [START fcm_runtime_enable_auto_init]
//    FirebaseMessaging.getInstance().setAutoInitEnabled(true);
//    // [END fcm_runtime_enable_auto_init]
//  }
//
//  private void askNotificationPermission() {
//    // This is only necessary for API level >= 33 (TIRAMISU)
//    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
//      if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) ==
//        PackageManager.PERMISSION_GRANTED) {
//        // FCM SDK (and your app) can post notifications.
//      } else if (shouldShowRequestPermissionRationale(Manifest.permission.POST_NOTIFICATIONS)) {
//      } else {
//        // Directly ask for the permission
//        requestPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS);
//      }
//    }
//  }
}
