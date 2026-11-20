import { useState, useEffect } from "react";
import "@/App.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { SubscribersProvider } from "@/features/dashboard/context/SubscribersContext";
import Dashboard from "@/features/dashboard/Dashboard";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    const handleResize = (event: MediaQueryListEvent) => {
      setIsSidebarCollapsed(event.matches);
    };

    // Set initial state

    setIsSidebarCollapsed(mediaQuery.matches);

    // Listen for viewport changes

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <div
      className={`app-layout ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}
    >
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
      <div className="main-layout">
        <Header name="Dashboard" />
        <main className="page-content">
          <SubscribersProvider>
            <Dashboard />
          </SubscribersProvider>
        </main>
      </div>
    </div>
  );
}

export default App;
