import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { OtpInputView } from '@bhojaniasgar/react-native-otp-input';
import PageHeader from '../components/PageHeader';
import CodeBlock from '../components/CodeBlock';

const CustomizedExample = () => {
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
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            bottomOffset={20}
        >
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
        borderColor: '#FF6B6B',
        backgroundColor: '#FFF',
        borderWidth: 2,
    },
    inputFieldFilled: {
        backgroundColor: '#FFF5F5',
        borderColor: '#FF6B6B',
    },
    buttonRow: {
        marginTop: 20,
    },
    resetButton: {
        backgroundColor: '#FF6B6B',
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
        color: '#FF6B6B',
        fontFamily: 'monospace',
    },
    featuresSection: {
        backgroundColor: '#F0F9FF',
        borderRadius: 12,
        padding: 20,
        marginHorizontal: 16,
        marginBottom: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#4A90E2',
    },
    featuresTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    featureItem: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center',
    },
    featureBullet: {
        fontSize: 16,
        color: '#4A90E2',
        marginRight: 8,
        fontWeight: 'bold',
    },
    featureText: {
        flex: 1,
        fontSize: 14,
        color: '#666',
    },
});

export default CustomizedExample;
