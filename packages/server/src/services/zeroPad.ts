export function zeroPad(value: string | number, length = 2) {
    const useValue = typeof value === "number" ? value.toString() : value;
  
    return useValue.padStart(length, "0");
  }
  