import Prompt from "../models/Prompt.model.js";

export const getDashboardStats = async (req, res) => {
    try {
        const userId = req.user._id

        const [totalPrompts, totalFavorites, recentPrompts, promptsByCategory] = await Promise.all([Prompt.countDocuments({user: userId}), Prompt.countDocuments({
            user: userId,
            isFavorite: true
        }), Prompt.find({user: userId})
        .populate("category", "name color")
        .sort({createdAt: -1})
        .limit(5)
        .select("title description isFavorite createdAt category"), Prompt.aggregate([{
            $match: {
                user: userId
            },
        }, {
            $lookup: {
                from: "categories", localField: "category", foreignField: "_id", as: "categoryData"
            }
        }, {
            $unwind: {
                path: "$categoryData", preserveNullAndEmptyArrays: true
            }
        }, {
            $group: {
                _id: {
                    $ifNull: ["$categoryData._id", null]
                }, name: {
                    $first: {
                        $ifNull: ["$categoryData.name", "Uncategorized"]
                    }
                }, color: {
                    $first: {
                        $ifNull: ["$categoryData.color", "#94a3b8"]
                    }
                }, count: {
                    $sum: 1
                }
            },
        },
            {
                $sort: {
                    count: -1,
                    name: 1
                }
            }])])

        const usedCategoriesCount = promptsByCategory.filter(
            (item) => item._id !== null
        ).length

        return res.status(200).json({
            stats: {
                totalPrompts,
                totalFavorites,
                usedCategoriesCount
            },
            recentPrompts,
            promptsByCategory
        })
    } catch (e) {
        return res.status(500).json({
            message: "Error fetching dashboard stats."
        })
    }
}
