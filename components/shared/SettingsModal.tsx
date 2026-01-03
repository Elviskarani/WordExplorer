import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Sizes } from '../../constants/Sizes';
import { storageService } from '../../services/StorageService';
import { hapticService } from '../../services/HapticService';

interface SettingsModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function SettingsModal({ visible, onClose }: SettingsModalProps) {
    const [haptics, setHaptics] = useState(false);

    useEffect(() => {
        if (visible) {
            loadSettings();
        }
    }, [visible]);

    const loadSettings = async () => {
        const settings = await storageService.getSettings();
        setHaptics(settings.haptics);
    };

    const handleHapticsToggle = async (value: boolean) => {
        setHaptics(value);
        await storageService.updateSettings({ haptics: value });
        if (value) {
            await hapticService.triggerSuccess();
        }
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Settings</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color={Colors.textPrimary} />
                        </TouchableOpacity>
                    </View>

                    {/* Settings Options */}
                    <View style={styles.optionsContainer}>
                        {/* Haptics */}
                        <View style={styles.option}>
                            <View style={styles.optionLeft}>
                                <View style={[styles.iconCircle, { backgroundColor: '#FFD4D4' }]}>
                                    <Ionicons name="phone-portrait-outline" size={24} color="#FF6B6B" />
                                </View>
                                <Text style={styles.optionText}>Haptics</Text>
                            </View>
                            <Switch
                                value={haptics}
                                onValueChange={handleHapticsToggle}
                                trackColor={{ false: '#D1D5DB', true: '#6BCB77' }}
                                thumbColor={Colors.cardBackground}
                            />
                        </View>
                    </View>

                    {/* Additional Options */}
                    <View style={styles.additionalOptions}>
                        <TouchableOpacity style={styles.additionalOption}>
                            <Text style={styles.additionalOptionText}>About</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.additionalOption}>
                            <Text style={styles.additionalOptionText}>Privacy Policy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.additionalOption}>
                            <Text style={styles.additionalOptionText}>Help & Support</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: '#B8E6FF',
        borderTopLeftRadius: Sizes.radiusXLarge,
        borderTopRightRadius: Sizes.radiusXLarge,
        paddingBottom: Sizes.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.lg,
        paddingVertical: Sizes.lg,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: Sizes.fontXXLarge,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: Sizes.radiusFull,
        backgroundColor: Colors.cardBackground,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionsContainer: {
        paddingHorizontal: Sizes.lg,
        paddingVertical: Sizes.lg,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.cardBackground,
        paddingHorizontal: Sizes.md,
        paddingVertical: Sizes.md,
        borderRadius: Sizes.radiusMedium,
        marginBottom: Sizes.md,
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Sizes.md,
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: Sizes.radiusFull,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionText: {
        fontSize: Sizes.fontLarge,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    additionalOptions: {
        paddingHorizontal: Sizes.lg,
    },
    additionalOption: {
        paddingVertical: Sizes.md,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    additionalOptionText: {
        fontSize: Sizes.fontMedium,
        color: Colors.textSecondary,
    },
});