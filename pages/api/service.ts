import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

interface IIssues {
  node: {
    id: number;
    title: string;
    url: string;
    closed: boolean;
  };
}

export const handler = async () => {
  const httpLink: ApolloLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
  });

  const authLink: ApolloLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${process.env.GITHUB_PAT}`,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const {
    data: {
      repository: {
        issues: { edges },
      },
    },
  } = await client.query({
    query: gql`
      {
        repository(name: "reactjs.org", owner: "reactjs") {
          issues(first: 20) {
            edges {
              node {
                id
                title
                url
                closed
              }
            }
          }
        }
      }
    `,
  });

  const issues = edges.map(({ node }: IIssues) => node);

  console.log('issues', issues);
};
