import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import OTPInputView from '@bhojaniasgar/react-native-otp-input';
import PageHeader from '../components/PageHeader';
import CodeBlock from '../components/CodeBlock';

const SizeVariantsExample = () => {
    const [smallCode, setSmallCode] = useState('');
    const [mediumCode, setMediumCode] = useState('');
    const [largeCode, setLargeCode] = useState('');

    const handleResetAll = () => {
        setSmallCode('');
        setMediumCode('');
        setLargeCode('');
    };

    const codeExample = `// Small
<OTPInputView size="small" />

// Medium (default)
<OTPInputView size="medium" />

// Large
<OTPInputView size="large" />`;

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            bottomOffset={20}
        >
            <PageHeader
                icon="📏"
                title="Size Variants"
                description="Different sizes for various use cases"
            />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Small</Text>
                <View style={styles.otpWrapper}>
                    <OTPInputView
                        pinCount={6}
                        code={smallCode}
                        onCodeChanged={setSmallCode}
                        autoFocusOnLoad={false}
                        size="small"
                    />
                </View>
                <View style={styles.codeDisplay}>
                    <Text style={styles.codeLabel}>Code:</Text>
                    <Text style={styles.codeValue}>{smallCode || '(empty)'}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Medium (Default)</Text>
                <View style={styles.otpWrapper}>
                    <OTPInputView
                        pinCount={6}
                        code={mediumCode}
                        onCodeChanged={setMediumCode}
                        autoFocusOnLoad={false}
                        size="medium"
                    />
                </View>
                <View style={styles.codeDisplay}>
                    <Text style={styles.codeLabel}>Code:</Text>
                    <Text style={styles.codeValue}>{mediumCode || '(empty)'}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Large</Text>
                <View style={styles.otpWrapper}>
                    <OTPInputView
                        pinCount={6}
                        code={largeCode}
                        onCodeChanged={setLargeCode}
                        autoFocusOnLoad={false}
                        size="large"
                    />
                </View>
                <View style={styles.codeDisplay}>
                    <Text style={styles.codeLabel}>Code:</Text>
                    <Text style={styles.codeValue}>{largeCode || '(empty)'}</Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.resetButton} onPress={handleResetAll}>
                    <Text style={styles.resetButtonText}>Reset All</Text>
                </TouchableOpacity>
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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    otpWrapper: {
        width: '100%',
        paddingVertical: 16,
        alignItems: 'center',
        overflow: 'visible',
    },
    codeDisplay: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    codeLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginRight: 8,
    },
    codeValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4A90E2',
        fontFamily: 'monospace',
    },
    buttonContainer: {
        marginHorizontal: 16,
        marginBottom: 20,
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
});

export default SizeVariantsExample;
