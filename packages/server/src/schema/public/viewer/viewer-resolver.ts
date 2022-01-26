import { queryField } from "nexus";
import { Viewer } from "./ViewerType";

export default queryField("viewer", {
    type: Viewer,
    description: "Query viewer",
  
    resolve: async (_parent, args, context) => {
 
  
      
  
  
        // return null if not logged in
        if (!context.viewer) {
            return null;
          }
  
 
  
          // return logged in user
          return context.viewer;
    },
  });