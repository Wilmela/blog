import Category from "../models/Category.js";

export const category = async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const cat = await newCat.save();
    res.status(200).json(cat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllCats = async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json(cats);
  } catch (error) {
    res.status(500).json(error);
  }
};
