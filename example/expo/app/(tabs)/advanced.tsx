import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Switch, ScrollView } from 'react-native';
import { OtpInputView } from '@bhojaniasgar/react-native-otp-input';
import PageHeader from '@/components/examples/PageHeader';
import CodeBlock from '@/components/examples/CodeBlock';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/ExampleStyles';

export default function AdvancedExample() {
    const [code, setCode] = useState('');
    const [secureEntry, setSecureEntry] = useState(false);
    const [editable, setEditable] = useState(true);
    const [pinCount, setPinCount] = useState(6);
    const [showError, setShowError] = useState(false);
    const otpInputRef = useRef<any>(null);

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
        if (otpInputRef.current) {
            otpInputRef.current.clear();
        }
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

    const codeExample = `const [code, setCode] = useState('');
const [secureEntry, setSecureEntry] = useState(false);
const [editable, setEditable] = useState(true);
const [pinCount, setPinCount] = useState(6);

<OtpInputView
  ref={otpInputRef}
  pinCount={pinCount}
  code={code}
  onCodeChanged={setCode}
  onCodeFilled={(code) => {
    console.log('OTP Verified:', code);
  }}
  secureTextEntry={secureEntry}
  editable={editable}
  error={showError}
  autoFocusOnLoad
/>`;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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
                        trackColor={{ false: Colors.borderLight, true: '#81C784' }}
                        thumbColor={secureEntry ? Colors.primary : '#F0F0F0'}
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
                        trackColor={{ false: Colors.borderLight, true: '#81C784' }}
                        thumbColor={editable ? Colors.primary : '#F0F0F0'}
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
        marginBottom: Spacing.lg,
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderLight,
    },
    optionContent: {
        flex: 1,
        marginRight: Spacing.md,
    },
    optionLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 4,
    },
    optionDescription: {
        fontSize: 12,
        color: Colors.textTertiary,
    },
    pinCountSection: {
        paddingTop: Spacing.md,
    },
    pinCountRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: Spacing.md,
        gap: Spacing.sm,
    },
    pinCountButton: {
        width: 50,
        height: 50,
        borderRadius: BorderRadius.md,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.border,
    },
    pinCountButtonActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primaryDark,
    },
    pinCountButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textSecondary,
    },
    pinCountButtonTextActive: {
        color: Colors.textInverse,
    },
    otpWrapper: {
        width: '100%',
        paddingVertical: Spacing.xl,
        alignItems: 'center',
        overflow: 'visible',
    },
    errorBox: {
        backgroundColor: '#FFEBEE',
        borderLeftWidth: 4,
        borderLeftColor: Colors.error,
        padding: Spacing.md,
        borderRadius: BorderRadius.sm,
        marginBottom: Spacing.lg,
    },
    errorText: {
        color: '#C62828',
        fontSize: 14,
        fontWeight: '500',
    },
    codeDisplay: {
        padding: Spacing.lg,
        backgroundColor: Colors.surfaceAlt,
        borderRadius: BorderRadius.md,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: Spacing.lg,
    },
    codeLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textSecondary,
        marginRight: Spacing.sm,
    },
    codeValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primary,
        fontFamily: 'monospace',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    verifyButton: {
        flex: 1,
        backgroundColor: Colors.success,
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
    },
    verifyButtonText: {
        color: Colors.textInverse,
        fontSize: 16,
        fontWeight: '600',
    },
    resetButton: {
        flex: 1,
        backgroundColor: Colors.error,
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
    infoSection: {
        backgroundColor: '#E3F2FD',
        borderLeftWidth: 4,
        borderLeftColor: Colors.primary,
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.lg,
        marginHorizontal: Spacing.lg,
        marginBottom: Spacing.xl,
        borderRadius: BorderRadius.md,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1565C0',
        marginBottom: Spacing.sm,
    },
    infoText: {
        fontSize: 14,
        color: '#0D47A1',
        lineHeight: 20,
    },
});
