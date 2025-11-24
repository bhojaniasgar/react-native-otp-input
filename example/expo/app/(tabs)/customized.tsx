import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { OtpInputView } from '@bhojaniasgar/react-native-otp-input';
import PageHeader from '@/components/examples/PageHeader';
import CodeBlock from '@/components/examples/CodeBlock';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/ExampleStyles';

export default function CustomizedExample() {
    const [code, setCode] = useState('');

    const handleCodeFilled = (filledCode: string) => {
        console.log('OTP Filled:', filledCode);
        Alert.alert('Success', `OTP ${filledCode} verified!`);
    };

    const handleReset = () => {
        setCode('');
    };

    const codeExample = `<OtpInputView
  pinCount={6}
  code={code}
  onCodeChanged={setCode}
  codeInputFieldStyle={{
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    fontSize: 22,
    color: '#333',
  }}
  codeInputHighlightStyle={{
    borderColor: '#FF6B6B',
  }}
/>`;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <PageHeader
                icon="🎨"
                title="Customized OTP"
                description="Fully customizable styling and appearance"
            />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Custom Styled</Text>

                <View style={styles.otpWrapper}>
                    <OtpInputView
                        pinCount={6}
                        code={code}
                        onCodeChanged={setCode}
                        onCodeFilled={handleCodeFilled}
                        autoFocusOnLoad={false}
                        codeInputFieldStyle={styles.inputField}
                        codeInputHighlightStyle={styles.inputFieldFocused}
                        filledInputFieldStyle={styles.inputFieldFilled}
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

            <View style={styles.featuresSection}>
                <Text style={styles.featuresTitle}>Customization Options:</Text>
                <View style={styles.featureItem}>
                    <Text style={styles.featureBullet}>✓</Text>
                    <Text style={styles.featureText}>Custom colors and borders</Text>
                </View>
                <View style={styles.featureItem}>
                    <Text style={styles.featureBullet}>✓</Text>
                    <Text style={styles.featureText}>Adjustable sizes and spacing</Text>
                </View>
                <View style={styles.featureItem}>
                    <Text style={styles.featureBullet}>✓</Text>
                    <Text style={styles.featureText}>Focus and filled states</Text>
                </View>
                <View style={styles.featureItem}>
                    <Text style={styles.featureBullet}>✓</Text>
                    <Text style={styles.featureText}>Border radius and shadows</Text>
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
        marginBottom: Spacing.xl,
    },
    otpWrapper: {
        width: '100%',
        paddingVertical: Spacing.xl,
        alignItems: 'center',
        overflow: 'visible',
    },
    inputField: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderColor: '#E5E5E5',
        borderRadius: 12,
        fontSize: 22,
        color: '#333',
        backgroundColor: '#FAFAFA',
    },
    inputFieldFocused: {
        borderColor: Colors.secondary,
        backgroundColor: Colors.surface,
        borderWidth: 2,
    },
    inputFieldFilled: {
        backgroundColor: Colors.secondaryLight,
        borderColor: Colors.secondary,
    },
    buttonRow: {
        marginTop: Spacing.xl,
    },
    resetButton: {
        backgroundColor: Colors.secondary,
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
        color: Colors.secondary,
        fontFamily: 'monospace',
    },
    featuresSection: {
        backgroundColor: '#F0F9FF',
        borderRadius: BorderRadius.lg,
        padding: Spacing.xl,
        marginHorizontal: Spacing.lg,
        marginBottom: Spacing.xl,
        borderLeftWidth: 4,
        borderLeftColor: Colors.primary,
    },
    featuresTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: Spacing.md,
    },
    featureItem: {
        flexDirection: 'row',
        marginBottom: Spacing.sm,
        alignItems: 'center',
    },
    featureBullet: {
        fontSize: 16,
        color: Colors.primary,
        marginRight: Spacing.sm,
        fontWeight: 'bold',
    },
    featureText: {
        flex: 1,
        fontSize: 14,
        color: Colors.textSecondary,
    },
});
