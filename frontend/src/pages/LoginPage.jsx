import React, { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Login from "../Components/Login/Login";
import UserContext from "../contexts/UserContext";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const notifyLogged = () =>
    toast.success("🦄 Tu es bien connecté !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (isLoggedIn) {
      notifyLogged();
    }
  }, [isLoggedIn]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="flex items-center justify-center h-screen">
        <div className="h-[75vh] w-[100vw] bg-[#c4c589ba] flex flex-col mx-3 my-auto rounded-xl border border-opacity-30 backdrop-filter backdrop-blur-sm md:min-w-[65vw] md:max-w-[50vw] md:max-h-[40vh]">
          <h2 className="text-[#274001] flex items-center font-display px-5 font-bold justify-center text-center text-3xl md:text-6xl mb-5 mt-10 md:mb-10 md:mt-5 drop-shadow-lg hover:cursor-pointer">
            Connectes-toi pour accéder à tes informations
          </h2>
          <Login />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
