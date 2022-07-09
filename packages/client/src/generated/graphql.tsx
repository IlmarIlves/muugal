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
  /** Admin order by id */
  order: AdminOrder;
  /** List of users */
  orders: AdminOrders;
  /** Admin payment by id */
  payment: AdminPayment;
  /** List of users */
  payments: AdminPayments;
  /** Admin user by id */
  user: AdminUser;
  /** List of users */
  users: AdminUsers;
};


export type AdminOrderArgs = {
  orderId?: InputMaybe<Scalars['ID']>;
  priceInCents?: InputMaybe<Scalars['Int']>;
};


export type AdminPaymentArgs = {
  paymentId?: InputMaybe<Scalars['ID']>;
};


export type AdminUserArgs = {
  userId?: InputMaybe<Scalars['ID']>;
};


export type AdminUsersArgs = {
  filter?: InputMaybe<AdminUsersFilterInput>;
  match?: InputMaybe<MatchInput>;
  pagination?: InputMaybe<PaginationInput>;
};

export type AdminOrder = {
  __typename?: 'AdminOrder';
  /** User role */
  additionalInfo: Scalars['String'];
  /** User role */
  amount: Scalars['Int'];
  /** User role */
  colors: Scalars['String'];
  data: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  mimeType: Scalars['String'];
  telephone: Scalars['String'];
  userId: Scalars['ID'];
};

export type AdminOrders = {
  __typename?: 'AdminOrders';
  /** List of paginated orders */
  orders: Array<AdminOrder>;
};

export type AdminPayment = {
  __typename?: 'AdminPayment';
  /** Payment amount */
  amount: Scalars['Int'];
  /** Payment currencyCode */
  currencyCode: Scalars['String'];
  /** Payment currencyCode */
  emailUsedForPayment: Scalars['String'];
  /** Payment unique id */
  id: Scalars['ID'];
  /** Payment user unique id */
  stripeSessionId: Scalars['String'];
  /** Payment user unique id */
  userId: Scalars['ID'];
};

export type AdminPayments = {
  __typename?: 'AdminPayments';
  /** List of paginated orders */
  payments: Array<AdminPayment>;
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
  /** Reset user password */
  adminResetUserPassword: AdminUser;
  /** Changes current user password */
  changePassword: Viewer;
  /** Creates new Stripe checkout session */
  createStripeCheckoutSession: Payment;
  /** Attempts to log user in */
  login: LoginResponse;
  /** Logs out signed-in user if any */
  logout: Scalars['Boolean'];
  /** Uploads file */
  order: Order;
  /** Registers new user */
  register: User;
  /** Updates user status */
  updateOrderStatus: User;
};


export type MutationAdminResetUserPasswordArgs = {
  userId?: InputMaybe<Scalars['ID']>;
};


export type MutationChangePasswordArgs = {
  confirmPassword?: InputMaybe<Scalars['String']>;
  currentPassword?: InputMaybe<Scalars['String']>;
  newPassword?: InputMaybe<Scalars['String']>;
};


export type MutationCreateStripeCheckoutSessionArgs = {
  priceInCents?: InputMaybe<Scalars['Int']>;
  productName?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Int']>;
};


export type MutationLoginArgs = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};


export type MutationOrderArgs = {
  file?: InputMaybe<Scalars['Upload']>;
};


export type MutationRegisterArgs = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateOrderStatusArgs = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  packageMachineLocation?: InputMaybe<Scalars['String']>;
  telephone?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['ID']>;
};

export type Order = {
  __typename?: 'Order';
  /** User role */
  additionalInfo: Scalars['String'];
  /** User role */
  amount: Scalars['Int'];
  /** User role */
  colors: Scalars['String'];
  data: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  mimeType: Scalars['String'];
  telephone: Scalars['String'];
  userId: Scalars['ID'];
};

export enum OrderProgressStatusEnum {
  Paid = 'PAID',
  Payment = 'PAYMENT',
  Received = 'RECEIVED',
  Sent = 'SENT'
}

export type PaginationInput = {
  /** Number of items to skip */
  skip?: InputMaybe<Scalars['Int']>;
  /** Number of items to take */
  take?: InputMaybe<Scalars['Int']>;
};

export type Payment = {
  __typename?: 'Payment';
  /** Payment amount */
  amount: Scalars['Int'];
  /** Payment currencyCode */
  currencyCode: Scalars['String'];
  /** Payment currencyCode */
  emailUsedForPayment: Scalars['String'];
  /** Payment unique id */
  id: Scalars['ID'];
  /** Payment user unique id */
  stripeSessionId: Scalars['String'];
  /** Payment user unique id */
  userId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  /** Admin resolvers */
  admin: Admin;
  /** Query viewer */
  viewer?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  packageMachineLocation: Scalars['String'];
  telephone: Scalars['String'];
  /** User status */
  userStatus: UserStatusEnum;
};

export enum UserRoleEnum {
  Admin = 'ADMIN',
  Buyer = 'BUYER',
  Offerer = 'OFFERER',
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
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type ViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, telephone: string, packageMachineLocation: string } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type OrderMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type OrderMutation = { __typename?: 'Mutation', order: { __typename?: 'Order', userId: string } };


export const ViewerDocument = gql`
    query Viewer {
  viewer {
    id
    firstName
    lastName
    email
    telephone
    packageMachineLocation
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
export const OrderDocument = gql`
    mutation Order($file: Upload!) {
  order(file: $file) {
    userId
  }
}
    `;
export type OrderMutationFn = Apollo.MutationFunction<OrderMutation, OrderMutationVariables>;

/**
 * __useOrderMutation__
 *
 * To run a mutation, you first call `useOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderMutation, { data, loading, error }] = useOrderMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useOrderMutation(baseOptions?: Apollo.MutationHookOptions<OrderMutation, OrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderMutation, OrderMutationVariables>(OrderDocument, options);
      }
export type OrderMutationHookResult = ReturnType<typeof useOrderMutation>;
export type OrderMutationResult = Apollo.MutationResult<OrderMutation>;
export type OrderMutationOptions = Apollo.BaseMutationOptions<OrderMutation, OrderMutationVariables>;