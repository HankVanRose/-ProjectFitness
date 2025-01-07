import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
 

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">BE FIT</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
         
              <>
                <Nav.Link href="#login">ВОЙТИ</Nav.Link>
                <Nav.Link href="#reg">РЕГИСТРАЦИЯ</Nav.Link>
              </>
           
              <>
                <Nav.Link href="#exercises">УПРАЖНЕНИЯ</Nav.Link>
                <Nav.Link href="#logout">ВЫЙТИ</Nav.Link>
              </>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
  )
}
