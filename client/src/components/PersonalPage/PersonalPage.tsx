import { Col, Container, Row } from 'react-bootstrap';
import ProgressBarComp from './ProgressBarComp';
import SideBarComp from './SideBarComp';

export default function PersonalPage() {
  return (
    <>
      <ProgressBarComp />
      <Container>
        <Row>
          <Col sm={4}>sm=4</Col>
          <Col sm={8}></Col>
        </Row>
      </Container>
    </>
  );
}
