import { ReadStream } from "fs";
import { promisify } from "util";
import getRawBody from "raw-body";

export async function getStreamBody(stream: ReadStream) {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return await promisify<ReadStream, Buffer>(getRawBody)(stream);
}
