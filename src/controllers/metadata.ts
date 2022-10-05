import { Response } from "express";
import { CustomRequest } from "../common/interfaces/custom-express";
import KnexHelper from "../common/helpers/knex-helper";
import ResponseManager, {
  INTERNAL_SERVER_ERROR,
  REQ_RESOURCE_CREATED, RESOURCE_NOT_FOUND, REQ_OP_SUCCESSFUL
} from "../common/helpers/response-manager";


class MetadataController {
  static async addNewMetadata(req: CustomRequest, res: Response) {
    req.logger?.info("Handling insert-one-metadata request...");

    const { collectionId, tokenId } = req.params;
    const metadataBody = req.body;

    metadataBody.attributes = JSON.stringify(metadataBody.attributes);

    try {
      const insertResult = await KnexHelper.addNewMetadata({
        collection_id: collectionId, 
        token_id: Number(tokenId),
        ...metadataBody
      });
  
      if (!insertResult) {
        req.logger?.info("Failed to add new Metadata for tokenId...");
        return ResponseManager.respond(res, ResponseManager.generateMessage(INTERNAL_SERVER_ERROR.code, "Failed to add new Metadata for tokenId"));
      }
  
      req.logger?.info("About to return response to request...");
      return ResponseManager.respond(res, ResponseManager.generateMessage(REQ_RESOURCE_CREATED.code, "Metadata added for token successfully"));
    }
    catch (error) {
      req.logger?.error("Unexpected error...", error);
      return ResponseManager.respond(res, ResponseManager.generateMessage(INTERNAL_SERVER_ERROR.code, "Internal server error"));
    }
  }
  
  static async getOneMetadata(req: CustomRequest, res: Response) {
    req.logger?.info("Handling get-one-metadata request...");
    
    const { collectionId, tokenId } = req.params;

    try {
      const metadata = await KnexHelper.getOneMetadata(collectionId, tokenId);
  
      if (!metadata || !metadata.length) {
        req.logger?.info("Metadata not found for tokenId...");
        return ResponseManager.respond(res, ResponseManager.generateMessage(RESOURCE_NOT_FOUND.code, "Metadata not found"));
      }
  
      req.logger?.info("About to return response to request...");
      return ResponseManager.respond(res, ResponseManager.generateSuccessMessage("Metadata fetched successfully", metadata[0]));
    }
    catch (error) {
      req.logger?.error("Unexpected error...", error);
      return ResponseManager.respond(res, ResponseManager.generateMessage(INTERNAL_SERVER_ERROR.code, "Internal server error"));
    }
  }

  static async getAllMetadata(req: CustomRequest, res: Response) {
    req.logger?.info("Handling get-all-metadata request...");

    const { collectionId } = req.params;

    try {
      const metadata = await KnexHelper.getAllMetadata(collectionId);
  
      if (!metadata || !metadata.length) {
        req.logger?.info("Metadata not found for collection...");
        return ResponseManager.respond(res, ResponseManager.generateMessage(RESOURCE_NOT_FOUND.code, "Metadata not found"));
      }
  
      req.logger?.info("About to return response to request...");
      return ResponseManager.respond(res, ResponseManager.generateSuccessMessage("Metadata fetched successfully", metadata));
    }
    catch (error) {
      req.logger?.error("Unexpected error...", error);
      return ResponseManager.respond(res, ResponseManager.generateMessage(INTERNAL_SERVER_ERROR.code, "Internal server error"));
    }
  }

  static async updateOneMetadata(req: CustomRequest, res: Response) {
    req.logger?.info("Handling update-one-metadata request...");

    const { collectionId, tokenId } = req.params;
    const metadataBody = req.body;

    try {
      const updateResult = await KnexHelper.updateOneMetadata(collectionId, tokenId, metadataBody);
  
      if (!updateResult) {
        req.logger?.info("Failed to update Metadata for tokenId...");
        return ResponseManager.respond(res, ResponseManager.generateMessage(INTERNAL_SERVER_ERROR.code, "Failed to update Metadata for tokenId"));
      }
  
      req.logger?.info("About to return response to request...");
      return ResponseManager.respond(res, ResponseManager.generateMessage(REQ_OP_SUCCESSFUL.code, "Metadata updated successfully"));
    }
    catch (error) {
      req.logger?.error("Unexpected error...", error);
      return ResponseManager.respond(res, ResponseManager.generateMessage(INTERNAL_SERVER_ERROR.code, "Internal server error"));
    }
  }

  static async deleteOneMetadata(req: CustomRequest, res: Response) {
    req.logger?.info("Handling delete-one-metadata request...");

    const { collectionId, tokenId } = req.params;

    try {
      const deleteResult = await KnexHelper.deleteOneMetadata(collectionId, tokenId);
  
      if (!deleteResult) {
        req.logger?.info("Failed to delete Metadata for tokenId...");
        return ResponseManager.respond(res, ResponseManager.generateMessage(INTERNAL_SERVER_ERROR.code, "Failed to delete Metadata for tokenId"));
      }
  
      req.logger?.info("About to return response to request...");
      return ResponseManager.respond(res, ResponseManager.generateMessage(REQ_OP_SUCCESSFUL.code, "Metadata deleted successfully"));
    }
    catch (error) {
      req.logger?.error("Unexpected error...", error);
      return ResponseManager.respond(res, ResponseManager.generateMessage(INTERNAL_SERVER_ERROR.code, "Internal server error"));
    }
  }
}


export default MetadataController;
