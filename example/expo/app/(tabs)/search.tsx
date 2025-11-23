import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, Link, Href } from 'expo-router';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/ExampleStyles';

interface TabItem {
    name: string;
    route: string;
    icon: string;
    description: string;
    keywords: string[];
}

const TABS: TabItem[] = [
    {
        name: 'Basic',
        route: 'index',
        icon: '🏠',
        description: 'Simple 6-digit OTP input with default styling',
        keywords: ['basic', 'simple', 'default', 'home', 'start', 'begin'],
    },
    {
        name: 'Custom',
        route: 'customized',
        icon: '🎨',
        description: 'Customized OTP with colors, borders, and styling',
        keywords: ['custom', 'style', 'color', 'design', 'theme', 'personalize'],
    },
    {
        name: 'Auto-Fill',
        route: 'autofill',
        icon: '⚡',
        description: 'Automatic OTP detection from SMS',
        keywords: ['autofill', 'auto', 'sms', 'automatic', 'detect', 'message'],
    },
    {
        name: 'Sizes',
        route: 'sizes',
        icon: '📏',
        description: 'Different size variants: small, medium, large',
        keywords: ['size', 'small', 'medium', 'large', 'scale', 'dimension'],
    },
    {
        name: 'Error',
        route: 'error',
        icon: '⚠️',
        description: 'Error states and validation examples',
        keywords: ['error', 'validation', 'invalid', 'warning', 'alert', 'wrong'],
    },
    {
        name: 'Advanced',
        route: 'advanced',
        icon: '⚙️',
        description: 'All configuration options and features',
        keywords: ['advanced', 'config', 'options', 'settings', 'all', 'complete'],
    },
];

export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTabs =
        searchQuery === ''
            ? TABS
            : TABS.filter((tab) => {
                const query = searchQuery.toLowerCase();
                return (
                    tab.name.toLowerCase().includes(query) ||
                    tab.description.toLowerCase().includes(query) ||
                    tab.keywords.some((keyword) => keyword.includes(query))
                );
            });

    const handleSearchChange = (text: string) => {
        setSearchQuery(text);
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'All Examples',
                    headerLargeTitle: true,
                    headerTransparent: true,
                    headerBlurEffect: 'systemMaterial',
                    headerSearchBarOptions: {
                        placeholder: 'Search examples...',
                        onChangeText: (event: any) => handleSearchChange(event.nativeEvent.text),
                        hideWhenScrolling: false,
                        autoCapitalize: 'none',
                    },
                }}
            />
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.resultsContent}
                contentInsetAdjustmentBehavior="automatic"
                keyboardShouldPersistTaps="handled">
                {filteredTabs.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>😕</Text>
                        <Text style={styles.emptyTitle}>No Results</Text>
                        <Text style={styles.emptyDescription}>
                            Try searching for "basic", "custom", "error", "sms", etc.
                        </Text>
                    </View>
                ) : (
                    <View style={styles.resultsList}>
                        <Text style={styles.resultsCount}>
                            {filteredTabs.length} {filteredTabs.length === 1 ? 'example' : 'examples'}
                        </Text>
                        {filteredTabs.map((tab) => (
                            <Link key={tab.route} href={`/(tabs)/${tab.route}` as Href} asChild>
                                <Pressable style={styles.tabCard}>
                                    <View style={styles.tabIconContainer}>
                                        <Text style={styles.tabIcon}>{tab.icon}</Text>
                                    </View>
                                    <View style={styles.tabInfo}>
                                        <Text style={styles.tabName}>{tab.name}</Text>
                                        <Text style={styles.tabDescription}>{tab.description}</Text>
                                    </View>
                                    <Text style={styles.chevron}>›</Text>
                                </Pressable>
                            </Link>
                        ))}
                    </View>
                )}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    resultsContent: {
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.lg,
        paddingBottom: 40,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: Spacing.lg,
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: Spacing.sm,
    },
    emptyDescription: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
    },
    resultsList: {
        gap: Spacing.md,
    },
    resultsCount: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textSecondary,
        marginBottom: Spacing.sm,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    tabCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        ...Shadows.medium,
    },
    tabIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.surfaceAlt,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.md,
    },
    tabIcon: {
        fontSize: 24,
    },
    tabInfo: {
        flex: 1,
    },
    tabName: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 4,
    },
    tabDescription: {
        fontSize: 14,
        color: Colors.textSecondary,
        lineHeight: 18,
    },
    chevron: {
        fontSize: 28,
        color: Colors.textSecondary,
        marginLeft: Spacing.sm,
    },
});
