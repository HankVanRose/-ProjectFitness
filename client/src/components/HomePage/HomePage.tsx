import Slides from './Slides';
import MainVideo from './MainVideo';
import PasswordInput from '../header/PasswordInput';

export default function HomePage() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  return (
    <>
          {/* <PasswordInput name="password" value={'awdcwadadawda'} onChange={handleChange} /> */}

      <MainVideo />

      {/* <Slides /> */}
    </>
  );
}
