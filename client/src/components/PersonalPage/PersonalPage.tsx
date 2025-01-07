import { Col, Container, Row } from 'react-bootstrap';
import ProgressBarComp from './ProgressBarComp';
import ProfileData from './ProfileData';

export default function PersonalPage() {
  return (
    <Container>
      <ProgressBarComp />
      <Container>
        <Row>
          <Col sm={12}><ProfileData /></Col>
        </Row>
      </Container>
    </Container>
  );
}
