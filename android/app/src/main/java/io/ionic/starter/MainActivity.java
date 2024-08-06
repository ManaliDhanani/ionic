package io.ionic.starter;
import com.getcapacitor.BridgeActivity;

import com.getcapacitor.community.firebaseanalytics.FirebaseAnalytics;
import android.os.Bundle;


public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    this.registerPlugin(FirebaseAnalytics.class);
  }
}
