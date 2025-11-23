import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { OtpInputView } from '@bhojaniasgar/react-native-otp-input';
import PageHeader from '../components/PageHeader';
import CodeBlock from '../components/CodeBlock';

const BasicExample = () => {
    const [code, setCode] = useState('');

    const handleCodeFilled = (filledCode: string) => {
        console.log('OTP Filled:', filledCode);
        Alert.alert('Success', `OTP is ${filledCode}, you are good to go!`);
    };

    const handleReset = () => {
        setCode('');
    };

    const codeExample = `<OtpInputView
  pinCount={6}
  code={code}
  onCodeChanged={setCode}
  onCodeFilled={(code) => {
    console.log('OTP is', code);
  }}
  autoFocusOnLoad
/>`;

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            bottomOffset={20}
        >
            <PageHeader
                icon="🏠"
                title="Basic OTP Input"
                description="A simple 6-digit OTP input with default styling"
            />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Try it out</Text>

                <View style={styles.otpWrapper}>
                    <OtpInputView
                        pinCount={6}
                        code={code}
                        onCodeChanged={setCode}
                        onCodeFilled={handleCodeFilled}
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
    buttonRow: {
        marginTop: 20,
    },
    resetButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
    },
    resetButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
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
        color: '#4A90E2',
        fontFamily: 'monospace',
    },
});

export default BasicExample;
