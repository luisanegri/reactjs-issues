import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { handler } from './api/service';

const Home: NextPage = () => {
  return (
    <div className={styles.container} onClick={() => handler()}>
      <h1>hello world</h1>
    </div>
  )
}

export default Home
