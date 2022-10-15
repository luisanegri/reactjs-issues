import { useQuery } from '@apollo/client';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { IIssue, INode, ISSUES_QUERY } from './api/service';

const Home: NextPage = () => {
  const { data, loading, fetchMore } = useQuery(ISSUES_QUERY, {
    variables: {
      first: 10,
    },
    notifyOnNetworkStatusChange: true,
  });

  const { endCursor, hasNextPage } = data?.repository?.issues?.pageInfo || {};

  const allIssues: IIssue[] = data?.repository.issues.edges.map(
    ({ node }: INode) => node
  );

  const [issues, setIssues] = useState<IIssue[]>(undefined!);

  useEffect(() => {
    if (!issues) {
      setIssues(allIssues);
    }

  return (
    <div className={styles.container}>
      <h1>Reactjs issues</h1>

      <ul>
        {issues?.map((issue: IIssue) => {
          const statusColor = issue.closed ? 'red' : 'green';

          return (
            <a key={issue.id} href={issue.url} target="_blank" rel="noreferrer">
              <li>
                <span>{issue.title} </span>

                <span color={statusColor}>
                  {issue.closed ? 'Closed' : 'Open'}
                </span>
              </li>
            </a>
          );
        })}
      </ul>

      {hasNextPage && (
        <button
          onClick={() =>
            fetchMore({
              variables: { after: endCursor },
              updateQuery: (_prevResult, { fetchMoreResult }) => {
                const { repository } = fetchMoreResult;

                setIssues(
                  repository.issues.edges.map(({ node }: INode) => node)
                );

                return fetchMoreResult;
              },
            })
          }
        >
          More
        </button>
      )}

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Home;
