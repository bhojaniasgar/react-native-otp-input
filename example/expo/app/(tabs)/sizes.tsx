import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { OtpInputView } from '@bhojaniasgar/react-native-otp-input';
import PageHeader from '@/components/examples/PageHeader';
import CodeBlock from '@/components/examples/CodeBlock';
import { Colors, Spacing, BorderRadius, Shadows, OTPSizes } from '@/constants/ExampleStyles';

export default function SizeVariantsExample() {
    const [codeSmall, setCodeSmall] = useState('');
    const [codeMedium, setCodeMedium] = useState('');
    const [codeLarge, setCodeLarge] = useState('');

    const codeExample = `// Small Size
<OtpInputView
  pinCount={6}
  code={code}
  onCodeChanged={setCode}
  codeInputFieldStyle={{
    width: 40,
    height: 40,
    fontSize: 18,
  }}
/>

// Medium Size (Default)
<OtpInputView
  pinCount={6}
  code={code}
  onCodeChanged={setCode}
  codeInputFieldStyle={{
    width: 50,
    height: 50,
    fontSize: 22,
  }}
/>

// Large Size
<OtpInputView
  pinCount={6}
  code={code}
  onCodeChanged={setCode}
  codeInputFieldStyle={{
    width: 60,
    height: 60,
    fontSize: 26,
  }}
/>`;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <PageHeader
                icon="📏"
                title="Size Variants"
                description="Different OTP input sizes for various layouts"
            />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Small Size</Text>
                <Text style={styles.sizeDescription}>Compact size for tight spaces (40x40)</Text>
                <View style={styles.otpWrapper}>
                    <OtpInputView
                        pinCount={6}
                        code={codeSmall}
                        onCodeChanged={setCodeSmall}
                        autoFocusOnLoad={false}
                        codeInputFieldStyle={styles.inputFieldSmall}
                    />
                </View>
                <View style={styles.codeDisplay}>
                    <Text style={styles.codeLabel}>Code:</Text>
                    <Text style={styles.codeValue}>{codeSmall || '(empty)'}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Medium Size</Text>
                <Text style={styles.sizeDescription}>Standard size for most use cases (50x50)</Text>
                <View style={styles.otpWrapper}>
                    <OtpInputView
                        pinCount={6}
                        code={codeMedium}
                        onCodeChanged={setCodeMedium}
                        autoFocusOnLoad={false}
                        codeInputFieldStyle={styles.inputFieldMedium}
                    />
                </View>
                <View style={styles.codeDisplay}>
                    <Text style={styles.codeLabel}>Code:</Text>
                    <Text style={styles.codeValue}>{codeMedium || '(empty)'}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Large Size</Text>
                <Text style={styles.sizeDescription}>Large size for better visibility (60x60)</Text>
                <View style={styles.otpWrapper}>
                    <OtpInputView
                        pinCount={6}
                        code={codeLarge}
                        onCodeChanged={setCodeLarge}
                        autoFocusOnLoad={false}
                        codeInputFieldStyle={styles.inputFieldLarge}
                    />
                </View>
                <View style={styles.codeDisplay}>
                    <Text style={styles.codeLabel}>Code:</Text>
                    <Text style={styles.codeValue}>{codeLarge || '(empty)'}</Text>
                </View>
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
    sizeDescription: {
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
    inputField: {
        borderWidth: 2,
        borderColor: Colors.border,
        borderRadius: BorderRadius.md,
        color: Colors.text,
        backgroundColor: Colors.surface,
    },
    inputFieldSmall: {
        width: OTPSizes.small.width,
        height: OTPSizes.small.height,
        fontSize: OTPSizes.small.fontSize,
        borderWidth: 2,
        borderColor: Colors.border,
        borderRadius: BorderRadius.md,
        color: Colors.text,
        backgroundColor: Colors.surface,
    },
    inputFieldMedium: {
        width: OTPSizes.medium.width,
        height: OTPSizes.medium.height,
        fontSize: OTPSizes.medium.fontSize,
        borderWidth: 2,
        borderColor: Colors.border,
        borderRadius: BorderRadius.md,
        color: Colors.text,
        backgroundColor: Colors.surface,
    },
    inputFieldLarge: {
        width: OTPSizes.large.width,
        height: OTPSizes.large.height,
        fontSize: OTPSizes.large.fontSize,
        borderWidth: 2,
        borderColor: Colors.border,
        borderRadius: BorderRadius.md,
        color: Colors.text,
        backgroundColor: Colors.surface,
    },
    codeDisplay: {
        padding: Spacing.lg,
        backgroundColor: Colors.surfaceAlt,
        borderRadius: BorderRadius.md,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
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
});
