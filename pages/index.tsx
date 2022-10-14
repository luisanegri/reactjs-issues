import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { queryApi, IIssue } from './api/service';

const Home: NextPage<IIssue[]> = ({ issues }) => {
  return (
    <div className={styles.container} onClick={() => handler()}>
      <h1>hello world</h1>
    </div>
  )

export async function getStaticProps() {
  const issues = await queryApi();

  return {
    props: {
      issues,
    },
  };
}

export default Home;
