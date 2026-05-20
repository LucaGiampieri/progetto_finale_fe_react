import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import MonsterPage from "./pages/MonsterPage";
import NotFoundPage from "./pages/NotFoundPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/monsters/:id" element={<MonsterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
