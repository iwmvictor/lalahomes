import React, { useState } from "react";
import Typography from "../typography/Typography";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { IProperty } from "@/types";
import Loader from "@/components/ui/Loader";
import Link from "next/link";
import { Button } from "../ui/button";
import { getAllProperties } from "@/services/property";

const EventSection = () => {
  const [sortOption, setSortOption] = useState("name-asc");

  const { data: properties, isLoading } = useQuery({
    queryKey: ["PROPERTY"],
    queryFn: getAllProperties,
  });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const sortedProperties = properties?.slice().sort((a: IProperty, b: IProperty) => {
    if (sortOption === "name-asc") return a.title.localeCompare(b.title);
    if (sortOption === "name-desc") return b.title.localeCompare(a.title);
    if (sortOption === "price-asc") return a.pricePerNight - b.pricePerNight;
    if (sortOption === "price-desc") return b.pricePerNight - a.pricePerNight;
    return 0;
  });

  if (isLoading) return <Loader />;

  return (
    <section id="event" className="w-full bg-white py-16 px-6 sm:px-12 text-blue-900">
      <div className="max-w-6xl mx-auto text-start">
        <div className="flex flex-row justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">
            Available <span className="text-yellow-600">Properties</span>
          </h2>
          <select
            className="px-4 py-2 border rounded-lg text-blue-900 bg-white shadow-md focus:outline-none"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProperties?.map((property: IProperty) => (
            <div
              key={property.id}
              className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg p-4 shadow-lg transition-transform transform hover:shadow-none relative"
            >
              <div className="w-full h-56 relative">
                <img className="w-full h-full object-cover rounded-lg" src={property.thumbnail} alt={property.title} />
              </div>
              <Typography variant="h5" className="font-bold mt-2 mb-2 text-xl capitalize truncate">
                {property.title.length > 30 ? `${property.title.substring(0, 30)}...` : property.title}
              </Typography>
              <div className="flex flex-row justify-between items-center gap-2 text-sm text-primary">
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <p className="truncate w-full max-w-xs">{property.location}</p>
                </div>
                <div className="px-3 mb-3 mt-1 text-primary">
                  <span className="text-lg font-bold">${property.pricePerNight}</span>
                  <span className="text-[.8rem]"> per night</span>
                </div>
              </div>
              <Link href={`/property/${property.id}`}>
                <Button className="inline-block bg-yellow-600 text-white">Book Now</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventSection;
