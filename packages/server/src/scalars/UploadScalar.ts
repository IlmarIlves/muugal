import { scalarType } from "@nexus/schema";
import { GraphQLUpload } from "graphql-upload";

export const Upload = scalarType({
  name: "Upload",
  asNexusMethod: "upload",
  description: "File upload",
  rootTyping: "Promise<FileUpload>",
  serialize: GraphQLUpload.serialize,
  parseValue: GraphQLUpload.parseValue,
  parseLiteral: GraphQLUpload.parseLiteral,
});
