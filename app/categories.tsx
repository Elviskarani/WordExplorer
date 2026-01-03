import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Sizes } from '../constants/Sizes';
import { CATEGORIES } from '../constants/GameData';
import Header from '../components/shared/Header';
import CategoryCard from '../components/categories/CategoryCard';
import AnimatedCard from '../components/shared/AnimatedCard';

export default function CategoriesScreen() {
    const router = useRouter();

    const handleBackPress = () => {
        router.back();
    };

    const handleCategoryPress = (categoryId: string) => {
        // Navigate to gameplay with selected category
        router.push({
            pathname: '/gameplay',
            params: { categoryId },
        });
    };

    const handleHomePress = () => {
        router.push('/');
    };

    const handleSettingsPress = () => {
        router.push('../../shared/SettingsModal');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <Header
                    title="Let's Explore Words!"
                    showBack={true}
                    onBackPress={handleBackPress}
                    score={120}
                />

                {/* Content */}
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Pick a Topic Text */}
                    <Text style={styles.pickTopicText}>PICK A TOPIC</Text>

                    {/* Categories Grid */}
                    <View style={styles.grid}>
                        {CATEGORIES.map((category, index) => (
                            <AnimatedCard key={category.id} delay={index * 100}>
                                <CategoryCard
                                    title={category.title}
                                    icon={category.icon}
                                    color={category.color}
                                    onPress={() => handleCategoryPress(category.id)}
                                />
                            </AnimatedCard>
                        ))}
                    </View>
                </ScrollView>

                {/* Bottom Navigation */}
                <View style={styles.bottomNav}>
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={handleHomePress}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="home" size={24} color={Colors.textSecondary} />
                        <Text style={styles.navLabel}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={handleSettingsPress}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="settings-outline" size={24} color={Colors.textSecondary} />
                        <Text style={styles.navLabel}>Settings</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: Sizes.lg,
    },
    pickTopicText: {
        fontSize: Sizes.fontMedium,
        fontWeight: '600',
        color: Colors.textSecondary,
        marginBottom: Sizes.lg,
        letterSpacing: 1,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Sizes.md,
        justifyContent: 'space-between',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: Sizes.md,
        paddingHorizontal: Sizes.lg,
        backgroundColor: Colors.cardBackground,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    navItem: {
        alignItems: 'center',
        gap: 4,
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    navLabel: {
        fontSize: Sizes.fontSmall,
        color: Colors.textSecondary,
        fontWeight: '500',
    },
});