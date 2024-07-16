import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import Addblogs from "./pages/Addblogs.jsx";
import Addcateg from "./pages/Addcateg.jsx";
import Routeprotect from "./services/Routeprotect.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* protected route */}
        <Route path="/" element={<Routeprotect />}>
          <Route path="/" element={<Home />} />
          <Route path="/addblog" element={<Addblogs />} />
          <Route path="/addcategory" element={<Addcateg />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
