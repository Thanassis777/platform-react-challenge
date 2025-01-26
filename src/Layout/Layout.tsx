import { useState, FC, ReactNode, useEffect } from 'react';

import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './Layout.css';

interface LayoutProps {
  children?: ReactNode;
}

/**
 * Layout component that provides a navigation bar and main content area.
 * Includes responsive navigation with an offcanvas menu for smaller screens.
 * @param children - The components to render inside the layout's content area.
 */
const Layout: FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleNavClick = (redirectTo: string) => {
    navigate(redirectTo);
    setShowOffcanvas(false);
  };

  const toggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);
  const closeOffcanvas = () => setShowOffcanvas(false);

  useEffect(() => {
    document.title = 'Cat Lover App';
  }, []);

  return (
    <>
      <Navbar bg="dark" expand="lg" fixed="top" className="custom-navbar">
        <Container>
          <Navbar.Brand onClick={() => navigate('/')} className="navbar-brand">
            Cat Lover App
          </Navbar.Brand>
          <Navbar.Toggle onClick={toggleOffcanvas} aria-controls="offcanvasNavbar" className="custom-toggler" />
          <Navbar.Offcanvas
            show={showOffcanvas}
            onHide={closeOffcanvas}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Navigation</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link onClick={() => handleNavClick('breeds')} className="navbar-link">
                  Breeds
                </Nav.Link>
                <Nav.Link onClick={() => handleNavClick('favorites')} className="navbar-link">
                  Favorites
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Container className="content">{children}</Container>
    </>
  );
};

export default Layout;
