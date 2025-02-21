// C:\Users\ising\Downloads\lalahomes\pages\property\[id].tsx

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/footer/Footer";
import "../../app/globals.css";
import { BedIcon, LocateIcon } from "lucide-react";
import { getProperty } from "@/services/property";
import { useQuery } from "@tanstack/react-query";

// const properties = [
//   {
//     id: "1",
//     title: "Modern Apartment",
//     bedrooms: 3,
//     bathrooms: 2,
//     location: "Kigali, Rwanda",
//   },
//   {
//     id: "2",
//     title: "Luxury Villa",
//     bedrooms: 5,
//     bathrooms: 4,
//     location: "Musanze, Rwanda",
//   },
//   {
//     id: "3",
//     title: "Cozy Studio",
//     bedrooms: 1,
//     bathrooms: 1,
//     location: "Huye, Rwanda",
//   },
// ];

const PropertyPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useQuery({
    queryKey: ["PROPERTY", id],
    queryFn: () => getProperty(id as string),
});

const properties = data;
//   const [property, setProperty] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (id) {
//       const foundProperty = properties.find((prop) => prop.id === id);
//       setProperty(foundProperty || null);
//     }
//   }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!checkInDate || !checkOutDate) {
      setMessage("Please select both check-in and check-out dates.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ propertyId: id, checkInDate, checkOutDate }),
        }
      );

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

  if (isLoading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Loading property details...
      </div>
    );
  }

  return (
    <>
    
      <div className="w-full relative">
        <Header />
        <div className="mt-[6rem] w-full relative h-[15rem] flex  bg-primary">
          <div className="w-[90%] m-auto">
            <h2 className="text-2xl text-white mt-[6rem] truncate mx-w-[80%] font-bold">
              {properties?.location}
            </h2>

            <p>
              <span className="text-xl font-semibold"></span>
              <span></span>${properties?.pricePerNight} per night
            </p>
            <div className="flex flex-row gap-3 items-center mt-2 text-gray-400">
              <div className="flex items-center gap-2">
                <BedIcon className="h-5 w-5" /> {properties?.bedrooms} Bedrooms
              </div>
              <div className="flex items-center gap-2">
                <BedIcon className="h-5 w-5" /> {properties?.bathrooms} Bathrooms
              </div>
              <div className="flex items-center gap-2">
                <LocateIcon className="h-5 w-5" /> {properties?.location}
              </div>
            </div>
            <div className="relative">
              <form
                onSubmit={handleBooking}
                className="bg-gray-400 py-3 px-4 mt-6 w-fit rounded "
              >
                <h2 className="text-[1.1rem] font-bold mb-2 text-primary">
                  Book This Property
                </h2>
                <div className="flex flex-row items-center gap-[1rem]">
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="font-regular p-2 border rounded "
                    required
                  />
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="font-regular p-2 border rounded "
                    required
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="py-2 rounded bg-primary px-4 text-white font-semibold hover:bg-opacity-90 transition"
                  >
                    {loading ? "Booking..." : "Book Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="w-[95%] m-auto pt-10 py-10">
          <h2 className="text-[2rem] truncate mb-2 mt-[2rem] font-bold color-primary">
            {properties?.title}
          </h2>
          {/* gallery */}

          {/* description  */}

          {/* other  */}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PropertyPage;
