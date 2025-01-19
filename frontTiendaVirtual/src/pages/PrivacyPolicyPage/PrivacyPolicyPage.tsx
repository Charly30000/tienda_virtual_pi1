import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const PrivacyPolicyPage = () => {
  const [sidebarOpen, setSiebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSiebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />

      <main className="relative bg-slate-100  ">
        <Sidebar sidebarOpen={sidebarOpen} />

        <div className="px-10 py-2 h-screen">
       
         

          <div className="w-full mt-3 h-1/2">
           <p>
            Texto largo
           </p>
          </div>

         
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PrivacyPolicyPage