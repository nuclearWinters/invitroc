"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getReservations, getUser } from "@/lib/services";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MapPin, X } from "lucide-react";
import Link from "next/link";

export const formatDateYear = (date: Date) => {
  return `${date.getDate()} ${date.toLocaleString("es-ES", {
    month: "long",
  })} ${date.getFullYear()}`;
};

export const formatTime = (date: Date) => {
  return `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}, ${date.toLocaleString("es-ES", {
    weekday: "long",
  })}`;
};

export default function MedicalDashboard() {
  const { data: user } = useSuspenseQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });
  const { data: reservations } = useSuspenseQuery({
    queryKey: ["reservations"],
    queryFn: () => getReservations(user.id),
  });
  return (
    <div className="min-h-screen bg-gray-50">
      <header
        role="banner"
        aria-label="User account header"
        className="border-b border-gray-200 bg-white"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-6">
            <div className="h-10 w-10" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                className="h-full w-full text-emerald-500"
              >
                <path
                  fill="currentColor"
                  d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M16.2,10.3l-4.8,4.8c-0.4,0.4-1,0.4-1.4,0l0,0 c-0.4-0.4-0.4-1,0-1.4l4.8-4.8c0.4-0.4,1-0.4,1.4,0l0,0C16.6,9.3,16.6,9.9,16.2,10.3z M8.9,7.1l1.5,1.5c0.4,0.4,0.4,1,0,1.4 c-0.4,0.4-1,0.4-1.4,0L7.4,8.6c-0.4-0.4-0.4-1,0-1.4C7.8,6.7,8.4,6.7,8.9,7.1z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My account</h1>
              <p className="text-sm text-gray-600">Email: {user.email}</p>
            </div>
          </div>
          <Link href="/" aria-label="Close and return to homepage">
            <Button variant="outline" className="gap-1">
              <X className="h-4 w-4" aria-hidden="true" />
              Close
            </Button>
          </Link>
        </div>
      </header>
      <div className="flex">
        <aside
          role="navigation"
          aria-label="Sidebar navigation"
          className="w-64 border-r border-gray-200 bg-white p-4"
        >
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-sm font-normal text-gray-500">
                Doctors
              </h3>
              <ul className="space-y-1">
                <li>
                  <a
                    href="#"
                    className="block rounded-md bg-blue-50 px-3 py-2 text-blue-600 hover:bg-blue-100"
                    aria-label="View my appointments"
                  >
                    My appointments
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>
        <main className="flex-1 p-6">
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6 flex flex-col gap-2">
              <h2
                className="mb-4 text-xl font-semibold text-gray-800"
                id="appointments-heading"
              >
                Next appointments ({reservations.length})
              </h2>
              {reservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="rounded-lg border border-gray-200 p-4"
                  role="region"
                  aria-labelledby={`reservation-${reservation.id}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <MapPin
                              className="h-4 w-4 text-gray-500"
                              aria-hidden="true"
                            />
                            <span className="text-sm text-gray-600">
                              {reservation.address}
                            </span>
                          </div>
                          <h3
                            id={`reservation-${reservation.id}`}
                            className="mt-2 text-lg font-semibold"
                          >
                            {reservation.name}
                          </h3>
                          <p className="text-gray-600">{reservation.job}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {formatDateYear(reservation.start_time)}
                          </p>
                          <p className="text-gray-600">
                            {formatTime(reservation.start_time)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
