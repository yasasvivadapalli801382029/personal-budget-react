import logo from "./logo.svg";
import "./App.scss";
import Menu from "./Menu/Menu";
import Hero from "./Hero/Hero";
import HomePage from "./HomePage/HomePage";
import Footer from "./Footer/Footer";
import { Routes, Route } from "react-router-dom";
import AboutPage from "./AboutPage/AboutPage";
import LoginPage from "./LoginPage/LoginPage";

function App() {
  return (
    <div className="App">
      <Menu />
      <Hero />
      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;