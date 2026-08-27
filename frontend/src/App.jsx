import HomePage from "./pages/HomePage";
import EditNotePage from "./pages/EditNotePage";
import NotFoundPage from "./pages/NotFoundPage";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes/:id" element={<EditNotePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
