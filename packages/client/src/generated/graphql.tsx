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
  adminOrderById: AdminOrder;
  /** List of users */
  adminOrders: AdminOrders;
  /** Admin order by id */
  adminUpdateOrderPrice: AdminOrder;
  /** List of offers */
  offers: AdminOffers;
  /** Admin payment by id */
  payment: AdminPayment;
  /** List of users */
  payments: AdminPayments;
  /** Admin user by id */
  user: AdminUser;
  /** List of users */
  users: AdminUsers;
};


export type AdminAdminOrderByIdArgs = {
  orderId?: InputMaybe<Scalars['ID']>;
};


export type AdminAdminUpdateOrderPriceArgs = {
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

export type AdminOffers = {
  __typename?: 'AdminOffers';
  id: Scalars['ID'];
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
  adminOrders: Array<AdminOrder>;
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
  /** Adds offer to order */
  addOffer: Offer;
  /** Reset user password */
  adminResetUserPassword: AdminUser;
  /** Changes current user password */
  changePassword: Viewer;
  /** Creates new Stripe checkout session */
  createStripeCheckoutSession: Payment;
  /** Logs out signed-in user if any */
  delete: Scalars['Boolean'];
  /** Attempts to log user in */
  login: LoginResponse;
  /** Logs out signed-in user if any */
  logout: Scalars['Boolean'];
  /** Creates order */
  order: Order;
  /** Registers new user */
  registerUser: User;
  /** Updates user status */
  updateOrderPrice: Order;
  /** Updates user status */
  updateOrderStatus: AdminUser;
  /** Updates user status */
  updateUserInformation: User;
  /** Uploads file */
  uploadFile: Order;
};


export type MutationAddOfferArgs = {
  finishedInDays?: InputMaybe<Scalars['String']>;
  priceInCents?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['ID']>;
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
  additionalInfo?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['Int']>;
  colors?: InputMaybe<OrderColorsEnum>;
  email?: InputMaybe<Scalars['String']>;
  file?: InputMaybe<Scalars['Upload']>;
  telephone?: InputMaybe<Scalars['String']>;
};


export type MutationRegisterUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  isUserBuyer?: InputMaybe<Scalars['Boolean']>;
  isUserOfferer?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  packageMachineLocation?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  telephone?: InputMaybe<Scalars['String']>;
  userRole?: InputMaybe<UserRoleEnum>;
};


export type MutationUpdateOrderPriceArgs = {
  finishedInDays?: InputMaybe<Scalars['Int']>;
  offererUserId?: InputMaybe<Scalars['Int']>;
  orderId?: InputMaybe<Scalars['ID']>;
  priceInCents?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateOrderStatusArgs = {
  userId?: InputMaybe<Scalars['ID']>;
};


export type MutationUpdateUserInformationArgs = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  packageMachineLocation?: InputMaybe<Scalars['String']>;
  telephone?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['ID']>;
};


export type MutationUploadFileArgs = {
  file?: InputMaybe<Scalars['Upload']>;
};

export type Offer = {
  __typename?: 'Offer';
  id: Scalars['ID'];
};

export type Order = {
  __typename?: 'Order';
  /** User role */
  additionalInfo: Scalars['String'];
  /** User role */
  amount: Scalars['Int'];
  /** Order available colors */
  colors: OrderColorsEnum;
  email: Scalars['String'];
  fileUrl: Scalars['String'];
  finishedInDays?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastOffererUserId?: Maybe<Scalars['String']>;
  priceInCents?: Maybe<Scalars['String']>;
  telephone: Scalars['String'];
  userId: Scalars['ID'];
};

export enum OrderColorsEnum {
  Black = 'BLACK',
  White = 'WHITE'
}

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
  /** List of orders */
  activeOrder: Array<Order>;
  /** Admin resolvers */
  admin: Admin;
  /** List of orders */
  offers: Array<Offer>;
  /** List of orders */
  orders: Array<Order>;
  /** Query viewer */
  viewer?: Maybe<User>;
};


export type QueryActiveOrderArgs = {
  userId?: InputMaybe<Scalars['ID']>;
};


export type QueryOffersArgs = {
  userId?: InputMaybe<Scalars['ID']>;
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

export type OrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type OrdersQuery = { __typename?: 'Query', orders: Array<{ __typename?: 'Order', id: string, userId: string, email: string, telephone: string, colors: OrderColorsEnum, amount: number, priceInCents?: string | null, finishedInDays?: string | null, additionalInfo: string, lastOffererUserId?: string | null, fileUrl: string }> };

export type ChangePasswordMutationVariables = Exact<{
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'Viewer', accessToken: string } };

export type UpdateUserInformationMutationVariables = Exact<{
  userId: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  telephone: Scalars['String'];
  packageMachineLocation: Scalars['String'];
}>;


