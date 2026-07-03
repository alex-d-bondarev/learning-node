const {body, validationResult, param} = require("express-validator");

const createBookValidation = [
    body("bookName")
        .notEmpty().withMessage("Book name is required.")
        .isLength({min: 5, max: 100}).withMessage("Book name must be between 5 and 100 characters."),
    body("price")
        .notEmpty().withMessage("Price is required.")
        .isFloat({min: 0.01, max: 10000}).withMessage("Price must be between $0.01 and $10,000."),
    body("countInStock")
        .notEmpty().withMessage("Stock count is required.")
        .isInt({min: 0, max: 100}).withMessage("Stock count must be between 1 and 100 (inclusive)."),
    body("image")
        .notEmpty().withMessage("Image URL is required.")
        .isURL().withMessage("Image must be a valid URL.")
]

const updateBookValidation = [
    param("id")
        .isMongoId().withMessage("Invalid Book ID."),
    body("bookName")
        .optional()
        .isLength({min: 5, max: 100}).withMessage("Book name must be between 5 and 100 characters."),
    body("price")
        .optional()
        .isFloat({min: 0.01, max: 10000}).withMessage("Price must be between $0.01 and $10,000."),
    body("countInStock")
        .optional()
        .isInt({min: 0, max: 100}).withMessage("Stock count must be between 1 and 100."),
    body("image")
        .optional()
        .isURL().withMessage("Image must be a valid URL.")
]

const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({errors: validationErrors.array()})
    }
    next()
}

module.exports = {
    createBookValidation,
    updateBookValidation,
    handleValidationErrors,
}
