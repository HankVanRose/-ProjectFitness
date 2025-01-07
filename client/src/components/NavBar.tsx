import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink as RouterNavLink, useNavigate } from 'react-router';
import Navbar from 'react-bootstrap/Navbar';
import { fetchUserLogout } from '../store/thunkActions';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import Image from 'react-bootstrap/Image';
 

export default function NavBar() {
  const { user } = useAppSelector((state) => state.appSlice);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(fetchUserLogout());
    navigate('/');
  };

  return (
    <Navbar collapseOnSelect expand="lg" className=" py-3"  style={{ backgroundColor: '#16a34a' }}>
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-4">BE FIT</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto d-flex justify-content-evenly w-100">
            {!user?.id ? (
              <>
                <Nav.Link as={RouterNavLink} to="signin" className="px-3">
                  ВОЙТИ
                </Nav.Link>
                <Nav.Link as={RouterNavLink} to="signup" className="px-3">
                  РЕГИСТРАЦИЯ
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={RouterNavLink} to="#exercises" className="px-3">
                  УПРАЖНЕНИЯ
                </Nav.Link>
                <Nav.Link as={RouterNavLink} to="profile" className="px-3">
                  {user.username.toUpperCase()}
                </Nav.Link>
                <Image
                  style={{ width: 40, height: 40 }}
                  src={user.avatar}
                  roundedCircle
                  
                  className="me-2 align-self-center" // Добавляем класс для правильного выравнивания
                />
                <Nav.Link onClick={handleLogOut} className="px-3">
                  ВЫЙТИ
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
