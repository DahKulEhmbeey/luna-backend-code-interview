import { Metadata, MetadataRecord } from "../interfaces/metadata";
import logger from "../logger";
const knexClient = () => require("../../../db");


class KnexHelper {

  static metadataFields = [
    "name", "description", "attributes", 
    "external_url", 
    "image", "image_data",
    "background_color", "animation_url", "youtube_url"
  ];

  static async addNewMetadata(record: MetadataRecord): Promise<boolean> {
    const insertResult = await knexClient()('metadataTable').insert(record);
    logger.info("InsertOp result:", insertResult);

    return true;
  }

  static async getOneMetadata(collectionId: string, tokenId: string): Promise<Metadata[]> {
    const data = await knexClient()('metadataTable').select(...KnexHelper.metadataFields).where({
      collection_id: collectionId, token_id: tokenId
    }).limit(1);
    return <Metadata[]>data;
  }

  static async getAllMetadata(collectionId: string): Promise<Metadata[]> {
    const data = await knexClient()('metadataTable').select(...KnexHelper.metadataFields).where({ collection_id: collectionId });
    return <Metadata[]>data;
  }

  static async updateOneMetadata(collectionId: string, tokenId: string, metadataBody: Metadata): Promise<boolean> {
    const updateResult = await knexClient()('metadataTable')
      .where({ collection_id: collectionId, token_id: tokenId })
      .update(metadataBody);

    logger.info("UpdateOp result:", updateResult);
    return true;
  }

  static async deleteOneMetadata(collectionId: string, tokenId: string) {
    const deleteResult = await knexClient()('metadataTable')
      .where({ collection_id: collectionId, token_id: tokenId })
      .del();

    logger.info("DeleteOp result:", deleteResult);
    return deleteResult;
  }

}


export default KnexHelper;
