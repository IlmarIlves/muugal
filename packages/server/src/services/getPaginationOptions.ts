interface PaginationOptions {
    skip?: number | null;
    take?: number | null;
  }
  
  export function getPaginationOptions(options: PaginationOptions | null | undefined) {
    return {
      skip: typeof options?.skip === "number" ? options?.skip : 0,
      take: typeof options?.take === "number" ? options?.take : 100,
    };
  }
  