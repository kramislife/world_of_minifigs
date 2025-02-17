import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "@/routes/RootLayout";
import UserRoutes from "@/routes/UserRoutes";
import NotFound from "@/components/layout/error/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useGetPayPalCredentialsQuery } from "@/redux/api/checkoutApi";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const PayPalWrapper = ({ children }) => {
  const {
    data: paypalData,
    isLoading,
    isError,
  } = useGetPayPalCredentialsQuery();

  // Don't render PayPalScriptProvider until we have the client ID
  if (isLoading) {
    return children; // Return children without PayPal wrapper while loading
  }

  if (isError || !paypalData?.clientId) {
    console.warn("PayPal credentials not available");
    return children; // Return children without PayPal wrapper if there's an error
  }

  const paypalOptions = {
    "client-id": paypalData.clientId,
    currency: "USD",
    intent: "capture",
    components: "buttons",
    "disable-funding": "card",
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      {children}
    </PayPalScriptProvider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PayPalWrapper>
        <BrowserRouter>
          <ToastContainer position="top-center" autoClose={3000} />
          <Routes>
            <Route element={<RootLayout />}>
              {UserRoutes}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PayPalWrapper>
    </Provider>
  );
};

export default App;
