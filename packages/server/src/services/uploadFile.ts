import S3 from 'aws-sdk/clients/s3';
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { ReadStream } from "fs";
import { getStreamBody } from "./getStreamBody";
import { getUuid } from "./getUuid";

export interface AwsConfig {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucket: string;
}


export async function uploadFile(readStream: ReadStream, mimetype: string): Promise<string> {
  const fileBuffer = await getStreamBody(readStream);

  // validate file type
  const validMimeTypes = ["application/sla", "application/x-navistyle", "application/vnd.ms-pki.stl", "application/octet-stream"];

  // validate mimetype
  if (!validMimeTypes.includes(mimetype)) {
    throw new Error("Invalid file provided (we support .stl  files)");
  }

const s3 = new S3({accessKeyId: process.env.AWS_ACCESS_KEY!, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!});

// set upload params
const params: PutObjectRequest = {
  Bucket: process.env.AWS_S3_BUCKET!,
  Body: fileBuffer,
  Key: `files/${getUuid()}.stl`,
  ContentType: mimetype,
};


try {
  // upload file to s3
  const upload = await s3.upload(params).promise();

  console.log({ upload }, "file successfully uploaded");

  return upload.Location;
} catch (error) {
  console.log({ error }, "uploading file to S3 failed");

  throw new Error("Uploading file failed");
}
}