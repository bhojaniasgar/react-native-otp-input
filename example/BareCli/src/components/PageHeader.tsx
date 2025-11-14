import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PageHeaderProps {
    icon: string;
    title: string;
    description: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, title, description }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.icon}>{icon}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#4A90E2',
        paddingVertical: 40,
        paddingHorizontal: 20,
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
    },
    description: {
        fontSize: 16,
        color: '#E8F4FF',
        textAlign: 'center',
    },
});

export default PageHeader;
