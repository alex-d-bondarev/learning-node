const {body, validationResult, param} = require("express-validator");

const createBookValidation = [
    body("bookName")
        .notEmpty().withMessage((value, {req}) => req.t("bookNameRequiredValidation"))
        .isLength({min: 5, max: 100}).withMessage((value, {req}) => req.t("bookNameLengthValidation")),
    body("price")
        .notEmpty().withMessage((value, {req}) => req.t("bookPriceRequiredValidation"))
        .isFloat({min: 0.01, max: 10000}).withMessage((value, {req}) => req.t("bookPriceValueValidation")),
    body("countInStock")
        .notEmpty().withMessage((value, {req}) => req.t("bookStockRequiredValidation"))
        .isInt({min: 0, max: 100}).withMessage((value, {req}) => req.t("bookStockValueValidation")),
    body("image")
        .notEmpty().withMessage((value, {req}) => req.t("bookImageRequiredValidation"))
        .isURL().withMessage((value, {req}) => req.t("bookImageValueValidation"))
]

const updateBookValidation = [
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

const idValidation = [
    param("id").isMongoId().withMessage("Invalid Book ID"),
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
    idValidation,
    updateBookValidation,
    handleValidationErrors,
}
