import { ReadStream } from "fs";
import { getStreamBody } from "./getStreamBody";
import { getUuid } from "./getUuid";


export async function uploadFile(readStream: ReadStream, mimetype: string): Promise<{Body: Buffer, Key: string, ContentType: string}> {
  const recordingBuffer = await getStreamBody(readStream);

  // validate file type
  const validMimeTypes = ["file/stl"];

  // validate mimetype
  if (!validMimeTypes.includes(mimetype)) {
    throw new Error("Invalid audio file provided (we support .stl  files)");
  }

  // set upload params
  const params = {
    // Bucket: config.aws.bucket,
    Body: recordingBuffer,
    Key: `file/${getUuid()}.stl`,
    ContentType: mimetype,
  };

  return params;

//   try {
//     const upload = await s3.upload(params).promise();

//     console.log({ upload }, "recording successfully uploaded");

//     return upload.Location;
//   } catch (error) {
//     console.log({ error }, "uploading recording image to S3 failed");

//     throw new Error("Uploading recording failed");
//   }
}
