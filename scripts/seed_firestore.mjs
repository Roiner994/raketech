import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  projectId: "raketech-app-2026",
  appId: "1:93292793240:web:a9c82aa56c07f8f317efed",
  storageBucket: "raketech-app-2026.firebasestorage.app",
  apiKey: "AIzaSyBL0qsRIItrY43QuySEBfV22eX5pc-0zbc",
  authDomain: "raketech-app-2026.firebaseapp.com",
  messagingSenderId: "93292793240"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const products = [
  {
    id: "prod_digital_xbox",
    title: "GAME PASS ULTIMATE",
    type: "digital",
    platform: "XBOX",
    duration: "1 MES",
    price: 3.99,
    originalPrice: 5.99,
    imageUrl: "/images/xbox_game_pass.png",
    stock: -1,
    featured: true
  },
  {
    id: "prod_digital_ps",
    title: "PS PLUS DELUXE",
    type: "digital",
    platform: "PLAYSTATION",
    duration: "3 MESES",
    price: 15.50,
    imageUrl: "/images/xbox_game_pass.png", 
    stock: -1
  },
  {
    id: "prod_digital_apple",
    title: "iCLOUD+ 200 GB",
    type: "digital",
    platform: "APPLE",
    duration: "1 MES",
    price: 2.99,
    imageUrl: "/images/apple_icloud.png",
    stock: -1
  },
  {
    id: "prod_physical_stand",
    title: "Bases y Soportes en Impresión 3D",
    type: "physical",
    material: "PLA+",
    price: 35.00,
    imageUrl: "/images/ps5_3d_stand.png",
    stock: 15,
    isNew: true
  }
];

async function seed() {
  console.log("Starting seed...");
  for (const product of products) {
    const { id, ...data } = product;
    await setDoc(doc(db, "products", id), data);
    console.log(`Seeded ${id}`);
  }
  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch(console.error);
