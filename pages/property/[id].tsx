import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/footer/Footer";
import "../../app/globals.css";
import { BedIcon, LocateIcon } from "lucide-react";
import Link from "next/link";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import img1 from "@/public/img/101.png";
import img2 from "@/public/img/102.jpg";
import img3 from "@/public/img/101.png";

// Sample properties with bookings
const properties = [
  {
    id: "1",
    title: "Modern Apartment",
    bedrooms: 3,
    bathrooms: 2,
    location: "Kigali, Rwanda",
    gallery: [img1, img2, img3],
    description: `Experience luxury in the heart of Kigali with this modern apartment located in the upscale Nyarutarama neighborhood. This property offers a serene environment with close proximity to the city's vibrant attractions. 
      Amenities: WiFi, Garage, Water, Lighting`,
    host: {
      id: 1,
      firstName: "Host ",
      lastName: "Uno",
      email: "uno@lala.com",
    },
    bookings: [
      {
        id: 1,
        userId: 4,
        propertyId: "1",
        checkInDate: "2025-02-23T16:20:44.816Z",
        checkOutDate: "2025-02-24T16:20:44.816Z",
        bookingStatus: "Pending",
        totalPrice: 1,
        createdAt: "2025-02-20T16:47:36.369Z",
        updatedAt: "2025-02-20T16:47:36.369Z",
      },
      {
        id: 2,
        userId: 5,
        propertyId: "1",
        checkInDate: "2025-03-01T16:20:44.816Z",
        checkOutDate: "2025-03-05T16:20:44.816Z",
        bookingStatus: "Confirmed",
        totalPrice: 2,
        createdAt: "2025-02-20T16:47:36.369Z",
        updatedAt: "2025-02-20T16:47:36.369Z",
      },
    ],
  },
  {
    id: "3",
    title: "Cozy Studio",
    bedrooms: 1,
    bathrooms: 1,
    location: "Huye, Rwanda",
    description: `Experience luxury in the heart of Kigali with this modern apartment located in the upscale Nyarutarama neighborhood. This property offers a serene environment with close proximity to the city's vibrant attractions. 
      Amenities: WiFi, Garage, Water, Lighting`,
    bookings: [
      {
        id: 3,
        userId: 6,
        propertyId: "3",
        checkInDate: "2025-02-28T16:20:44.816Z",
        checkOutDate: "2025-03-02T16:20:44.816Z",
        bookingStatus: "Confirmed",
        totalPrice: 1,
        createdAt: "2025-02-20T16:47:36.369Z",
        updatedAt: "2025-02-20T16:47:36.369Z",
      },
      {
        id: 4,
        userId: 7,
        propertyId: "3",
        checkInDate: "2025-03-10T16:20:44.816Z",
        checkOutDate: "2025-03-12T16:20:44.816Z",
        bookingStatus: "Pending",
        totalPrice: 1,
        createdAt: "2025-02-20T16:47:36.369Z",
        updatedAt: "2025-02-20T16:47:36.369Z",
      },
    ],
  },
];

