import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React from "react";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Card from "@/components/Card";
import useAuthRedirect from "@/hooks/useAuthRedirect"; // Import the hook

const HomePage = () => {
  const [sidebarOpen, setSiebarOpen] = useState(false);

  const isAuthenticated = true; // Replace with your authentication logic

  // Call the hook to redirect if not authenticated
  useAuthRedirect(isAuthenticated);

  const toggleSidebar = () => {
    setSiebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />

      <main className="relative bg-slate-100  ">
        <Sidebar sidebarOpen={sidebarOpen} />

        <div className="px-10 py-2 h-screen">
          <div className="flex justify-end pt-5">
            <div className="flex flex-col gap-2">
              <button
                id="filterPrice"
                type="button"
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100">
                Filtar Precios
              </button>

              <button
                id="filterNew"
                type="button"
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 ease-in duration-100">
                Nuevos
              </button>
            </div>
          </div>

          <div className="w-full mt-3 h-1/2">
            <div className="flex justify-between">
              <Card />
              <Card />

              <Card />

              <Card />
            </div>
          </div>

          <div className="pt-3 flex justify-center">
            <Stack spacing={2}>
              <Pagination count={10} variant="outlined" shape="rounded" />
            </Stack>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
