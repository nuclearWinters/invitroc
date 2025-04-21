import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { type ReactNode } from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/provider/client";
import { getUser } from "@/lib/services";
import { Providers } from "@/provider/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doctoralia - Encuentra tu médico",
  description:
    "Plataforma para encontrar y reservar citas con médicos especialistas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <LayoutPrefetch>
        <html lang="es">
          <body className={inter.className}>{children}</body>
        </html>
      </LayoutPrefetch>
    </Providers>
  );
}

async function LayoutPrefetch({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