// Helper: Normalize a date (set to midnight)
const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const PropertyPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState(null);
  // Store Date objects for the date pickers
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const foundProperty = properties.find((prop) => prop.id === id);
      setProperty(foundProperty || null);
    }
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) =>
        prevIndex === property?.gallery.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [property?.gallery]);

  // Build booked intervals (normalized to disable full days)
  const bookedIntervals =
    property?.bookings?.map((booking) => ({
      start: normalizeDate(booking.checkInDate),
      end: normalizeDate(booking.checkOutDate),
    })) || [];

  // Helper to determine if a given date falls within any booked interval.
  const isDateDisabled = (date) => {
    const normalized = normalizeDate(date);
    return bookedIntervals.some(
      (interval) => normalized >= interval.start && normalized <= interval.end
    );
  };

  // Helper to determine if the entire range from start to end overlaps any booking.
  const isDateRangeBooked = (start, end) => {
    if (!property?.bookings) return false;
    const normalizedStart = normalizeDate(start);
    const normalizedEnd = normalizeDate(end);
    return property.bookings.some((booking) => {
      const bookedStart = normalizeDate(booking.checkInDate);
      const bookedEnd = normalizeDate(booking.checkOutDate);
      return normalizedStart < bookedEnd && normalizedEnd > bookedStart;
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!checkInDate || !checkOutDate) {
      setMessage("Please select both check-in and check-out dates.");
      return;
    }

    if (isDateRangeBooked(checkInDate, checkOutDate)) {
      setMessage(
        "Selected dates are already booked. Please choose different dates."
      );
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            propertyId: id,
            checkInDate: checkInDate.toISOString(),
            checkOutDate: checkOutDate.toISOString(),
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Booking successful!");
        // Optionally update local bookings state here.
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
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Loading property details...
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <Header />
      {/* <div className="mt-[6rem] w-full relative h-[10rem] flex items-center bg-primary">
        <div className="w-[90%] m-auto">
          <h2 className="text-2xl text-white font-bold">{property.title}</h2>
          <div className="flex flex-row gap-3 items-center mt-2 text-gray-400">
            <div className="flex items-center gap-2">
              <BedIcon className="h-5 w-5" /> {property.bedrooms} Bedrooms
            </div>
            <div className="flex items-center gap-2">
              <BedIcon className="h-5 w-5" /> {property.bathrooms} Bathrooms
            </div>
            <div className="flex items-center gap-2">
              <LocateIcon className="h-5 w-5" /> {property.location}
            </div>
          </div>
        </div>
      </div> */}

      <div className="w-[95%] m-auto pt-10 pb-10 relative">
        <div className="w-full relative flex items-start py-8 gap-[1rem]">
          <div className="w-full relative flex flex-col gap-[3rem]">
            <div className="w-full relative">
              <div className="flex flex-col items-center gap-[10px] w-full">
                <div className="w-full h-[350px] flex items-center justify-center bg-[#f0f0f0] shadow-lg">
                  <img
                    src={property.gallery[activeImageIndex].src}
                    alt="Active Image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-row gap-[10px] p-[10px] justify-center w-full max-w-600px">
                  {property.gallery.map((image, index) => (
                    <div
                      key={index}
                      className={`w-[80px] h-[80px] cursor-pointer rounded transition ${
                        activeImageIndex === index
                          ? "border-2 border-primary"
                          : ""
                      }`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img
                        src={image.src}
                        alt="Thumbnail"
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full relative">
              <h2 className="text-[2rem] truncate font-bold text-primary mb-[1rem]">
                {property.title}
              </h2>
              <p className="font-regular text-[1rem]">{property.description}</p>
              <div className="my-3 w-fit border border-slate-500 py-3 px-6 rounded">
                <p className="text-[1rem] font-medium">
                  <span className="font-regular">Hosted by:</span>{" "}
                  {property.host.lastName} {property.host.firstName}
                </p>
                <Link href={`mailto:${property.host.email}`}>
                  {property.host.email}
                </Link>
              </div>
            </div>
          </div>

          <div className="min-w-[400px] sticky top-[7rem]">
            <form
              className="bg-white shadow-md p-6 rounded-lg w-full"
              onSubmit={handleBooking}
            >
              <h3 className="text-xl font-bold mb-4">Book This Property</h3>
              <label className="block text-sm font-semibold mb-1">
                Check-in Date:
              </label>
              <ReactDatePicker
                selected={checkInDate}
                onChange={(date) => {
                  setCheckInDate(date);
                  // Reset check-out date when check-in changes
                  setCheckOutDate(null);
                }}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                // Disable dates that fall within any booked interval.
                filterDate={(date) => !isDateDisabled(date)}
                placeholderText="Select check-in date"
                className="w-full p-2 border rounded mb-3 w-[350px] "
              />

              <label className="block text-sm font-semibold mb-1">
                Check-out Date:
              </label>
              <ReactDatePicker
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                dateFormat="yyyy-MM-dd"
                minDate={checkInDate || new Date()}
                // Ensure the entire range from check-in to check-out is free of conflicts.
                filterDate={(date) => {
                  if (!checkInDate) return true;
                  return !isDateRangeBooked(checkInDate, date);
                }}
                placeholderText="Select check-out date"
                className="w-full p-2 border rounded mb-3 w-[350px]"
              />

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-opacity-90 transition"
                disabled={loading}
              >
                {loading ? "Booking..." : "Book Now"}
              </button>
              {message && (
                <p className="text-center text-red-500 mt-3">{message}</p>
              )}
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyPage;
