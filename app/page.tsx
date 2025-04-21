import { UserCircle } from "lucide-react";
import { getQueryClient } from "@/provider/client";
import { getDoctors, getSlots } from "@/lib/services";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Link from "next/link";
import DoctorsList from "@/components/doctors-list";
import { JobDropdown } from "@/components/job-dropdown";
import { DateSelector } from "@/components/date-selector";
import { Suspense } from "react";
import { LoadingScreen } from "@/components/loading-screen";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const { job, date } = params;
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["slots"],
    queryFn: () => getSlots(),
  });
  queryClient.prefetchQuery({
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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="min-h-screen bg-gray-50">
        <header
          role="banner"
          className="bg-emerald-500 text-white p-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">Doctoralia</h1>
          </div>
          <div className="flex items-center space-x-2">
            <JobDropdown />
            <DateSelector />
            <Link
              aria-label="Go to appointments page"
              href={"/profile"}
              className="flex flex-row bg-transparent border border-white rounded-md px-4 py-2 gap-2"
            >
              Appointments
              <UserCircle className="h-5 w-5" />
            </Link>
          </div>
        </header>
        <Suspense fallback={<LoadingScreen />}>
          <DoctorsList />
        </Suspense>
      </main>
    </HydrationBoundary>
  );
}
