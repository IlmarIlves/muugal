import { ReadStream } from "fs";
import { getStreamBody } from "./getStreamBody";
import { getUuid } from "./getUuid";


export async function uploadFile(readStream: ReadStream, mimetype: string): Promise<{Body: Buffer, Key: string, ContentType: string}> {
  const fileBuffer = await getStreamBody(readStream);

  console.log(mimetype);

  // validate file type
  const validMimeTypes = ["application/sla", "application/x-navistyle", "application/vnd.ms-pki.stl", "application/octet-stream"];

  // validate mimetype
  if (!validMimeTypes.includes(mimetype)) {
    throw new Error("Invalid file provided (we support .stl  files)");
  }

  // set upload params
  const params = {
    // Bucket: config.aws.bucket,
    Body: fileBuffer,
    Key: `file/${getUuid()}.stl`,
    ContentType: mimetype,
  };

  console.log(params);

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
