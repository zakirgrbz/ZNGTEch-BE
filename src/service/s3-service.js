import AWS from 'aws-sdk';


const spacesEndpoint = new AWS.Endpoint('fra1.digitaloceanspaces.com');

const s3 = new AWS.S3 ({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    endpoint :spacesEndpoint
});

const uploadFile = (fileStream, fileName, bucketName) => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileStream
  };
  return s3.upload(params).promise();
};

const downloadFile = ( fileName, bucketName) => {
    const params = {
        Bucket: bucketName,
        Key: fileName,
    }
    return s3.getObject(params).createReadStream();
}

export { uploadFile , downloadFile };