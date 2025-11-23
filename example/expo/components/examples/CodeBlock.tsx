import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// Conditionally import clipboard - it's optional
let Clipboard: any = null;
try {
    Clipboard = require('@react-native-clipboard/clipboard');
} catch (e) {
    // Clipboard not available in Expo Go
    console.warn('Clipboard not available');
}

interface CodeBlockProps {
    code: string;
    title?: string;
    language?: string;
    useLiquidGlass?: boolean;
}

export default function CodeBlock({ code, title = 'Code Example', language = 'typescript', useLiquidGlass = false }: CodeBlockProps) {
    const handleCopy = () => {
        if (Clipboard && Clipboard.setString) {
            Clipboard.setString(code);
            Alert.alert('Copied!', 'Code copied to clipboard');
        } else {
            Alert.alert('Copy Not Available', 'Clipboard is not available in Expo Go. Use a development build for full functionality.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
                    <Text style={styles.copyButtonText}>Copy</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.codeContainer}>
                <Text style={styles.code}>{code}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginBottom: 20,
        borderRadius: 12,
        backgroundColor: '#1E1E1E',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#2D2D2D',
        borderBottomWidth: 1,
        borderBottomColor: '#3D3D3D',
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#E0E0E0',
    },
    copyButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#4A90E2',
        borderRadius: 6,
    },
    copyButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    codeContainer: {
        padding: 16,
    },
    code: {
        fontFamily: 'Courier',
        fontSize: 13,
        color: '#D4D4D4',
        lineHeight: 20,
    },
});
