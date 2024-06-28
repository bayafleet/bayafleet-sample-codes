import { promises as fs } from 'fs'
import { Upload } from "@aws-sdk/lib-storage"
import { S3Client } from '@aws-sdk/client-s3'


const AWS_CRED = {
  "accessKeyId": "",
  "secretAccessKey": "",
  "region": "ap-southeast-1"
}

const bucketName = 'bucket-name'

const AWS_CONFIG = { region: AWS_CRED.region, credentials: AWS_CRED }

const s3 = new S3Client(AWS_CONFIG)



const uploadToS3 = async(filePath, fileName) => {
  
  const uploadFileItem = await fs.readFile(filePath);

  const uploadParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: uploadFileItem,
      ACL: 'public-read'
  };

  const S3UploadPipeline = new Upload({
      client: s3,
      params: uploadParams
  })

  return S3UploadPipeline
      .done()
      .then(() => {
          console.log('Upload Done');
      })
      .catch(err => {
          console.log(err);
          throw err;
      });
}

uploadToS3('path to file.xls', 'file name.xls')