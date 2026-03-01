const Product = require('../Models/product');
const Cart = require('../Models/cart');

const addtoCart = async (req, res) => {
    const { productId, quantity } = req.body;
    console.log(productId)
    try {
        //check if products exists or not
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        //chech if cart exists for user
        const cart = await Cart.findOne({ user: req.userId });
        if (!cart) {
            //Create new cart
            const newCart = await Cart.create({
                user: req.userId,
                products: [{ product: productId, quantity }],
            });
            return res.status(201).json(newCart);
        }

        //Cart exists, update it
        //findIndex is array method in javascript
        const index = cart.products.findIndex(
            (p) => p.product.toString() === productId
        );
        if (index > -1) {
            //Product exists in cart, update quantity
            cart.products[index].quantity += quantity;
        } else {
            ////New product, add to cart
            cart.products.push({ product: productId, quantity });
        }
        await cart.save();
        res.json({message: 'product added to cart'});

    } catch (error) {
console.error(error);
res.status(500).json({ message: 'Server error'});
    }
}

const getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.userId })
            .populate("products.product");

        if (!cart) {
            return res.json({ products: [] });
        }

        res.json({ products: cart.products });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteFormCart = async (req, res) => {
    const { productId } = req.params;

    try {
        const cart = await Cart.findOne({ user: req.userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        console.log("Cart products:", cart.products);
        console.log("Product ID from params:", productId);

        const index = cart.products.findIndex(
            (p) => p.product.toString() === productId
        );

        console.log("Index found:", index);

        if (index === -1) {
            return res.status(404).json({ message: "Product not in cart" });
        }

        cart.products.splice(index, 1);
        await cart.save();

        res.json({ message: "Removed from cart" });

    } catch (error) {
        console.error("DELETE ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { addtoCart, getUserCart, deleteFormCart };