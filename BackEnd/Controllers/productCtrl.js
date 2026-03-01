const Product = require("../Models/product");

//1. create product
const CreateProduct = async (req, res) => {
    try {
        const checkProduct = await product.findOne({ productName: req.body.productName });
        if (checkProduct) {
            return res.status(401).json({ errorMessage: 'Product already exists' });
        }
        const addaProduct = await product.create({
            productName: req.body.productName,
            price: req.body.price,
            discount: req.body.discount,
            outOfStock: req.body.outOfStock,
            img: req.body.img
        });
        res.status(200).json({ message: 'Producted Created', data: addaProduct });
    } catch (error) {
        res.status(503).json({ errorMessage: 'Something Went Wrong' });
    }
};

// 2. Get All Products(Existing)
const getAllProducts = async(req, res) => {
    
    try {
        const products = await Product.find({});
        console.log("Products fetched:", products); // ADD THIS
        res.status(200).json({ message: "Success", data: products });
    } catch (error) {
        console.log("🔥 REAL ERROR:", error); // VERY IMPORTANT
        res.status(503).json({ errorMessage: "Something Went Wrong" });
    }
};


// 3.Get Single Product (Existing)
// 3. Get Single Product
const singleProduct = async (req, res) => {
    try {
        console.log("Requested ID:", req.params.id);

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Success",
            data: product
        });

    } catch (error) {
        console.log("🔥 SINGLE PRODUCT ERROR:", error);
        res.status(500).json({ errorMessage: "Server error" });
    }
};

// 4. Update Product (NEW - FOR EDIT)
const updateProduct = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("ID:", req.params.id);

    const updated = await product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    console.log("Updated:", updated);

    res.status(200).json({
      message: "Product Updated Successfully",
      data: updated
    });

  } catch (error) {
    console.log("🔥 REAL ERROR:", error);
    res.status(500).json({ errorMessage: "Something went wrong" });
  }
};

// 5. Delete Product (NEW - FOR DELETE)
const deleteProduct = async (req,res) => {
    try {
        await product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product Deleted Successfully"});
    } catch (error) {
        res.status(503).json({ errorMessage: 'Something Went Wrong' });
    }
}

module.exports = { CreateProduct, getAllProducts, singleProduct, updateProduct, deleteProduct };