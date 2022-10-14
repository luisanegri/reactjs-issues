import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export interface IIssue {
  id: number;
  title: string;
  url: string;
  closed: boolean;
}

interface INode {
  node: IIssue;
}

export const queryApi = async () => {
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

  const issues: IIssue[] = edges.map(({ node }: INode) => node);

  return issues;
};
