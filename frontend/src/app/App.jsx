import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "@/routes/RootLayout";
import UserRoutes from "@/routes/UserRoutes";
import NotFound from "@/components/layout/error/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const paypalOptions = {
  "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
  "data-client-token": import.meta.env.VITE_PAYPAL_CLIENT_TOKEN,
};

const App = () => {
  return (
    <PayPalScriptProvider options={paypalOptions}>
      <BrowserRouter>
        <ToastContainer position="top-center" autoClose={3000} />
        <Routes>
          {/* Main Route Layout */}
          <Route element={<RootLayout />}>
            {UserRoutes}

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
};

export default App;
