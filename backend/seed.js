// backend/seed.js

const mongoose = require('mongoose');
const Inventory = require('./models/inventory').default;

mongoose.connect('mongodb://localhost:27017/inventory', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  seedData();
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

const sampleData = [
  { name: "Seiko 5", brand: "Seiko", qty: 10, price: 1500000 },
  { name: "Casio G-Shock", brand: "Casio", qty: 20, price: 2000000 },
  { name: "Citizen Eco-Drive", brand: "Citizen", qty: 15, price: 2500000 },
  { name: "Tissot Le Locle", brand: "Tissot", qty: 5, price: 5000000 },
  { name: "Omega Seamaster", brand: "Omega", qty: 3, price: 30000000 },
  { name: "Rolex Submariner", brand: "Rolex", qty: 2, price: 75000000 },
  { name: "Timex Weekender", brand: "Timex", qty: 25, price: 750000 },
  { name: "Swatch Originals", brand: "Swatch", qty: 30, price: 1000000 },
  { name: "Hamilton Khaki Field", brand: "Hamilton", qty: 7, price: 6000000 },
  { name: "Orient Bambino", brand: "Orient", qty: 12, price: 2000000 }
];

const seedData = async () => {
  try {
    await Inventory.deleteMany({});
    await Inventory.insertMany(sampleData);
    console.log('Sample data inserted');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error inserting sample data:', err.message);
    mongoose.connection.close();
  }
};
