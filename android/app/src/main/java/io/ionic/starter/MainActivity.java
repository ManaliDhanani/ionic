package io.ionic.starter;
import com.getcapacitor.BridgeActivity;

import com.getcapacitor.community.firebaseanalytics.FirebaseAnalytics;
import android.os.Bundle;

import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;


public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    registerPlugin(FirebaseAnalytics.class);
    registerPlugin(GoogleAuth.class);
  }
}
