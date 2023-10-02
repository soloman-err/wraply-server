const db = require('../config/db');
// console.log(db.connect.collection);

async function getAllProducts(req, res) {
  try {
    const database = await db.connect();
    const productsCollection = database.collection('products');
    const products = await productsCollection.find({}).toArray();
    if (!products) {
      console.error('No products found in the database.');
      return res.status(404).json({ error: 'No products found' });
    }
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllProducts,
};
