import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** File upload */
  Upload: any;
};

export type Admin = {
  __typename?: 'Admin';
  /** Admin user by id */
  user: AdminUser;
  /** List of users */
  users: AdminUsers;
};


export type AdminUserArgs = {
  userId?: InputMaybe<Scalars['ID']>;
};


export type AdminUsersArgs = {
  filter?: InputMaybe<AdminUsersFilterInput>;
  match?: InputMaybe<MatchInput>;
  pagination?: InputMaybe<PaginationInput>;
};

export type AdminUser = {
  __typename?: 'AdminUser';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  /** User role */
  userRole: Array<UserRoleEnum>;
  /** User status */
  userStatus: UserStatusEnum;
};

export type AdminUsers = {
  __typename?: 'AdminUsers';
  skip: Scalars['Int'];
  take: Scalars['Int'];
  total: Scalars['Int'];
  /** List of paginated users */
  users: Array<AdminUser>;
};

export type AdminUsersFilterInput = {
  /** Filter users by email */
  email?: InputMaybe<Scalars['String']>;
  /** Filter users by first name */
  firstName?: InputMaybe<Scalars['String']>;
  /** Filter users by last name */
  lastName?: InputMaybe<Scalars['String']>;
  /** Filter users by id */
  userId?: InputMaybe<Scalars['String']>;
};

export enum ConditionModeEnum {
  And = 'AND',
  Or = 'OR'
}

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

export type MatchInput = {
  conditionMode?: InputMaybe<ConditionModeEnum>;
  matchMode?: InputMaybe<MatchModeEnum>;
};

export enum MatchModeEnum {
  Contains = 'CONTAINS',
  Exact = 'EXACT',
  StartsWith = 'STARTS_WITH'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Creates new Stripe checkout session */
  createStripeCheckoutSession: Payment;
  /** Attempts to log user in */
  login: LoginResponse;
  /** Logs out signed-in user if any */
  logout: Scalars['Boolean'];
  /** Registers new user */
  register: User;
  /** Uploads file */
  uploadFile: Viewer;
};


export type MutationCreateStripeCheckoutSessionArgs = {
  subscriptionId?: InputMaybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};


export type MutationRegisterArgs = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};


export type MutationUploadFileArgs = {
  file?: InputMaybe<Scalars['Upload']>;
};

export type PaginationInput = {
  /** Number of items to skip */
  skip?: InputMaybe<Scalars['Int']>;
  /** Number of items to take */
  take?: InputMaybe<Scalars['Int']>;
};

export type Payment = {
  __typename?: 'Payment';
  /** Payment unique id */
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  /** Admin resolvers */
  admin: Admin;
  /** Query viewer */
  viewer: User;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  /** User status */
  userStatus: UserStatusEnum;
};

export enum UserRoleEnum {
  Admin = 'ADMIN',
  User = 'USER'
}

export enum UserStatusEnum {
  Active = 'ACTIVE',
  Deactivated = 'DEACTIVATED',
  Disabled = 'DISABLED'
}

export type Viewer = {
  __typename?: 'Viewer';
  accessToken: Scalars['String'];
};

export type ViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerQuery = { __typename?: 'Query', viewer: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UsersQueryVariables = Exact<{
  filter?: InputMaybe<AdminUsersFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  match?: InputMaybe<MatchInput>;
}>;


export type UsersQuery = { __typename?: 'Query', admin: { __typename?: 'Admin', users: { __typename?: 'AdminUsers', skip: number, take: number, total: number, users: Array<{ __typename?: 'AdminUser', id: string, email: string, firstName: string, lastName: string }> } } };


export const ViewerDocument = gql`
    query Viewer {
  viewer {
    id
    email
    firstName
    lastName
  }
}
    `;

/**
 * __useViewerQuery__
 *
 * To run a query within a React component, call `useViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewerQuery(baseOptions?: Apollo.QueryHookOptions<ViewerQuery, ViewerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, options);
      }
export function useViewerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewerQuery, ViewerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, options);
        }
export type ViewerQueryHookResult = ReturnType<typeof useViewerQuery>;
export type ViewerLazyQueryHookResult = ReturnType<typeof useViewerLazyQuery>;
export type ViewerQueryResult = Apollo.QueryResult<ViewerQuery, ViewerQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const UsersDocument = gql`
    query Users($filter: AdminUsersFilterInput, $pagination: PaginationInput, $match: MatchInput) {
  admin {
    users(filter: $filter, pagination: $pagination, match: $match) {
      skip
      take
      total
      users {
        id
        email
        firstName
        lastName
      }
    }
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *      match: // value for 'match'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;