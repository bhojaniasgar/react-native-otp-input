import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface CodeBlockProps {
    code: string;
    title?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, title }) => {
    return (
        <View style={styles.container}>
            {title && <Text style={styles.title}>{title}</Text>}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.codeContainer}>
                    <Text style={styles.code}>{code}</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    codeContainer: {
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#4A90E2',
    },
    code: {
        fontFamily: 'monospace',
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
});

export default CodeBlock;
