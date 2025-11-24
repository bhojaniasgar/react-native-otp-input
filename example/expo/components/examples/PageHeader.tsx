import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PageHeaderProps {
    icon: string;
    title: string;
    description: string;
}

export default function PageHeader({ icon, title, description }: PageHeaderProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.icon}>{icon}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 24,
        backgroundColor: '#4A90E2',
        alignItems: 'center',
    },
    icon: {
        fontSize: 48,
        marginBottom: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#E8F4FD',
        textAlign: 'center',
        lineHeight: 22,
    },
});
