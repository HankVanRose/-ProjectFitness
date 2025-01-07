import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink as RouterNavLink, useNavigate } from 'react-router';
import Navbar from 'react-bootstrap/Navbar';
import { fetchUserLogout } from '../store/thunkActions';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';

export default function NavBar() {
  const { user } = useAppSelector((state) => state.appSlice);
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); 
  

  const handleLogOut = () => {
    dispatch(fetchUserLogout());
    navigate('/');
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">BE FIT</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {!user ? (
            <>
              <Nav className="me-auto">
                <Nav.Link as={RouterNavLink} to="signin">
                  ВОЙТИ
                </Nav.Link>
                <Nav.Link as={RouterNavLink} to="signup">
                  РЕГИСТРАЦИЯ
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="me-auto">
                <Nav.Link as={RouterNavLink} to="signin">
                  ПРИВЕТ, {user?.username.toUpperCase()}
                </Nav.Link>
                <Nav.Link as={RouterNavLink} to="#exercises">
                  УПРАЖНЕНИЯ
                </Nav.Link>
                <Nav.Link onClick={handleLogOut}>ВЫЙТИ</Nav.Link>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
