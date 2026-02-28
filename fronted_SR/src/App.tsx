import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUser from "./pages/CreateUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;