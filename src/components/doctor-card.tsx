"use client";

import { MapPin, Star, Clock } from "lucide-react";
import { DialogDemo } from "./dialog";

interface DoctorCardProps {
  name: string;
  rating: number;
  reviews: number;
  address: string;
  price: number;
  job: string;
}

export default function DoctorCard({
  name,
  rating,
  reviews,
  address,
  price,
  job,
}: DoctorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 flex flex-col md:flex-row gap-6">
        {/* Left column - Doctor info */}
        <div className="flex flex-col md:flex-row gap-4 flex-grow">
          <div>
            <h3 className="text-xl font-bold flex items-center">
              {name}
              <span className="ml-2 text-emerald-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </h3>
            <div className="text-gray-600 mb-1">{job}</div>
            <div className="flex items-center mb-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < rating
                        ? "text-emerald-500 fill-emerald-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              <span className="ml-1 text-gray-600">{reviews} reviews</span>
            </div>

            <div className="flex items-start gap-1 text-gray-600">
              <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <div>{address}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Price */}
        <div className="flex flex-col items-center md:items-end">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-500" />
            <span className="font-bold text-gray-800">${price}</span>
          </div>
        </div>
      </div>
      <DialogDemo name={name} />
    </div>
  );
}
