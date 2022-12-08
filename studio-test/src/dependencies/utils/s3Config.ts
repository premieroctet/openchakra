export const s3Config = {
  bucketName: "my-alfred-data-test",
  region: "eu-west-3",
  accessKeyId: process.env.NEXT_PUBLIC_S3_ID || process.env.REACT_APP_S3_ID,
  secretAccessKey:
    process.env.NEXT_PUBLIC_S3_SECRET || process.env.REACT_APP_S3_SECRET,
  rootFolderName:
    process.env.NEXT_PUBLIC_S3_ROOTPATH || process.env.REACT_APP_S3_ROOTPATH
};

export const S3UrlRessource = ({
  filename,
  folder
}: {
  filename?: string | null;
  folder?: string | null;
}) => {
  const filteredFilename = filename && filename.replace(/(\s)/g, "_");
  const filteredFolder =
    folder &&
    folder
      .replace(/[^a-zA-Z0-9_\-()*!.']/g, "")
      .replace(/[\s]/g, "_")
      .replace(".zip", "");
  const fileInFolder = [
    s3Config.rootFolderName,
    filteredFolder,
    filteredFilename
  ]
    .filter(el => el)
    .join("/")
    .toString();

  return {
    fileInFolder,
    completeUrl: `https://${s3Config.bucketName}.s3.${s3Config.region}.amazonaws.com/${fileInFolder}`,
    scormUrl: `https://${s3Config.bucketName}.s3.${s3Config.region}.amazonaws.com/${fileInFolder}/index_lms.html`
  };
};
