import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Order from '../models/Order.js';
import ImportRequest from '../models/ImportRequest.js';

const router = express.Router();

// --- PUBLIC ROUTES ---

router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/products', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query: any = {};
    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    const products = await Product.find(query).populate('category');
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// --- PROTECTED ROUTES (Customers) ---

router.post('/orders', protect, async (req, res) => {
  try {
    const { products, shippingAddress, totalAmount } = req.body;
    const order = await Order.create({
      user: req.user._id,
      products,
      shippingAddress,
      totalAmount,
    });
    res.status(201).json(order);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/my-orders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// --- ADMIN ROUTES ---

router.post('/admin/products', protect, admin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/admin/products/:id', protect, admin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/admin/orders', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find().populate('user products.product').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/admin/import-requests', protect, admin, async (req, res) => {
  try {
    const requests = await ImportRequest.find().populate('user').sort({ createdAt: -1 });
    res.json(requests);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
