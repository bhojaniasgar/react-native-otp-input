import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Platform } from 'react-native';
import { OtpInputView, getHash, startOtpListener, removeListener } from '@bhojaniasgar/react-native-otp-input';
import PageHeader from '@/components/examples/PageHeader';
import CodeBlock from '@/components/examples/CodeBlock';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/ExampleStyles';

export default function AutoFillExample() {
    const [code, setCode] = useState('');
    const [appHash, setAppHash] = useState<string>('');
    const isIOS = Platform.OS === 'ios';

    useEffect(() => {
        if (isIOS) {
            return;
        }

        // Android SMS auto-fill setup
        getHash()
            .then((hashes) => {
                if (hashes && hashes.length > 0) {
                    setAppHash(hashes[0]);
                }
            })
            .catch(() => {
                // Native module not available - expected in Expo Go
            });

        startOtpListener((message: string) => {
            console.log('Message Listener:', message);
            if (!message) {
                return;
            }
            const otp = /(\d{6})/g.exec(message);

            if (!Array.isArray(otp)) {
                return;
            }
            setCode(otp[1]);
            Alert.alert('Auto-filled!', `OTP ${otp[1]} detected from SMS`);
        }).catch(() => {
            // Native module not available - expected in Expo Go
        });

        return () => {
            try {
                removeListener();
            } catch (error) {
                // Ignore errors when removing listener
            }
        };
    }, [isIOS]);

    const handleReset = () => {
        setCode('');
    };

    const androidCodeExample = `import { getHash, startOtpListener, removeListener } from '@bhojaniasgar/react-native-otp-input';

useEffect(() => {
  // Get app hash for SMS
  getHash().then((hashes) => {
    console.log('App Hash:', hashes);
  });

  // Start listening for OTP SMS
  startOtpListener((message) => {
    const otp = /(\\d{6})/g.exec(message);
    if (otp) {
      setCode(otp[1]);
    }
  });

  return () => removeListener();
}, []);`;

    const iosCodeExample = `// iOS auto-fill is handled by the system
// No additional code needed
<OtpInputView
  pinCount={6}
  code={code}
  onCodeChanged={setCode}
  autoFocusOnLoad
/>`;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <PageHeader
                icon="⚡"
                title="Auto-Fill OTP"
                description="Automatic OTP detection from SMS"
            />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Try it out</Text>

                <View style={styles.otpWrapper}>
                    <OtpInputView
                        pinCount={6}
                        code={code}
                        onCodeChanged={setCode}
                        autoFocusOnLoad={false}
                    />
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                        <Text style={styles.resetButtonText}>Reset</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.codeDisplay}>
                    <Text style={styles.codeLabel}>Current Code:</Text>
                    <Text style={styles.codeValue}>{code || '(empty)'}</Text>
                </View>
            </View>

            {!isIOS && appHash ? (
                <View style={styles.infoSection}>
                    <Text style={styles.infoTitle}>📱 Android Auto-Fill</Text>
                    <Text style={styles.infoText}>
                        Auto-fill is active! Send an SMS with a 6-digit OTP to this device.{'\n\n'}
                        Your app hash: {appHash}{'\n\n'}
                        SMS format: Your OTP is 123456 {appHash}
                    </Text>
                </View>
            ) : !isIOS && !appHash ? (
                <View style={styles.warningSection}>
                    <Text style={styles.warningTitle}>⚠️ Development Build Required</Text>
                    <Text style={styles.warningText}>
                        Android auto-fill requires a development build with native modules.{'\n\n'}
                        Run: npx expo run:android{'\n\n'}
                        This feature is not available in Expo Go.
                    </Text>
                </View>
            ) : isIOS ? (
                <View style={styles.infoSection}>
                    <Text style={styles.infoTitle}>📱 iOS Auto-Fill</Text>
                    <Text style={styles.infoText}>
                        iOS handles OTP auto-fill automatically through the system.{'\n\n'}
                        When an SMS with an OTP arrives, iOS will suggest it above the keyboard.{'\n\n'}
                        No additional code is required for iOS auto-fill.
                    </Text>
                </View>
            ) : null}

            <CodeBlock
                code={isIOS ? iosCodeExample : androidCodeExample}
                title={isIOS ? "iOS Auto-Fill" : "Android Auto-Fill"}
            />

            <View style={styles.tipsSection}>
                <Text style={styles.tipsTitle}>💡 Auto-Fill Tips</Text>
                <Text style={styles.tipsText}>
                    • Android requires SMS listener permissions{'\n'}
                    • iOS auto-fill works automatically{'\n'}
                    • Test on physical devices for best results{'\n'}
                    • SMS must contain numeric OTP code
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    contentContainer: {
        paddingBottom: 40,
    },
    section: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.xl,
        marginHorizontal: Spacing.lg,
        marginBottom: Spacing.xl,
        ...Shadows.medium,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: Spacing.xl,
    },
    otpWrapper: {
        width: '100%',
        paddingVertical: Spacing.xl,
        alignItems: 'center',
        overflow: 'visible',
    },
    buttonRow: {
        marginTop: Spacing.xl,
    },
    resetButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
    },
    resetButtonText: {
        color: Colors.textInverse,
        fontSize: 16,
        fontWeight: '600',
    },
    codeDisplay: {
        marginTop: Spacing.xl,
        padding: Spacing.lg,
        backgroundColor: Colors.surfaceAlt,
        borderRadius: BorderRadius.md,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    codeLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginRight: Spacing.sm,
    },
    codeValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
        fontFamily: 'monospace',
    },
    infoSection: {
        backgroundColor: '#E8F5E9',
        borderLeftWidth: 4,
        borderLeftColor: Colors.success,
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.lg,
        marginHorizontal: Spacing.lg,
        marginBottom: Spacing.xl,
        borderRadius: BorderRadius.md,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: Spacing.sm,
    },
    infoText: {
        fontSize: 14,
        color: '#1B5E20',
        lineHeight: 20,
    },
    tipsSection: {
        backgroundColor: '#FFF3E0',
        borderLeftWidth: 4,
        borderLeftColor: Colors.warning,
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.lg,
        marginHorizontal: Spacing.lg,
        marginBottom: Spacing.xl,
        borderRadius: BorderRadius.md,
    },
    tipsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E65100',
        marginBottom: Spacing.sm,
    },
    tipsText: {
        fontSize: 14,
        color: '#E65100',
        lineHeight: 20,
    },
    warningSection: {
        backgroundColor: '#FFF3E0',
        borderLeftWidth: 4,
        borderLeftColor: '#FF9800',
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.lg,
        marginHorizontal: Spacing.lg,
        marginBottom: Spacing.xl,
        borderRadius: BorderRadius.md,
    },
    warningTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E65100',
        marginBottom: Spacing.sm,
    },
    warningText: {
        fontSize: 14,
        color: '#E65100',
        lineHeight: 20,
    },
});
