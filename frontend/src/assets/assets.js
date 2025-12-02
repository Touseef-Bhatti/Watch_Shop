import p_img1 from './p_img1.png'
import p_img2_1 from './p_img2_1.png'
import p_img2_2 from './p_img2_1.png'
import p_img2_3 from './p_img2_1.png'
import p_img2_4 from './p_img2_1.png'
import p_img3 from './p_img3.png'
import p_img4 from './p_img4.png'
import p_img5 from './p_img5.png'
import p_img6 from './p_img6.png'
import p_img7 from './p_img7.png'
import p_img8 from './p_img8.png'
import p_img9 from './p_img9.png'
import p_img10 from './p_img10.png'
import p_img11 from './p_img11.png'
import p_img12 from './p_img12.png'
import p_img13 from './p_img13.png'
import p_img14 from './p_img14.png'
import p_img15 from './p_img15.png'
// import p_img16 from './p_img16.png'
// import p_img17 from './p_img17.png'
// import p_img18 from './p_img18.png'
// import p_img19 from './p_img19.png'
// import p_img20 from './p_img20.png'
// import p_img21 from './p_img21.png'
// import p_img22 from './p_img22.png'
// import p_img23 from './p_img23.png'
// import p_img24 from './p_img24.png'
// import p_img25 from './p_img25.png'
// import p_img26 from './p_img26.png'
// import p_img27 from './p_img27.png'
// import p_img28 from './p_img28.png'
// import p_img29 from './p_img29.png'
// import p_img30 from './p_img30.png'
// import p_img31 from './p_img31.png'
// import p_img32 from './p_img32.png'
// import p_img33 from './p_img33.png'
// import p_img34 from './p_img34.png'
// import p_img35 from './p_img35.png'
// import p_img36 from './p_img36.png'
// import p_img37 from './p_img37.png'
// import p_img38 from './p_img38.png'
// import p_img39 from './p_img39.png'
// import p_img40 from './p_img40.png'
// import p_img41 from './p_img41.png'
// import p_img42 from './p_img42.png'
// import p_img43 from './p_img43.png'
// import p_img44 from './p_img44.png'
// import p_img45 from './p_img45.png'
// import p_img46 from './p_img46.png'
// import p_img47 from './p_img47.png'
// import p_img48 from './p_img48.png'
// import p_img49 from './p_img49.png'
// import p_img50 from './p_img50.png'
// import p_img51 from './p_img51.png'
// import p_img52 from './p_img52.png'


import logo from './logo.png'
import hero_img from './hero_img.png'
import cart_icon from './cart_icon.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about_img from './about_img.png'
import contact_img from './contact_img.png'
import cross_icon from './cross_icon.png'

export const assets = {
    logo,
    hero_img,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_img,
    menu_icon,
    about_img,
    contact_img,
    cross_icon
}

