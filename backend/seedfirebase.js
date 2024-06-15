// Import the Firebase Admin SDK
const admin = require('firebase-admin');

// Import your Firebase service account key
const serviceAccount = require('./bejamoyon-firebase-adminsdk-elnvi-fee21d4d91.json');

// Initialize Firebase Admin SDK with your service account key
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://bejamoyon-default-rtdb.asia-southeast1.firebasedatabase.app/'// Replace with your Firebase project URL
});
//heloo
// Get a reference to your Firebase Realtime Database
const db = admin.database();

// Define the initial data to be seeded
const initialData = [
    {
        "brand": "Rolex",
        "model": "Submariner",
        "quantity": 5,
        "price": 10000,
        "location": "New York"
      },
      {
        "brand": "Omega",
        "model": "Speedmaster",
        "quantity": 8,
        "price": 8000,
        "location": "London"
      },
      {
        "brand": "TAG Heuer",
        "model": "Carrera",
        "quantity": 3,
        "price": 5000,
        "location": "Paris"
      },
      {
        "brand": "Seiko",
        "model": "Prospex",
        "quantity": 12,
        "price": 2000,
        "location": "Tokyo"
      },
      {
        "brand": "Patek Philippe",
        "model": "Nautilus",
        "quantity": 4,
        "price": 30000,
        "location": "Geneva"
      },
      {
        "brand": "Audemars Piguet",
        "model": "Royal Oak",
        "quantity": 6,
        "price": 25000,
        "location": "Zurich"
      },
      {
        "brand": "Casio",
        "model": "G-Shock",
        "quantity": 15,
        "price": 200,
        "location": "Osaka"
      },
      {
        "brand": "Fossil",
        "model": "Grant",
        "quantity": 10,
        "price": 150,
        "location": "Miami"
      },
      {
        "brand": "Tissot",
        "model": "Le Locle",
        "quantity": 7,
        "price": 600,
        "location": "Switzerland"
      },
      {
        "brand": "Hublot",
        "model": "Big Bang",
        "quantity": 2,
        "price": 35000,
        "location": "Milan"
      }
];

// Function to seed the data into Firebase Realtime Database
const seedData = async () => {
  try {
      // Set the data under 'inventory' node in your database
      await db.ref('inventory').set(initialData);
      console.log('Initial data seeded successfully.');
  } catch (error) {
      console.error('Error seeding initial data:', error);
  } finally {
      // Exit the script
      process.exit();
  }
};

// Call the seedData function to start seeding the data
seedData();