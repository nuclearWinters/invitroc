"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getDoctors } from "@/lib/services";
import DoctorCard from "./doctor-card";
import { useSearchParams } from "next/navigation";

export default function DoctorsList() {
  const params = useSearchParams();
  const job = params.get("job");
  const date = params.get("date");
  const {
    data: doctors,
  } = useSuspenseQuery({
    queryKey: [
      "doctors",
      job ? job : undefined,
      typeof date === "string" && date ? Number(date) : undefined,
    ],
    queryFn: () =>
      getDoctors(
        job ? job : undefined,
        typeof date === "string" && date ? Number(date) : undefined
      ),
  });
  return (
    <div className="container mx-auto p-4">
      {job ? <h2 className="text-2xl font-bold mb-4">{job}s</h2> : null}
      <div className="mt-6 space-y-6">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            name={doctor.name}
            rating={5}
            reviews={10}
            address={doctor.address}
            price={550}
            job={doctor.job}
          />
        ))}
      </div>
    </div>
  );
}
