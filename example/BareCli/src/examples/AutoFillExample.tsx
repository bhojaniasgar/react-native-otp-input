import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { OtpInputView } from '@bhojaniasgar/react-native-otp-input';
import Clipboard from '@react-native-clipboard/clipboard';
import PageHeader from '../components/PageHeader';
import CodeBlock from '../components/CodeBlock';

const AutoFillExample = () => {
    const [code, setCode] = useState('');

    const handleCodeFilled = (filledCode: string) => {
        console.log('OTP Filled:', filledCode);
        Alert.alert('Success', `OTP ${filledCode} detected and filled!`);
    };

    const handleReset = () => {
        setCode('');
    };

    const copyTestOTP = () => {
        const testOTP = '123456';
        Clipboard.setString(testOTP);
        Alert.alert('Copied!', `Test OTP "${testOTP}" copied to clipboard`);
    };

    const codeExample = `import { OtpInputView } 
  from '@bhojaniasgar/react-native-otp-input';

<OtpInputView
  pinCount={6}
  code={code}
  onCodeChanged={setCode}
  onCodeFilled={(code) => {
    console.log('Auto-filled:', code);
  }}
  autoFill={true}
  autoFocusOnLoad
/>`;

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            bottomOffset={20}
        >
            <PageHeader
                icon="⚡"
                title="Auto-Fill OTP"
                description={
                    Platform.OS === 'android'
                        ? 'Automatically detects OTP from clipboard'
                        : 'Auto-fill optimized for Android'
                }
            />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Try it out</Text>

                <View style={styles.otpWrapper}>
                    <OtpInputView
                        pinCount={6}
                        code={code}
                        onCodeChanged={setCode}
                        onCodeFilled={handleCodeFilled}
                        autoFill={true}
                        autoFocusOnLoad={false}
                        codeInputFieldStyle={styles.inputField}
                        codeInputHighlightStyle={styles.inputFieldFocused}
                    />
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.testButton} onPress={copyTestOTP}>
                        <Text style={styles.testButtonText}>Copy Test OTP</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                        <Text style={styles.resetButtonText}>Reset</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.codeDisplay}>
                    <Text style={styles.codeLabel}>Current Code:</Text>
                    <Text style={styles.codeValue}>{code || '(empty)'}</Text>
                </View>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>How it works:</Text>
                <View style={styles.infoItem}>
                    <Text style={styles.infoBullet}>•</Text>
                    <Text style={styles.infoText}>
                        On Android, the component monitors clipboard for OTP codes
                    </Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoBullet}>•</Text>
                    <Text style={styles.infoText}>
                        When a 6-digit code is detected, it's automatically filled
                    </Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoBullet}>•</Text>
                    <Text style={styles.infoText}>
                        Try copying "123456" and watch it auto-fill!
                    </Text>
                </View>
            </View>

            <CodeBlock code={codeExample} title="Code Example" />
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    contentContainer: {
        paddingBottom: 40,
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginHorizontal: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    otpWrapper: {
        width: '100%',
        paddingVertical: 20,
        alignItems: 'center',
        overflow: 'visible',
    },
    inputField: {
        width: 48,
        height: 48,
        borderWidth: 2,
        borderColor: '#E5E5E5',
        borderRadius: 8,
        fontSize: 20,
        color: '#333',
    },
    inputFieldFocused: {
        borderColor: '#FF6B6B',
        borderWidth: 2,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 20,
    },
    testButton: {
        flex: 1,
        backgroundColor: '#FF6B6B',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    testButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    resetButton: {
        flex: 1,
        backgroundColor: '#4A90E2',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    resetButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    codeDisplay: {
        marginTop: 20,
        padding: 16,
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    codeLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginRight: 8,
    },
    codeValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF6B6B',
        fontFamily: 'monospace',
    },
    infoSection: {
        backgroundColor: '#FFF9E6',
        borderRadius: 12,
        padding: 20,
        marginHorizontal: 16,
        marginBottom: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#FFB800',
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    infoItem: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    infoBullet: {
        fontSize: 16,
        color: '#FFB800',
        marginRight: 8,
        fontWeight: 'bold',
    },
    infoText: {
        flex: 1,
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});

export default AutoFillExample;
