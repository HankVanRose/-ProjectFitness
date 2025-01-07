import Nav from 'react-bootstrap/Nav';
import { NavLink as RouterNavLink } from 'react-router';
import { Container, Row, Col, Navbar, Image } from 'react-bootstrap';
import { FaTelegram } from 'react-icons/fa';
import './Footer.css';  

export default function Footer() {
  return (
    <Navbar className="footer" style={{ padding: '40px 0', marginTop: 20 }}>
      <Container>
        <Row className="w-100">
          <Col md={3} className="text-center">
            <Image src="/logo.png" alt="Logo" height={120} />
          </Col>

          <Col md={3} className="text-center">
            <h6 className="footer-heading">Страницы</h6>
            <Navbar.Text>
              <Nav.Link as={RouterNavLink} to="/" className="footer-link">
                Главная
              </Nav.Link>
              <Nav.Link as={RouterNavLink} to="/ " className="footer-link">
                Планы тренировок
              </Nav.Link>
              <Nav.Link as={RouterNavLink} to="/ " className="footer-link">
                Личный кабинет
              </Nav.Link>
            </Navbar.Text>
          </Col>

          <Col md={3} className="text-center">
            <h6 className="footer-heading">Контакты</h6>
            <p className="footer-text">
              Адрес: г. Москва, <br />
              ул. Орджоникидзе, д. 11 стр. 10 <br />
              (м. Ленинский проспект)
            </p>
          </Col>

          <Col md={3} className="text-center">
            <h6 className="footer-heading">Сайт разработан</h6>
            <div className="footer-text">
              <Nav.Link
                as={RouterNavLink}
                to="https://t.me/HankvanRose"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact"
              >
                <FaTelegram style={{ marginRight: '0.5rem' }} />
                Вячеслав Платонов
              </Nav.Link>
              <Nav.Link
                as={RouterNavLink}
                to="https://t.me/zemfiravildanova"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact"
              >
                <FaTelegram style={{ marginRight: '0.5rem' }} />
                Земфира Вильданова
              </Nav.Link>
              <Nav.Link
                as={RouterNavLink}
                to="https://t.me/renthefirst"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact"
              >
                <FaTelegram style={{ marginRight: '0.5rem' }} />
                Ренат Кабаков
              </Nav.Link>
            </div>
          </Col>
        </Row>

        <Navbar.Text className="text-center w-100 mt-3 footer-text">
          &copy; {new Date().getFullYear()} BE FIT. Все права защищены.
        </Navbar.Text>
      </Container>
    </Navbar>
  );
}