export const products = [
  {
    _id: "aaaaa",
    name: "Classic Analog Watch",
    description: "Elegant analog watch with premium leather strap and timeless design.",
    price: 250,
    image: [p_img1],
    category: "Watch",
    sizes: ["38mm", "40mm", "42mm"],
    date: 1716634345448,
    bestseller: true,
  },
  {
    _id: "aaaab",
    name: "Vintage Brown Leather Watch",
    description: "Handcrafted watch with a rugged brown leather strap for casual wear.",
    price: 300,
    image: [p_img2_1, p_img2_1, p_img2_1, p_img2_1],
    category: "Watch",
    sizes: ["40mm", "42mm", "44mm"],
    date: 1716621345448,
    bestseller: false,
  },
  {
    _id: "aaaac",
    name: "Formal Black Leather Watch",
    description: "Sophisticated black leather watch designed for formal occasions.",
    price: 350,
    image: [p_img3],
    category: "Watch",
    sizes: ["38mm", "40mm", "42mm"],
    date: 1716234545448,
    bestseller: false,
  },
  {
    _id: "aaaad",
    name: "Chronograph Sports Watch",
    description: "Multi-functional chronograph watch with sporty design and durable build.",
    price: 280,
    image: [p_img4],
    category: "Watch",
    sizes: ["40mm", "42mm", "44mm", "46mm"],
    date: 1716621345448,
    bestseller: true,
  },
  {
    _id: "aaaae",
    name: "Minimalist Dress Watch",
    description: "Sleek minimalist watch ideal for business and formal attire.",
    price: 320,
    image: [p_img5],
    category: "Watch",
    sizes: ["38mm", "40mm"],
    date: 1716622345448,
    bestseller: false,
  },
  {
    _id: "aaaaf",
    name: "Smart Watch Classic",
    description: "Modern smartwatch with classic design, fitness tracking and notifications.",
    price: 450,
    image: [p_img6],
    category: "Watch",
    sizes: ["40mm", "42mm", "44mm"],
    date: 1716623423448,
    bestseller: true,
  },
  {
    _id: "aaaag",
    name: "Luxury Gold Watch",
    description: "Premium gold-plated watch with elegant design and precision movement.",
    price: 550,
    image: [p_img7],
    category: "Watch",
    sizes: ["40mm", "42mm"],
    date: 1716621542448,
    bestseller: false,
  },
  {
    _id: "aaaah",
    name: "Casual Canvas Strap Watch",
    description: "Stylish watch with canvas strap and modern dial design.",
    price: 200,
    image: [p_img8],
    category: "Watch",
    sizes: ["38mm", "40mm", "42mm"],
    date: 1716622345448,
    bestseller: false,
  },
  {
    _id: "aaaai",
    name: "Retro Vintage Watch",
    description: "Vintage style watch with classic design and nostalgic appeal.",
    price: 280,
    image: [p_img9],
    category: "Watch",
    sizes: ["38mm", "40mm"],
    date: 1716621235448,
    bestseller: false,
  },
  {
    _id: "aaaaj",
    name: "Water Resistant Diver Watch",
    description: "Professional diver watch with water resistance and robust construction.",
    price: 380,
    image: [p_img10],
    category: "Watch",
    sizes: ["42mm", "44mm", "46mm"],
    date: 1716622235448,
    bestseller: false,
  },
  {
    _id: "aaaak",
    name: "Genuine Leather Strap Watch",
    description: "Premium watch with genuine leather strap and elegant dial.",
    price: 290,
    image: [p_img11],
    category: "Watch",
    sizes: ["38mm", "40mm", "42mm"],
    date: 1716623345448,
    bestseller: false,
  },
  {
    _id: "aaaal",
    name: "Slim Minimalist Watch",
    description: "Ultra-slim watch with minimalist design and comfortable fit.",
    price: 320,
    image: [p_img12],
    category: "Watch",
    sizes: ["38mm", "40mm"],
    date: 1716624445448,
    bestseller: true,
  },
  {
    _id: "aaaam",
    name: "Travel Chronograph Watch",
    description: "Multi-timezone watch perfect for travelers with chronograph features.",
    price: 400,
    image: [p_img13],
    category: "Watch",
    sizes: ["40mm", "42mm", "44mm"],
    date: 1716625545448,
    bestseller: true,
  },
  {
    _id: "aaaan",
    name: "Vintage Leather Watch",
    description: "Timeless design watch with classic leather strap and vintage feel.",
    price: 350,
    image: [p_img14],
    category: "Watch",
    sizes: ["38mm", "40mm", "42mm"],
    date: 1716626645448,
    bestseller: false,
  },
  {
    _id: "aaaao",
    name: "Classic Dress Watch",
    description: "Elegant dress watch designed for formal occasions and special events.",
    price: 420,
    image: [p_img15],
    category: "Watch",
    sizes: ["38mm", "40mm"],
    date: 1716627745448,
    bestseller: false,
  }
]