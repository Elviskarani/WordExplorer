import * as Haptics from 'expo-haptics';
import { storageService } from './StorageService';

class HapticService {
    async triggerSuccess() {
        const settings = await storageService.getSettings();
        if (settings.haptics) {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
    }

    async triggerError() {
        const settings = await storageService.getSettings();
        if (settings.haptics) {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
    }
}

export const hapticService = new HapticService();
