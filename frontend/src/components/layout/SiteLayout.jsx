import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}