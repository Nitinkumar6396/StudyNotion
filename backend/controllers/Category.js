import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const category = await Category.create({
            name: name,
            description: description,
        })

        return res.status(200).json({
            success: true,
            message: "Category created successfully"
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}


export const showAllCategory = async (req, res) => {
    try {
        const allCategory = await Category.find({}, { name: true, description: true });
        return res.status(200).json({
            success: true,
            message: "All Category returned successfully",
            allCategory,
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}


export const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.body

        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required",
            });
        }

        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
}


export const getCategoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.query;
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate:[
                    {path:'instructor'},
                    {path:'ratingAndReviews'}
                ]
            })
            .exec()

        if (!selectedCategory) {
            return res.status(404).json({ success: false, message: "Category not found" })
        }

        // if (selectedCategory.courses.length === 0) {
        //     return res.status(404).json({
        //         success: false,
        //         data: null,
        //         message: "No courses found for the selected category.",
        //     })
        // }

        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        })

        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
                ._id
        )
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: 'instructor'
            })
            .exec()

        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor",
                },
            })
            .exec()

        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)

        res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}