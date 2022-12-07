import AWS from "aws-sdk";

const S3_API_VERSION = "2006-03-01";

type ListFileResponse = {
  message: string;
  data: AWS.S3.ListObjectsOutput;
};
class FileManager {
  static s3: AWS.S3;
  static bucketName: string;
  static rootFolderName: string;

  /**
   * Initialize the s3 configurations
   *
   * @param {string} region AWS region, e.g., us-west-2
   * @param {string} bucketName AWS S3 bucket name
   * @param {string} [rootFolderName] AWS S3 root folder name without trailing forward slash
   */
  static initialize(
    region: string,
    bucketName: string,
    accessKeyId: string,
    secretAccessKey: string,
    rootFolderName = ""
  ) {
    AWS.config.update({ region });
    FileManager.s3 = new AWS.S3({
      apiVersion: S3_API_VERSION,
      accessKeyId,
      secretAccessKey
    });
    FileManager.bucketName = bucketName;
    FileManager.rootFolderName = rootFolderName;
  }

  /**
   * Get S3 object
   *
   * @param {string} objectKey Object key. Either folder or file object key
   * @returns {promise} Promise with response object
   */
  static async read(objectKey: string) {
    if (FileManager.rootFolderName !== "" && objectKey[0] !== "/") {
      objectKey = `/${objectKey}`;
    }

    return Promise.resolve(
      await FileManager.s3
        .getObject({
          Key: `${FileManager.rootFolderName}${objectKey}`,
          Bucket: FileManager.bucketName
        })
        .promise()
    );
  }

  /**
   * List objects under the folder at S3
   *
   * @param {string} pathToFolder Path to folder. E.g, cas/2021/
   * @returns {promise} Promise with response object
   */
  static async list(pathToFolder: string, continuationToken: string) {
    if (FileManager.rootFolderName !== "" && pathToFolder[0] !== "/") {
      pathToFolder = `/${pathToFolder}`;
    }
    if (pathToFolder !== "" && pathToFolder.slice(-1) !== "/") {
      pathToFolder = `${pathToFolder}/`;
    }

    return Promise.resolve(
      await FileManager.s3
        .listObjectsV2({
          Prefix: `${FileManager.rootFolderName}${pathToFolder}`,
          Bucket: FileManager.bucketName,
          ContinuationToken: continuationToken
        })
        .promise()
    );
  }

  /**
   * Create folder at S3
   *
   * @param {string} folderName Folder name includes the folder path under root folder
   * @param {string} [acl] Acl. Possible values: private | public-read | public-read-write | authenticated-read | aws-exec-read | bucket-owner-read | bucket-owner-full-control
   * @param {string} [contentType] Content-Type. E.g. "image/jpeg"
   * @param {object} [metaData] MetaData. Need key-value pair
   * @returns {promise} Promise with response object
   */
  static async createFolder(
    folderName: string,
    acl: string,
    contentType: string,
    metaData: any
  ) {
    if (!folderName.match(/\/$/)) {
      return Promise.reject({
        status: 400,
        message: `Invalid folder name: ${folderName}`
      });
    }
    return Promise.resolve(
      await FileManager.write(folderName, undefined, acl, contentType, metaData)
    );
  }

  /**
   * Create file from S3 bucket
   *
   * @param {string} fileName File name includes the folder path under root folder
   * @param {buffer} buffer Buffer data
   * @param {string} [acl] Acl. Possible values: private | public-read | public-read-write | authenticated-read | aws-exec-read | bucket-owner-read | bucket-owner-full-control
   * @param {string} [contentType] Content-Type. E.g. "image/jpeg"
   * @param {object} [metaData] MetaData. Need key-value pair
   * @returns {promise} Promise with response object
   */
  static async createFile(
    fileName: string,
    buffer: ReadableStream | Blob,
    acl: string,
    contentType: string,
    metaData: any
  ) {
    if (fileName.match(/\/$/)) {
      return Promise.reject({
        status: 400,
        message: `Invalid file name: ${fileName}`
      });
    }
    return Promise.resolve(
      await FileManager.write(fileName, buffer, acl, contentType, metaData)
    );
  }

  /**
   * Count no. of objects under that folder
   *
   * @param {string} folderName Folder name includes the folder path under root folder
   * @returns {promise} Promise with number
   */
  static async count(folderName: string) {
    if (folderName !== "" && !folderName.match(/\/$/)) {
      return Promise.reject({
        status: 400,
        message: `Invalid folder name: ${folderName}`
      });
    }

    let count = 0,
      result;
    do {
      // @ts-ignore
      result = await FileManager.list(
        folderName,
        (result && result.NextContinuationToken) || ""
      );
      // @ts-ignore
      count += result.KeyCount;
    } while (result && typeof result.NextContinuationToken !== "undefined");

    return Promise.resolve(count);
  }

  /**
   * Delete folder
   *
   * @param {string} folderName Folder name includes the folder path under root folder
   */
  static async deleteFolder(folderName: string) {
    if (!folderName.match(/\/$/)) {
      return Promise.reject({
        status: 400,
        message: `Invalid folder name: ${folderName}`
      });
    }
    if ((await FileManager.count(folderName)) > 1) {
      return Promise.reject({
        status: 400,
        message: `Folder ${folderName} is not empty`
      });
    }
    return Promise.resolve(await FileManager.delete(folderName));
  }

  /**
   * Delete file from S3 bucket
   *
   * @param {string} fileName File name includes the folder path under root folder
   * @returns {promise} Promise with response object
   */
  static async deleteFile(fileName: string) {
    if (fileName.match(/\/$/)) {
      return Promise.reject({
        status: 400,
        message: `Invalid file name: ${fileName}`
      });
    }
    return Promise.resolve(await FileManager.delete(fileName));
  }

  /**
   * Put objects to S3 bucket
   *
   * @param {string} objectKey Object key with folder path under root folder
   * @param {buffer} buffer Buffer data
   * @param {string} [acl] Acl. Possible values: private | public-read | public-read-write | authenticated-read | aws-exec-read | bucket-owner-read | bucket-owner-full-control
   * @param {string} [contentType] Content-Type. E.g. "image/jpeg"
   * @param {object} [metaData] MetaData. Need key-value pair
   * @returns {promise} Promise with response object
   */
  static async write(
    objectKey: string,
    buffer: ReadableStream | Blob | undefined,
    acl: string,
    contentType: string,
    metaData: any
  ) {
    if (FileManager.rootFolderName !== "" && objectKey[0] !== "/") {
      objectKey = `/${objectKey}`;
    }

    return FileManager.s3
      .upload({
        Key: `${FileManager.rootFolderName}${objectKey}`,
        Bucket: FileManager.bucketName,
        Body: buffer,
        ACL: acl,
        ContentType: contentType,
        Metadata: metaData
      })
      .promise()
      .then(res => {
        return Promise.resolve(res);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  /**
   * Delete object from S3 bucket
   *
   * @param {string} objectKey Object key with folder path under root folder
   * @returns {promise} Promise with response object
   */
  static async delete(objectKey: string) {
    if (FileManager.rootFolderName !== "" && objectKey[0] !== "/") {
      objectKey = `/${objectKey}`;
    }

    return Promise.resolve(
      await FileManager.s3
        .deleteObject({
          Key: `${FileManager.rootFolderName}${objectKey}`,
          Bucket: FileManager.bucketName
        })
        .promise()
    );
  }
}

export default FileManager;
