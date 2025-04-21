import { getReservations } from "@/lib/services";
import { getQueryClient } from "@/provider/client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import MedicalDashboard from "./page.client";

export default async function Summary() {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["reservations"],
    queryFn: () => getReservations("2345"),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MedicalDashboard />
    </HydrationBoundary>
  );
}
