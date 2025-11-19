import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Switch, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { OtpInputView, OTPInputViewRef } from '@bhojaniasgar/react-native-otp-input';
import PageHeader from '../components/PageHeader';
import CodeBlock from '../components/CodeBlock';
import { getHash, startOtpListener, removeListener } from '@bhojaniasgar/react-native-otp-input';



const AdvancedExample = () => {
    const [code, setCode] = useState('');
    const [secureEntry, setSecureEntry] = useState(false);
    const [editable, setEditable] = useState(true);
    const [pinCount, setPinCount] = useState(6);
    const [showError, setShowError] = useState(false);
    const otpInputRef = useRef<OTPInputViewRef>(null);
    const isIOS = Platform.OS === 'ios';

    useEffect(() => {
        if (isIOS) {
            return;
        }

        getHash()
            .then((hashes) => {
                console.log('App Hash:', hashes);
            })
            .catch((error) => {
                console.error('Error getting hash:', error);
            });

        startOtpListener((message: string) => {
            console.log("Message Listerner", message)
            if (!message) {
                return;
            }
            const otp = /(\d{6})/g.exec(message);

            if (!Array.isArray(otp)) {
                return;
            }
            setCode(otp[1]);
            // Use ref to set value programmatically
            otpInputRef.current?.setValue(otp[1]);
        });
        return () => removeListener();
    }, [isIOS]);

    const handleCodeFilled = (filledCode: string) => {
        console.log('OTP Filled:', filledCode);
        setShowError(false);
        Alert.alert('Success', `OTP ${filledCode} verified successfully!`);
    };

    const handleCodeChanged = (value: string) => {
        setCode(value);
        setShowError(false);
    };

    const handleReset = () => {
        setCode('');
        setShowError(false);
        // Use ref to clear all fields
        otpInputRef.current?.clear();
    };

    const handleSetTestCode = () => {
        const testCode = '123456'.slice(0, pinCount);
        setCode(testCode);
        // Use ref to set value programmatically
        otpInputRef.current?.setValue(testCode);
    };

    const handleVerify = () => {
        if (code.length === pinCount) {
            Alert.alert('Verified', `Code ${code} is valid!`);
        } else {
            setShowError(true);
            Alert.alert('Invalid', `Please enter a ${pinCount}-digit code`);
        }
    };

    const toggleSecureEntry = () => {
        setSecureEntry(!secureEntry);
    };

    const toggleEditable = () => {
        setEditable(!editable);
    };

    const changePinCount = (newCount: number) => {
        setPinCount(newCount);
        setCode('');
        setShowError(false);
    };

    const codeExample = `import { useRef } from 'react';
import { OtpInputView, OTPInputViewRef } from '@bhojaniasgar/react-native-otp-input';

const [code, setCode] = useState('');
const otpInputRef = useRef<OTPInputViewRef>(null);

// Set value using ref
const handleSetValue = () => {
  otpInputRef.current?.setValue('123456');
};

// Clear using ref
const handleClear = () => {
  otpInputRef.current?.clear();
};

// Focus specific field using ref
const handleFocus = () => {
  otpInputRef.current?.focusField(0);
};

<OtpInputView
  ref={otpInputRef}
  pinCount={6}
  code={code}
  onCodeChanged={setCode}
  onCodeFilled={(filledCode) => {
    console.log('OTP Verified:', filledCode);
  }}
  secureTextEntry={false}
  editable={true}
  error={false}
  autoFocusOnLoad
/>`;

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            bottomOffset={20}
        >
            <PageHeader
                icon="⚙️"
                title="Advanced OTP Input"
                description="Explore OTP input with configurable options"
            />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Configuration Options</Text>

                {/* Secure Entry Toggle */}
                <View style={styles.optionRow}>
                    <View style={styles.optionContent}>
                        <Text style={styles.optionLabel}>Secure Entry (Hide Numbers)</Text>
                        <Text style={styles.optionDescription}>
                            Masks OTP digits with dots
                        </Text>
                    </View>
                    <Switch
                        value={secureEntry}
                        onValueChange={toggleSecureEntry}
                        trackColor={{ false: '#E0E0E0', true: '#81C784' }}
                        thumbColor={secureEntry ? '#4A90E2' : '#F0F0F0'}
                    />
                </View>

                {/* Editable Toggle */}
                <View style={styles.optionRow}>
                    <View style={styles.optionContent}>
                        <Text style={styles.optionLabel}>Editable</Text>
                        <Text style={styles.optionDescription}>
                            Enable/disable input editing
                        </Text>
                    </View>
                    <Switch
                        value={editable}
                        onValueChange={toggleEditable}
                        trackColor={{ false: '#E0E0E0', true: '#81C784' }}
                        thumbColor={editable ? '#4A90E2' : '#F0F0F0'}
                    />
                </View>

                {/* Pin Count Selection */}
                <View style={styles.pinCountSection}>
                    <Text style={styles.optionLabel}>OTP Length</Text>
                    <View style={styles.pinCountRow}>
                        {[4, 5, 6, 8].map((count) => (
                            <TouchableOpacity
                                key={count}
                                style={[
                                    styles.pinCountButton,
                                    pinCount === count && styles.pinCountButtonActive,
                                ]}
                                onPress={() => changePinCount(count)}
                            >
                                <Text
                                    style={[
                                        styles.pinCountButtonText,
                                        pinCount === count && styles.pinCountButtonTextActive,
                                    ]}
                                >
                                    {count}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>

            {/* OTP Input Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Try it out</Text>

                <View style={styles.otpWrapper}>
                    <OtpInputView
                        ref={otpInputRef}
                        pinCount={pinCount}
                        code={code}
                        onCodeChanged={handleCodeChanged}
                        onCodeFilled={handleCodeFilled}
                        secureTextEntry={secureEntry}
                        editable={editable}
                        error={showError}
                        autoFocusOnLoad={false}
                    />
                </View>

                {showError && (
                    <View style={styles.errorBox}>
                        <Text style={styles.errorText}>
                            ⚠️ Please enter a valid {pinCount}-digit code
                        </Text>
                    </View>
                )}

                <View style={styles.codeDisplay}>
                    <Text style={styles.codeLabel}>Current Code:</Text>
                    <Text style={styles.codeValue}>{code || '(empty)'}</Text>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
                        <Text style={styles.verifyButtonText}>Verify</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                        <Text style={styles.resetButtonText}>Reset</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.testButton} onPress={handleSetTestCode}>
                    <Text style={styles.testButtonText}>Set Test Code (using ref)</Text>
                </TouchableOpacity>
            </View>

            <CodeBlock code={codeExample} title="Code Example" />

            {/* Info Section */}
            <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>💡 Tips</Text>
                <Text style={styles.infoText}>
                    • Use secureTextEntry for sensitive operations{'\n'}
                    • Customize OTP length based on your requirements{'\n'}
                    • Disable editing when verifying or processing{'\n'}
                    • Show error states for better UX
                </Text>
            </View>
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
        marginBottom: 16,
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    optionContent: {
        flex: 1,
        marginRight: 12,
    },
    optionLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    optionDescription: {
        fontSize: 12,
        color: '#999',
    },
    pinCountSection: {
        paddingTop: 12,
    },
    pinCountRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 12,
        gap: 8,
    },
    pinCountButton: {
        width: 50,
        height: 50,
        borderRadius: 8,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E0E0E0',
    },
    pinCountButtonActive: {
        backgroundColor: '#4A90E2',
        borderColor: '#2E5C8A',
    },
    pinCountButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
    },
    pinCountButtonTextActive: {
        color: '#FFFFFF',
    },
    otpWrapper: {
        width: '100%',
        paddingVertical: 20,
        alignItems: 'center',
        overflow: 'visible',
    },
    errorBox: {
        backgroundColor: '#FFEBEE',
        borderLeftWidth: 4,
        borderLeftColor: '#F44336',
        padding: 12,
        borderRadius: 6,
        marginBottom: 16,
    },
    errorText: {
        color: '#C62828',
        fontSize: 14,
        fontWeight: '500',
    },
    codeDisplay: {
        padding: 16,
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    codeLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginRight: 8,
    },
    codeValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4A90E2',
        fontFamily: 'monospace',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
    },
    verifyButton: {
        flex: 1,
        backgroundColor: '#4CAF50',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
    },
    verifyButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    resetButton: {
        flex: 1,
        backgroundColor: '#F44336',
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
    testButton: {
        backgroundColor: '#FF9800',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 12,
    },
    testButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    infoSection: {
        backgroundColor: '#E3F2FD',
        borderLeftWidth: 4,
        borderLeftColor: '#4A90E2',
        paddingHorizontal: 20,
        paddingVertical: 16,
        marginHorizontal: 16,
        marginBottom: 20,
        borderRadius: 8,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1565C0',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#0D47A1',
        lineHeight: 20,
    },
});

export default AdvancedExample;
