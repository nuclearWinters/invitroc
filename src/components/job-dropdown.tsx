"use client";

import { FC, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const options = [
  {
    id: "1",
    label: "Therapist",
  },
  {
    id: "2",
    label: "Psychologist",
  },
];

export const JobDropdown: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useSearchParams();
  const date = router.get("date");
  const job = router.get("job");
  return (
    <div className="relative hidden md:block" aria-label="Select a role">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-emerald-400/50 rounded-md flex items-center p-2 px-4 cursor-pointer"
      >
        <span>{job ? job : "Specialty"}</span>
        <ChevronDown className="ml-2 h-4 w-4" />
      </button>
      {isOpen && (
        <div className="absolute left-0 right-0 z-10 mt-2 bg-white rounded-md shadow-lg">
          <div className="py-1">
            {options.map((option) => {
              return (
                <Link
                  key={option.id}
                  href={{
                    pathname: "",
                    query: {
                      job: option.label,
                      date: date ? date : undefined,
                    },
                  }}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {option.label}
                </Link>
              );
            })}
            <Link
              key={"clear"}
              href={{
                pathname: "",
                query: {
                  job: undefined,
                  date,
                },
              }}
              onClick={() => {
                setIsOpen(false);
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Clear
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
