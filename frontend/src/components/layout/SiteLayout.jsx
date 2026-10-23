
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "../ui/BackToTop";

export default function SiteLayout({ children }) {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/" && <Navbar />}
      <main>{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
