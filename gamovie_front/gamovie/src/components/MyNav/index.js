import Context from "context/userContext";
import React, { useContext, useState } from "react";
import {
  Navbar,
  Container,
  NavDropdown,
  Nav,
  Button,
  ButtonGroup,
  Form,
  FormControl,
} from "react-bootstrap";
import useUser from "hooks/useUser";
import './nav.css';

export default function MyNav() {
  const { isLogged, logout } = useUser();
  const { currentUser } = useContext(Context);
  const [keyword, setKeyword] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    logout();
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(keyword);
    e.preventDefault();
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">GAMOVIE</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Form className="form w-100" onSubmit={handleSubmit}>
              <FormControl
                type="text"
                placeholder="Search"
                aria-label="Search"
                value={keyword}
                onChange={handleChange}
              />
            </Form>
            <Nav.Link href="/games">Videojuegos</Nav.Link>
            <Nav.Link href="/movies">Peliculas</Nav.Link>
            <Nav.Link href="/">Support</Nav.Link>
          </Nav>
          <Nav>
            {isLogged ? (
              <NavDropdown
                title={currentUser.username}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">
                  Mis Votaciones
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Mis Reviews
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#" onClick={handleClick}>
                  LogOut
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <ButtonGroup aria-label="Button group">
                <Button href="/login" variant="secondary">
                  Login
                </Button>
                <Button href="/register" variant="secondary">
                  Register
                </Button>
              </ButtonGroup>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
