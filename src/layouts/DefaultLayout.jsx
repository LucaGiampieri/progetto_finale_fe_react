import { Outlet } from "react-router-dom";

import { useGlobal } from "../context/GlobalContext";

import MainHeader from "../components/MainHeader";
import Loader from "../components/Loader";

function DefaultLayout() {
  const { isLoading } = useGlobal();

  return (
    <>
      <MainHeader />
      <main className="container">
        <Outlet />
      </main>
      {isLoading && <Loader />}
    </>
  );
}

export default DefaultLayout;