export type UpdateUserInformationMutation = { __typename?: 'Mutation', updateUserInformation: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, telephone: string, packageMachineLocation: string } };

export type DeleteUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = { __typename?: 'Mutation', delete: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type OrderMutationVariables = Exact<{
  file: Scalars['Upload'];
  email: Scalars['String'];
  colors: OrderColorsEnum;
  amount: Scalars['Int'];
  additionalInfo: Scalars['String'];
  telephone: Scalars['String'];
}>;


export type OrderMutation = { __typename?: 'Mutation', order: { __typename?: 'Order', userId: string } };

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  telephone: Scalars['String'];
  packageMachineLocation: Scalars['String'];
  userRole: UserRoleEnum;
  isUserBuyer: Scalars['Boolean'];
  isUserOfferer: Scalars['Boolean'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } };


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
export const OrdersDocument = gql`
    query Orders {
  orders {
    id
    userId
    email
    telephone
    colors
    amount
    priceInCents
    finishedInDays
    additionalInfo
    lastOffererUserId
    fileUrl
  }
}
    `;

/**
 * __useOrdersQuery__
 *
 * To run a query within a React component, call `useOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrdersQuery(baseOptions?: Apollo.QueryHookOptions<OrdersQuery, OrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrdersQuery, OrdersQueryVariables>(OrdersDocument, options);
      }
export function useOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrdersQuery, OrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrdersQuery, OrdersQueryVariables>(OrdersDocument, options);
        }
export type OrdersQueryHookResult = ReturnType<typeof useOrdersQuery>;
export type OrdersLazyQueryHookResult = ReturnType<typeof useOrdersLazyQuery>;
export type OrdersQueryResult = Apollo.QueryResult<OrdersQuery, OrdersQueryVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
  changePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
    accessToken
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      currentPassword: // value for 'currentPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const UpdateUserInformationDocument = gql`
    mutation UpdateUserInformation($userId: ID!, $firstName: String!, $lastName: String!, $email: String!, $telephone: String!, $packageMachineLocation: String!) {
  updateUserInformation(
    userId: $userId
    firstName: $firstName
    lastName: $lastName
    email: $email
    telephone: $telephone
    packageMachineLocation: $packageMachineLocation
  ) {
    id
    email
    firstName
    lastName
    telephone
    packageMachineLocation
  }
}
    `;
export type UpdateUserInformationMutationFn = Apollo.MutationFunction<UpdateUserInformationMutation, UpdateUserInformationMutationVariables>;

/**
 * __useUpdateUserInformationMutation__
 *
 * To run a mutation, you first call `useUpdateUserInformationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserInformationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserInformationMutation, { data, loading, error }] = useUpdateUserInformationMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      telephone: // value for 'telephone'
 *      packageMachineLocation: // value for 'packageMachineLocation'
 *   },
 * });
 */
export function useUpdateUserInformationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserInformationMutation, UpdateUserInformationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserInformationMutation, UpdateUserInformationMutationVariables>(UpdateUserInformationDocument, options);
      }
export type UpdateUserInformationMutationHookResult = ReturnType<typeof useUpdateUserInformationMutation>;
export type UpdateUserInformationMutationResult = Apollo.MutationResult<UpdateUserInformationMutation>;
export type UpdateUserInformationMutationOptions = Apollo.BaseMutationOptions<UpdateUserInformationMutation, UpdateUserInformationMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser {
  delete
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
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
    mutation Order($file: Upload!, $email: String!, $colors: OrderColorsEnum!, $amount: Int!, $additionalInfo: String!, $telephone: String!) {
  order(
    file: $file
    email: $email
    colors: $colors
    amount: $amount
    additionalInfo: $additionalInfo
    telephone: $telephone
  ) {
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
 *      email: // value for 'email'
 *      colors: // value for 'colors'
 *      amount: // value for 'amount'
 *      additionalInfo: // value for 'additionalInfo'
 *      telephone: // value for 'telephone'
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
export const RegisterUserDocument = gql`
    mutation RegisterUser($email: String!, $password: String!, $firstName: String!, $lastName: String!, $telephone: String!, $packageMachineLocation: String!, $userRole: UserRoleEnum!, $isUserBuyer: Boolean!, $isUserOfferer: Boolean!) {
  registerUser(
    email: $email
    password: $password
    firstName: $firstName
    lastName: $lastName
    telephone: $telephone
    packageMachineLocation: $packageMachineLocation
    userRole: $userRole
    isUserBuyer: $isUserBuyer
    isUserOfferer: $isUserOfferer
  ) {
    id
    email
    firstName
    lastName
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      telephone: // value for 'telephone'
 *      packageMachineLocation: // value for 'packageMachineLocation'
 *      userRole: // value for 'userRole'
 *      isUserBuyer: // value for 'isUserBuyer'
 *      isUserOfferer: // value for 'isUserOfferer'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;