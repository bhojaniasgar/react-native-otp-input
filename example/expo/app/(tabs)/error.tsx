import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { OtpInputView } from '@bhojaniasgar/react-native-otp-input';
import PageHeader from '@/components/examples/PageHeader';
import CodeBlock from '@/components/examples/CodeBlock';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/ExampleStyles';

export default function ErrorStateExample() {
    const [code, setCode] = useState('');
    const [showError, setShowError] = useState(false);

    const handleCodeChanged = (value: string) => {
        setCode(value);
        setShowError(false);
    };

    const handleVerify = () => {
        if (code.length === 6) {
            setShowError(false);
            Alert.alert('Success', `Code ${code} is valid!`);
        } else {
            setShowError(true);
            Alert.alert('Invalid', 'Please enter a complete 6-digit code');
        }
    };

    const handleReset = () => {
        setCode('');
        setShowError(false);
    };

    const codeExample = `const [code, setCode] = useState('');
const [showError, setShowError] = useState(false);

<OtpInputView
  pinCount={6}
  code={code}
  onCodeChanged={(value) => {
    setCode(value);
    setShowError(false);
  }}
  error={showError}
/>

{showError && (
  <Text style={styles.errorText}>
    Please enter a valid 6-digit code
  </Text>
)}`;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <PageHeader
                icon="⚠️"
                title="Error States"
                description="Handling validation and error feedback"
            />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Try it out</Text>
                <Text style={styles.description}>
                    Enter an incomplete code and click Verify to see the error state
                </Text>

                <View style={styles.otpWrapper}>
                    <OtpInputView
                        pinCount={6}
                        code={code}
                        onCodeChanged={handleCodeChanged}
                        autoFocusOnLoad={false}
                        error={showError}
                    />
                </View>

                {showError && (
                    <View style={styles.errorBox}>
                        <Text style={styles.errorText}>
                            ⚠️ Please enter a valid 6-digit code
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

            <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>💡 Error Handling Tips</Text>
                <Text style={styles.infoText}>
                    • Show clear error messages{'\n'}
                    • Use visual indicators (red borders){'\n'}
                    • Clear errors on user input{'\n'}
                    • Provide helpful validation feedback
                </Text>
            </View>

            <CodeBlock code={codeExample} title="Code Example" />
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
        marginBottom: Spacing.sm,
    },
    description: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: Spacing.lg,
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
