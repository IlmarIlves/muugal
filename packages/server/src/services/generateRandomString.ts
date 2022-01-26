export function generateRandomString(length: number, pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") {
    let result = "";
  
    for (let i = 0; i < length; i++) {
      result += pool.charAt(Math.floor(Math.random() * pool.length));
    }
  
    return result;
  }
  