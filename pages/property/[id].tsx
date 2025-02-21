import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/footer/Footer";
import "../../app/globals.css";
import { BedIcon, LocateIcon } from "lucide-react";

const properties = [
  { id: "1", title: "Modern Apartment", bedrooms: 3, bathrooms: 2, location: "Kigali, Rwanda" },
  { id: "2", title: "Luxury Villa", bedrooms: 5, bathrooms: 4, location: "Musanze, Rwanda" },
  { id: "3", title: "Cozy Studio", bedrooms: 1, bathrooms: 1, location: "Huye, Rwanda" },
];

const PropertyPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      const foundProperty = properties.find((prop) => prop.id === id);
      setProperty(foundProperty || null);
    }
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!checkInDate || !checkOutDate) {
      setMessage("Please select both check-in and check-out dates.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId: id, checkInDate, checkOutDate }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setMessage("Booking successful!");
      } else {
        setMessage(data.message || "Booking failed.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!property) {
    return <div className="text-center mt-10 text-lg font-semibold">Loading property details...</div>;
  }

  return (
    <>
      <div className="w-full relative">
        <Header />
        <div className="mt-[6rem] w-full relative h-[10rem] flex items-center bg-primary">
          <div className="w-[90%] m-auto">
            <h2 className="text-2xl text-white font-bold">{property.title}</h2>
            <div className="flex flex-row gap-3 items-center mt-2 text-gray-400">
              <div className="flex items-center gap-2"><BedIcon className="h-5 w-5" /> {property.bedrooms} Bedrooms</div>
              <div className="flex items-center gap-2"><BedIcon className="h-5 w-5" /> {property.bathrooms} Bathrooms</div>
              <div className="flex items-center gap-2"><LocateIcon className="h-5 w-5" /> {property.location}</div>
            </div>
          </div>
        </div>
        <div className="w-[95%] m-auto pt-10 pb-10">
          <form className="bg-white shadow-lg p-6 rounded-lg max-w-lg mx-auto" onSubmit={handleBooking}>
            <h3 className="text-xl font-bold mb-4">Book This Property</h3>
            <label className="block text-sm font-semibold mb-1">Check-in Date:</label>
            <input type="date" className="w-full p-2 border rounded mb-3" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} required />
            
            <label className="block text-sm font-semibold mb-1">Check-out Date:</label>
            <input type="date" className="w-full p-2 border rounded mb-3" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} required />
            
            <button type="submit" className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-opacity-90 transition" disabled={loading}>
              {loading ? "Booking..." : "Book Now"}
            </button>
            {message && <p className="text-center text-red-500 mt-3">{message}</p>}
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PropertyPage;
