import User from "../models/User.model.js"
import Prompt from "../models/Prompt.model.js"
import Category from "../models/Category.model.js"

const DEMO_MAX_AGE_MS = 24 * 60 * 60 * 1000

export const cleanupExpiredDemoUsers = async () => {
    const expirationDate = new Date(Date.now() - DEMO_MAX_AGE_MS)

    const expiredDemoUsers = await User.find({
        isDemo: true,
        createdAt: {$lt: expirationDate}
    }).select("_id")

    if (!expiredDemoUsers.length) {
        return {
            deletedUsers: 0,
            deletedPrompts: 0,
            deletedCategories: 0
        }
    }

    const demoUserIds = expiredDemoUsers.map((user) => user._id)

    const deletedPromptsResult = await Prompt.deleteMany({
        user: {$in: demoUserIds}
    })

    const deletedCategoriesResult = await Category.deleteMany({
        user: {$in: demoUserIds}
    })

    const deletedUsersResult = await User.deleteMany({
        _id: {$in: demoUserIds},
        isDemo: true
    })

    return {
        deletedUsers: deletedUsersResult.deletedCount ?? 0,
        deletedPrompts: deletedPromptsResult.deletedCount ?? 0,
        deletedCategories: deletedCategoriesResult.deletedCount ?? 0
    }
}

export default cleanupExpiredDemoUsers
