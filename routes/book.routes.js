const express = require('express');

const router = express.Router();
const BookModel = require("../models/book.model");
const {
    createBookValidation, idValidation, updateBookValidation, handleValidationErrors
} = require("../validators/book.validator");


router.post(
    "/", createBookValidation, handleValidationErrors, async (req, res) => {
        try {
            const newBook = await BookModel.create(req.body)
            res.status(201).json(newBook)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    })

router.get("/", async (req, res) => {
    try {
        const bookList = await BookModel.find()
        res.status(200).send(bookList)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get("/:id", idValidation, handleValidationErrors, async (req, res) => {
        try {
            const {id} = req.params
            const book = await BookModel.findById(id)

            if (!book) {
                res.status(404).json({message: `Book with ID ${id} not found`})
            }

            res.status(200).json(book)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
)

router.delete("/:id", idValidation, handleValidationErrors, async (req, res) => {
        try {
            const {id} = req.params
            const deletedBook = await BookModel.findByIdAndDelete(id)

            if (!deletedBook) {
                res.status(404).json({message: `Book with ID ${id} not found`})
            }
            res.status(200).json({message: `Book with ID ${id} deleted successfully`})
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
)

router.put("/:id", idValidation, updateBookValidation, handleValidationErrors, async (req, res) => {
    try {
        const {id} = req.params
        const updatedBook = await BookModel.findByIdAndUpdate(id, req.body, {new: true})

        if (!updatedBook) {
            res.status(404).json({message: `Book with ID ${id} not found`})
        }
        res.status(200).json({message: `Book with ID ${id} updated successfully`, updatedBook})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router
