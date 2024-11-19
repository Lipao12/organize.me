import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Use BrowserRouter, não Router.
import { Sidebar } from "./(components)/sidebar";
import { Dashboard } from "./dashboard/page";
import { Inventory } from "./inventory/page";
import StoreProvider, { useAppSelector } from "./redux";

const AppLayout = () => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } flex text-gray-900 w-full min-h-screen bg-gray-50`}
    >
      <Sidebar />
      <main
        className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        }`}
      >
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          {/* Adicione outras rotas conforme necessário */}
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AppLayout />
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
