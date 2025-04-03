import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "@/routes/RootLayout";
import UserRoutes from "@/routes/UserRoutes";
import NotFound from "@/components/layout/error/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import "@/toast.css";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          className="toast-container"
          toastClassName="toast-item"
          bodyClassName="toast-body"
          progressClassName="toast-progress"
        />
        <Routes>
          <Route element={<RootLayout />}>
            {UserRoutes}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
