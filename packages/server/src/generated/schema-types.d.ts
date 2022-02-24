/**
 * This file was automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  UserStatusEnum: "ACTIVE" | "DEACTIVATED" | "DISABLED"
}

export interface NexusGenRootTypes {
  Mutation: {};
  Query: {};
  User: { // root type
    firstName: string; // String!
    id: string; // String!
    lastName: string; // String!
  }
  Viewer: { // root type
    firstName: string; // String!
    id: string; // String!
    lastName: string; // String!
  }
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  UserStatusEnum: NexusGenEnums['UserStatusEnum'];
}

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    login: NexusGenRootTypes['Viewer']; // Viewer!
    logout: boolean; // Boolean!
    register: NexusGenRootTypes['Viewer']; // Viewer!
  }
  Query: { // field return type
    viewer: NexusGenRootTypes['User']; // User!
  }
  User: { // field return type
    firstName: string; // String!
    id: string; // String!
    lastName: string; // String!
  }
  Viewer: { // field return type
    firstName: string; // String!
    id: string; // String!
    lastName: string; // String!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    login: { // args
      email?: string | null; // String
      password?: string | null; // String
    }
    register: { // args
      email?: string | null; // String
      firstName?: string | null; // String
      lastName?: string | null; // String
      password?: string | null; // String
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Mutation" | "Query" | "User" | "Viewer";

export type NexusGenInputNames = never;

export type NexusGenEnumNames = "UserStatusEnum";

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}