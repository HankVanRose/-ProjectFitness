import ProgressBar from 'react-bootstrap/ProgressBar';
import styles from './PersonalPage.module.css';
import { useAppSelector } from '../../store/hooks/hooks';
import { Col, Container, Image, Row } from 'react-bootstrap';

export default function ProgressBarComp() {
  const now = 60;
  const { user, loading, error } = useAppSelector((state) => state.appSlice);

  return (
    <Container>
      <Row>
        <Col md={4} className='d-flex align-items-center'>
          <Image
            src={user?.avatar}
            roundedCircle
            style={{height: '200px'}}
          />
        </Col>
        <Col md={8} className={styles.statistic}>
          <Row>
            <Col>{user?.username?.toUpperCase()}</Col>
            <Col>{user?.points} баллов</Col>
          </Row>
          <Row className='mt-3'>
            <Col>
              <ProgressBar
                className={styles.progressbar}
                variant='success'
                now={now}
                label={`${now}%`}
              ></ProgressBar>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
