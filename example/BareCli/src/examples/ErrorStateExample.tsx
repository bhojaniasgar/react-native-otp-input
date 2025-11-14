import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import OTPInputView from '@bhojaniasgar/react-native-otp-input';
import PageHeader from '../components/PageHeader';
import CodeBlock from '../components/CodeBlock';

const ErrorStateExample = () => {
    const [code, setCode] = useState('');
    const [hasError, setHasError] = useState(false);

    const handleCodeFilled = (filledCode: string) => {
        // Simulate validation - reject if code is "000000"
        if (filledCode === '000000') {
            setHasError(true);
            Alert.alert('Error', 'Invalid OTP! Try a different code.');
        } else {
            setHasError(false);
            Alert.alert('Success', `OTP ${filledCode} is valid!`);
        }
    };

    const handleReset = () => {
        setCode('');
        setHasError(false);
    };

    const handleTriggerError = () => {
        setCode('000000');
        setHasError(true);
    };

    const codeExample = `const [hasError, setHasError] = useState(false);

<OTPInputView
  pinCount={6}
  code={code}
  onCodeChanged={setCode}
  error={hasError}
  errorInputFieldStyle={{
    borderColor: '#FF3B30',
    backgroundColor: '#FFF5F5',
  }}
/>`;

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            bottomOffset={20}
        >
            <PageHeader
                icon="⚠️"
                title="Error State"
                description="Handle validation and error states"
            />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Try it out</Text>

                <View style={styles.otpWrapper}>
                    <OTPInputView
                        pinCount={6}
                        code={code}
                        onCodeChanged={(newCode) => {
                            setCode(newCode);
                            if (hasError && newCode !== '000000') {
                                setHasError(false);
                            }
                        }}
                        onCodeFilled={handleCodeFilled}
                        autoFocusOnLoad={false}
                        error={hasError}
                        codeInputFieldStyle={styles.inputField}
                        codeInputHighlightStyle={styles.inputFieldFocused}
                        errorInputFieldStyle={styles.inputFieldError}
                    />
                </View>

                {hasError && (
                    <View style={styles.errorMessage}>
                        <Text style={styles.errorText}>❌ Invalid OTP code</Text>
                    </View>
                )}

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.errorButton} onPress={handleTriggerError}>
                        <Text style={styles.errorButtonText}>Trigger Error</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                        <Text style={styles.resetButtonText}>Reset</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.codeDisplay}>
                    <Text style={styles.codeLabel}>Current Code:</Text>
                    <Text style={[styles.codeValue, hasError && styles.codeValueError]}>
                        {code || '(empty)'}
                    </Text>
                </View>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Error Handling:</Text>
                <View style={styles.infoItem}>
                    <Text style={styles.infoBullet}>•</Text>
                    <Text style={styles.infoText}>
                        Set error prop to true to show error state
                    </Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoBullet}>•</Text>
                    <Text style={styles.infoText}>
                        Customize error styling with errorInputFieldStyle
                    </Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoBullet}>•</Text>
                    <Text style={styles.infoText}>
                        Try entering "000000" to see error state
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
        borderColor: '#4A90E2',
        borderWidth: 2,
    },
    inputFieldError: {
        borderColor: '#FF3B30',
        backgroundColor: '#FFF5F5',
        borderWidth: 2,
    },
    errorMessage: {
        backgroundColor: '#FFF5F5',
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#FF3B30',
        marginTop: 12,
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 14,
        fontWeight: '600',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 20,
    },
    errorButton: {
        flex: 1,
        backgroundColor: '#FF3B30',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    errorButtonText: {
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
        color: '#4A90E2',
        fontFamily: 'monospace',
    },
    codeValueError: {
        color: '#FF3B30',
    },
    infoSection: {
        backgroundColor: '#FFF5F5',
        borderRadius: 12,
        padding: 20,
        marginHorizontal: 16,
        marginBottom: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#FF3B30',
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
        color: '#FF3B30',
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

export default ErrorStateExample;
