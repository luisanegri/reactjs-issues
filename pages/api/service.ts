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

export interface INode {
  node: IIssue;
}

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

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const ISSUES_QUERY = gql`
  query MyQuery($first: Int, $after: String) {
    repository(name: "reactjs.org", owner: "reactjs") {
      issues(first: $first, after: $after) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            closed
            id
            title
            url
          }
        }
      }
    }
  }
`;
