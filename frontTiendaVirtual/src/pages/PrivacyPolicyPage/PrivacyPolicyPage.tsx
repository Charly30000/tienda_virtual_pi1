import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useTranslate } from "@/hooks/useTranslate";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const PrivacyPolicyPage = () => {
  const [sidebarOpen, setSiebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSiebarOpen(!sidebarOpen);
  };

  const t = useTranslate();

  const navigate = useNavigate();

  const isUserLogged = useAuthStore((e) => e.isUserLogged);

  useEffect(() => {
    if (!isUserLogged()) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />

      <main className="relative bg-slate-100  ">
        <Sidebar sidebarOpen={sidebarOpen} />

        <div className="px-10 py-2 ">
          <div className="w-full mt-3 h-1/2">
            <p>{t("privacyPage", "privacyPolicy")}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
