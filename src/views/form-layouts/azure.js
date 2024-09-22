import { BlobServiceClient, AnonymousCredential } from "@azure/storage-blob";
import { Buffer } from "buffer";

const buffer = window.Buffer || Buffer;


export async function uploadFileToAzure(fileName, file,) {
    return new Promise(async (resolve, reject) => {
      if (!file) {
        console.error("No file selected");
        resolve({
          error: "No file selected",
        });
      }

  
      const accountName = "reaidystorage";
      console.log("accountName:", accountName);
      const containerName = "user-media";
      console.log("containerName:", containerName);
  
      // const sasToken = "sp=racwdli&st=2024-03-20T18:30:00Z&se=2025-03-20T18:29:00Z&sv=2022-11-02&sr=c&sig=tlqtEu1HVhOSRqIw%2FE0btBesuAxCma9WdSE1%2BvNOuZg%3D";
      const sasToken = "sp=racwdli&st=2024-03-20T18:30:00Z&se=2025-03-20T18:29:00Z&sv=2022-11-02&sr=c&sig=tlqtEu1HVhOSRqIw%2FE0btBesuAxCma9WdSE1%2BvNOuZg%3D";
      console.log("sasToken:", sasToken);
  
      const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net?${sasToken}`,
        new AnonymousCredential()
      );
  
      const containerClient = blobServiceClient.getContainerClient(containerName);
      const blobName = fileName;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  
      try {
        let temp = await blockBlobClient.uploadData(file);
        console.log("Image uploaded successfully!", temp);
        console.log(
          `https://${accountName}.blob.core.windows.net/${containerName}/${fileName}`
        );
        resolve({
          // success: "Image uploaded successfully!",
          url: `https://${accountName}.blob.core.windows.net/${containerName}/${fileName}`,
          data: temp,
          success: true,
        });
      } catch (error) {
        console.error("Error uploading image:", error.message);
        resolve({
          error: "Error uploading image:",
          data: error,
          success: false,
        });
      }
    });
  }