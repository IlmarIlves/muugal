import { createHmac, BinaryToTextEncoding } from "crypto";

export function getKeyedHash(
  hashData: string,
  key: string,
  algorithm = "sha512",
  digest: BinaryToTextEncoding = "hex",
): string {
  return createHmac(algorithm, key).update(hashData).digest(digest);
}
