import user from "/images/img/user.jpg";

import property1a from "/images/property/101.avif";
import property1b from "/images/property/102.avif";
import property1c from "/images/property/103.avif";
import property1d from "/images/property/104.avif";
import property1e from "/images/property/105.avif";
import property2a from "/images/property/201.avif";
import property2b from "/images/property/202.avif";
import property2c from "/images/property/203.avif";
import property2d from "/images/property/204.avif";
import property3a from "/images/property/301.avif";
import property3b from "/images/property/302.avif";
import property3c from "/images/property/303.avif";
import property3d from "/images/property/304.avif";
import property4a from "/images/property/401.avif";
import property4b from "/images/property/402.avif";
import property4c from "/images/property/403.avif";
import property4d from "/images/property/404.avif";

import ctaImg from "/images/banner/cta1.png";

import user1 from "/images/host/1.avif";
import user2 from "/images/host/2.avif";
import user3 from "/images/host/3.avif";
import user4 from "/images/host/4.avif";
import user5 from "/images/host/5.avif";

export const assets = {
  img: { user: user, ctaImg, host: user3 },
  listing: { property1a, property2a, property3a, property4a },
};

export const properties = [
  {
    id: 1,
    title: "Modern Apartment in Nyarutarama",
    description: `
          <h2>Modern Apartment in Nyarutarama</h2>
          <p>Experience luxury in the heart of Kigali with this modern apartment located in the upscale Nyarutarama neighborhood. This property offers a serene environment with close proximity to the city's vibrant attractions.</p>
          <h3>Amenities:</h3>
          <ul>
            <li>2 spacious bedrooms with en-suite bathrooms</li>
            <li>2 bathrooms</li>
            <li>Property size: 120 sqm</li>
            <li>Fully equipped kitchen with modern appliances</li>
            <li>High-speed Wi-Fi and smart TV</li>
            <li>24/7 security and secure parking</li>
            <li>Access to a communal swimming pool and gym</li>
            <li>Air conditioning and heating</li>
            <li>Balcony with city view</li>
          </ul>
          <h3>Nearby Attractions:</h3>
          <ul>
            <li>Nyarutarama Golf Club - 5-minute walk</li>
            <li>Kigali Convention Centre - 10-minute drive</li>
            <li>Inema Art Center - 8-minute drive</li>
          </ul>
          <p>Perfect for business travelers and tourists seeking comfort and convenience in Kigali.</p>
        `,
    price: 120,
    bedrooms: 2,
    bathrooms: 2,
    size: "120 sqm",
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    petFriendly: false,
    location: "Nyarutarama, Kigali, Rwanda",
    hostId: 1,
    thumbnail: property1a,
    gallery: [property1a, property1b, property1c, property1d, property1e],
  },
  {
    id: 2,
    title: "Cozy Cottage in Kimihurura",
    description: `
          <h2>Cozy Cottage in Kimihurura</h2>
          <p>Nestled in the peaceful suburb of Kimihurura, this charming cottage offers a homely atmosphere with modern conveniences. Ideal for families and small groups.</p>
          <h3>Amenities:</h3>
          <ul>
            <li>3 bedrooms with comfortable bedding</li>
            <li>2 bathrooms</li>
            <li>Property size: 150 sqm</li>
            <li>Fully equipped kitchen and dining area</li>
            <li>Private garden and outdoor seating</li>
            <li>Free Wi-Fi and cable TV</li>
            <li>Housekeeping services available upon request</li>
            <li>Fireplace for cozy nights</li>
          </ul>
          <h3>Nearby Attractions:</h3>
          <ul>
            <li>Kimihurura Roundabout - 5-minute walk</li>
            <li>Local restaurants and cafes - 3-minute walk</li>
            <li>Kigali Heights Shopping Mall - 7-minute drive</li>
          </ul>
          <p>Enjoy a tranquil stay while being close to Kigali's bustling city life.</p>
        `,
    price: 85,
    bedrooms: 3,
    bathrooms: 2,
    size: "150 sqm",
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
    petFriendly: true,
    location: "Kimihurura, Kigali, Rwanda",
    hostId: 2,
    thumbnail: property2a,
    gallery: [property2a, property2b, property2c, property2d],
  },
  {
    id: 3,
    title: "Luxury Villa with Pool in Kiyovu",
    description: `
          <h2>Luxury Villa with Pool in Kiyovu</h2>
          <p>This exquisite villa in the prestigious Kiyovu area offers unparalleled luxury and comfort. With spacious interiors and a private pool, it's the perfect retreat for discerning guests.</p>
          <h3>Amenities:</h3>
          <ul>
            <li>4 large bedrooms with king-sized beds</li>
            <li>4 bathrooms</li>
            <li>Property size: 300 sqm</li>
            <li>Private swimming pool and sun deck</li>
            <li>State-of-the-art kitchen facilities</li>
            <li>Home theater system and entertainment room</li>
            <li>Beautifully landscaped garden</li>
            <li>BBQ grill and outdoor dining area</li>
          </ul>
          <h3>Nearby Attractions:</h3>
          <ul>
            <li>Kigali Genocide Memorial - 10-minute drive</li>
            <li>City Center - 5-minute drive</li>
            <li>Numerous international restaurants and boutiques</li>
          </ul>
          <p>Indulge in luxury and make your stay in Kigali unforgettable.</p>
        `,
    price: 250,
    bedrooms: 4,
    bathrooms: 4,
    size: "300 sqm",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    petFriendly: true,
    location: "Kiyovu, Kigali, Rwanda",
    hostId: 3,
    thumbnail: property3a,
    gallery: [property3a, property3b, property3c, property3d],
  },
  {
    id: 4,
    title: "Chic Studio Apartment in Remera",
    description: `
          <h2>Chic Studio Apartment in Remera</h2>
          <p>Located in the lively Remera district, this chic studio apartment is perfect for solo travelers or couples. Enjoy modern amenities and easy access to local attractions.</p>
          <h3>Amenities:</h3>
          <ul>
            <li>1 open-plan living and sleeping area</li>
            <li>1 bathroom</li>
            <li>Property size: 45 sqm</li>
            <li>Compact kitchen with essential appliances</li>
            <li>High-speed internet and flat-screen TV</li>
            <li>Air conditioning and heating</li>
            <li>Secure building with 24-hour security</li>
            <li>Work desk and ergonomic chair</li>
          </ul>
          <h3>Nearby Attractions:</h3>
          <ul>
            <li>Amahoro National Stadium - 5-minute drive</li>
            <li>Local markets and shops - 2-minute walk</li>
            <li>Kigali International Airport - 10-minute drive</li>
          </ul>
          <p>A stylish and convenient base for exploring Kigali.</p>
        `,
    price: 60,
    bedrooms: 1,
    bathrooms: 1,
    size: "45 sqm",
    checkIn: "2:00 PM",
    checkOut: "10:00 AM",
    petFriendly: false,
    location: "Remera, Kigali, Rwanda",
    hostId: 4,
    thumbnail: property4a,
    gallery: [property4a, property4b, property4c, property4d],
  },
];

