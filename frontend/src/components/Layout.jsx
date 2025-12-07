import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "./BackToTop";

export default function Layout({ children, showNavbar = true, showFooter = true }) {
  return (
    <>
      {showNavbar && <Navbar />}
      <main>{children}</main>
      {showFooter && <Footer />}
      <BackToTop />
    </>
  );
}

