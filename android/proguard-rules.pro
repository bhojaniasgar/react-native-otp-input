# React Native OTP Verify ProGuard rules

# Keep React Native module
-keep class com.asgar.OtpVerify.** { *; }
-keep public class com.asgar.OtpVerify.OtpVerifyModule
-keep public class com.asgar.OtpVerify.OtpVerifyPackage

# Keep event listeners and subscribers
-keepattributes *Annotation*
-keepattributes EnclosingMethod
-keepclasseswithmembers class * {
    public <init>(android.content.Context);
}
