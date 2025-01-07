import ProgressBar from 'react-bootstrap/ProgressBar';
import styles from './PersonalPage.module.css'; 
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { Container, Row } from 'react-bootstrap';

export default function ProgressBarComp() {
    const now = 60;
    const dispatch = useAppDispatch();
    const { user, loading, error } = useAppSelector(
      (state) => state.appSlice);

  return (
    <>
    <Container className={styles.statistic}>
      <Row>
      {user.username?.toUpperCase()}Hfhsfs
      </Row>
      <Row>
      {user.points}200
      </Row>
    </Container>
    <ProgressBar
      className={styles.progressbar}
      variant='success'
      now={now}
      label={`${now}%`}
    ></ProgressBar>
    </>
  );
}
