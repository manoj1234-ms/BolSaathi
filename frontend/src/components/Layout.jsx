import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children, showNavbar = true, showFooter = true }) {
  return (
    <>
      {showNavbar && <Navbar />}
      <main>{children}</main>
      {showFooter && <Footer />}
    </>
  );
}

