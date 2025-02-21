// EventSection.tsx
import React, { useState } from "react";
import Typography from "../typography/Typography";
import {
  BuildingOffice2Icon,
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import BookingDialog from "../ui/BookingDialog";
import { getAllProperties } from "@/services/property";
import { useQuery } from "@tanstack/react-query";
import { IProperty } from "@/types";
import Loader from "@/components/ui/Loader";
import { BedIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const EventSection = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<IProperty | null>(
    null
  );

  const { data: propeties, isLoading } = useQuery({
    queryKey: ["PROPERTY"],
    queryFn: getAllProperties,
  });

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString(); // Simplified date formatting
  };

  if (isLoading) return <Loader />;

  return (
    <section
      id="event"
      className="w-full bg-white py-16 px-6 sm:px-12 text-blue-900"
    >
      <div className="max-w-6xl mx-auto text-start">
        <h2 className="text-4xl font-bold mb-8">
          Available <span className="text-yellow-600">Properties</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
          {" "}
          {/* Four cards on large screens */}
          {propeties?.map((property: IProperty) => {
            return (
              <div
                key={property.id}
                className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg p-4 shadow-lg transition-transform transform hover:shadow-none relative"
              >
                <div className="w-full h-56 relative">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={property.thumbnail}
                    alt={property.title}
                  />
                </div>

                <Typography
                  variant="h5"
                  className="font-bold mt-2 mb-2 text-xl capitalize truncate"
                >
                  {property.title.length > 30
                    ? `${property.title.substring(0, 30)}...`
                    : property.title}
                </Typography>

                <div className="relative  flex flex-row justify-between items-center gap-2 text-sm text-primary ">
                  <div className="flex items-center ">
                    <MapPinIcon className="h-5 w-5 mr-2 " />
                    <p className="truncate w-full max-w-xs ">
                      {property.location}
                    </p>
                  </div>

                  <div className="relative px-3 mb-3 mt-1 text-primary">
                    <span className=" text-lg font-bold">
                      {" "}
                      ${property.pricePerNight}
                    </span>
                    <span className="text-[.8rem] ">per night</span>
                  </div>
                </div>

                <Link href={`/property/${property.id}`}>
                  <Button className="inline-block bg-yellow-600 text-white">
                    Book Now
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventSection;
