import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Use BrowserRouter, não Router.
import { Navbar } from "./(components)/navbar";
import ProtectedRoute from "./(components)/protected-route/protected-route";
import { Sidebar } from "./(components)/sidebar";
import { CustomerList } from "./customers/page";
import { Dashboard } from "./dashboard/page";
import { Inventory } from "./inventory/page";
import AuthScreen from "./login-register/page";
import { Products } from "./products/page";
import { CustomerDetails } from "./purchase-history/page";
import StoreProvider, { useAppSelector } from "./redux";
import { Settings } from "./settings/page";

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
        <Navbar />
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <Inventory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <CustomerList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer-details/:customer_id"
            element={
              <ProtectedRoute>
                <CustomerDetails />
              </ProtectedRoute>
            }
          />
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
        <Routes>
          {/* Rota pública */}
          <Route path="/login" element={<AuthScreen />} />
          {/* Layout principal */}
          <Route path="/*" element={<AppLayout />} />
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