export const hosts = [
  {
    id: 1,
    name: "Amanda",
    img: user1,
    bio: "A passionate traveler and hospitality expert, Amanda ensures her guests enjoy a luxurious and comfortable stay in Kigali.",
    location: "Nyarutarama, Kigali, Rwanda",
    contact: {
      email: "amanda.host@example.com",
      phone: "+250 788 123 456",
    },
    rating: 4.8,
    reviews: 120,
    propertiesListed: [1],
  },
  {
    id: 2,
    name: "David",
    img: user2,
    bio: "With a background in interior design, David takes pride in offering cozy, stylish, and well-maintained spaces for his guests.",
    location: "Kimihurura, Kigali, Rwanda",
    contact: {
      email: "david.host@example.com",
      phone: "+250 788 234 567",
    },
    rating: 4.7,
    reviews: 98,
    propertiesListed: [2],
  },
  {
    id: 3,
    name: "Claire",
    img: user3,
    bio: "A real estate enthusiast, Claire offers premium accommodations with top-notch amenities for an exceptional stay in Kigali.",
    location: "Kiyovu, Kigali, Rwanda",
    contact: {
      email: "claire.host@example.com",
      phone: "+250 788 345 678",
    },
    rating: 4.9,
    reviews: 150,
    propertiesListed: [3],
  },
  {
    id: 4,
    name: "Michael",
    img: user4,
    bio: "Michael specializes in short-term rentals, ensuring his properties offer comfort, security, and a home-like experience.",
    location: "Remera, Kigali, Rwanda",
    contact: {
      email: "michael.host@example.com",
      phone: "+250 788 456 789",
    },
    rating: 4.6,
    reviews: 85,
    propertiesListed: [4],
  },
  {
    id: 5,
    name: "Sophia",
    img: user5,
    bio: "A Kigali native with a deep understanding of hospitality, Sophia provides unique and affordable stays for travelers.",
    location: "Gacuriro, Kigali, Rwanda",
    contact: {
      email: "sophia.host@example.com",
      phone: "+250 788 567 890",
    },
    rating: 4.8,
    reviews: 110,
    propertiesListed: [],
  },
];
