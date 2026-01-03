// Note: In a real app, you would use AsyncStorage from @react-native-async-storage/async-storage
// For this example, we'll use a simple in-memory storage that persists during the session

interface UserProgress {
    totalScore: number;
    totalStars: number;
    levelsCompleted: string[];
    categoryProgress: {
        [categoryId: string]: {
            completed: boolean;
            stars: number;
            bestScore: number;
        };
    };
    unlockedStickers: string[];
    settings: {
        music: boolean;
        sounds: boolean;
        haptics: boolean;
    };
    dailyWord: {
        date: string;
        completed: boolean;
        streak: number;
    };
}

class StorageService {
    private storage: Map<string, any>;

    constructor() {
        this.storage = new Map();
        this.initializeDefaultData();
    }

    private initializeDefaultData() {
        const defaultProgress: UserProgress = {
            totalScore: 120,
            totalStars: 0,
            levelsCompleted: [],
            categoryProgress: {},
            unlockedStickers: ['welcome', 'first_star'],
            settings: {
                music: true,
                sounds: true,
                haptics: true,
            },
            dailyWord: {
                date: '',
                completed: false,
                streak: 0,
            },
        };

        this.storage.set('userProgress', defaultProgress);
    }

    // Get user progress
    async getUserProgress(): Promise<UserProgress> {
        return this.storage.get('userProgress') || this.initializeDefaultData();
    }

    // Update total score
    async updateTotalScore(points: number): Promise<void> {
        const progress = await this.getUserProgress();
        progress.totalScore += points;
        this.storage.set('userProgress', progress);
    }

    // Save category progress
    async saveCategoryProgress(
        categoryId: string,
        stars: number,
        score: number
    ): Promise<void> {
        const progress = await this.getUserProgress();

        const currentCategoryProgress = progress.categoryProgress[categoryId] || {
            completed: false,
            stars: 0,
            bestScore: 0,
        };

        progress.categoryProgress[categoryId] = {
            completed: true,
            stars: Math.max(currentCategoryProgress.stars, stars),
            bestScore: Math.max(currentCategoryProgress.bestScore, score),
        };

        if (!progress.levelsCompleted.includes(categoryId)) {
            progress.levelsCompleted.push(categoryId);
        }

        progress.totalStars += stars;
        this.storage.set('userProgress', progress);
    }

    // Unlock sticker
    async unlockSticker(stickerId: string): Promise<void> {
        const progress = await this.getUserProgress();
        if (!progress.unlockedStickers.includes(stickerId)) {
            progress.unlockedStickers.push(stickerId);
            this.storage.set('userProgress', progress);
        }
    }

    // Get unlocked stickers
    async getUnlockedStickers(): Promise<string[]> {
        const progress = await this.getUserProgress();
        return progress.unlockedStickers;
    }

    // Update settings
    async updateSettings(settings: Partial<UserProgress['settings']>): Promise<void> {
        const progress = await this.getUserProgress();
        progress.settings = { ...progress.settings, ...settings };
        this.storage.set('userProgress', progress);
    }

    // Get settings
    async getSettings(): Promise<UserProgress['settings']> {
        const progress = await this.getUserProgress();
        return progress.settings;
    }

    // Update daily word
    async completeDailyWord(): Promise<void> {
        const progress = await this.getUserProgress();
        const today = new Date().toDateString();

        if (progress.dailyWord.date === today) {
            return; // Already completed today
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (progress.dailyWord.date === yesterday.toDateString()) {
            progress.dailyWord.streak += 1;
        } else {
            progress.dailyWord.streak = 1;
        }

        progress.dailyWord.date = today;
        progress.dailyWord.completed = true;
        this.storage.set('userProgress', progress);
    }

    // Check if daily word is completed
    async isDailyWordCompleted(): Promise<boolean> {
        const progress = await this.getUserProgress();
        const today = new Date().toDateString();
        return progress.dailyWord.date === today && progress.dailyWord.completed;
    }

    // Get daily word streak
    async getDailyWordStreak(): Promise<number> {
        const progress = await this.getUserProgress();
        return progress.dailyWord.streak;
    }

    // Reset progress (for testing)
    async resetProgress(): Promise<void> {
        this.initializeDefaultData();
    }
}

export const storageService = new StorageService();
export type { UserProgress };