import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { queryApi, IIssue } from './api/service';

const Home: NextPage<IIssue[]> = ({ issues }) => {
  return (
    <div className={styles.container}>
      <h1>Reactjs issues</h1>

      <ul>
        {issues.map((issue: IIssue) => {
          return (
            <a key={issue.id} href={issue.url}>
              <li>{issue.title}</li>
            </a>
          );
        })}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  const issues = await queryApi();

  return {
    props: {
      issues,
    },
  };
}

export default Home;
