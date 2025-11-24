import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { OtpInputView } from '@bhojaniasgar/react-native-otp-input';
import PageHeader from '@/components/examples/PageHeader';
import CodeBlock from '@/components/examples/CodeBlock';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/ExampleStyles';

export default function BasicExample() {
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
    <>
      <Stack.Screen
        options={{
          title: 'Basic',
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'systemMaterial',
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        contentInsetAdjustmentBehavior="automatic">
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
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingTop: 20,
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
  buttonRow: {
    marginTop: Spacing.xl,
  },
  resetButton: {
    backgroundColor: Colors.primary,
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
    color: Colors.primary,
    fontFamily: 'monospace',
  },
});
