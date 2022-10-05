import { Router } from "express";
import Validator from "../common/middlewares/validators";
import MetadataController from "../controllers/metadata";


const routes = (router: Router) => {

  /** 
   * Save metadata for a new token
  */
  router.post(
    "/:collectionId/metadata/:tokenId",
    ...[ Validator.addOneMetadata(), Validator.validate() ], 
    MetadataController.addNewMetadata
  );

  /** 
   * Fetch metadata for all tokens in the collection
   */
  router.get(
    "/:collectionId/metadata/",
    ...[ Validator.getAllMetadata(), Validator.validate() ],
    MetadataController.getAllMetadata
  );

  /** 
   * Fetch metadata for one token
   */
  router.get(
    "/:collectionId/metadata/:tokenId",
    ...[ Validator.getOneMetadata(), Validator.validate() ],
    MetadataController.getOneMetadata
  );

  /** 
   * Update metadata for one token
   */
  router.put(
    "/:collectionId/metadata/:tokenId",
    ...[ Validator.updateOneMetadata(), Validator.validate() ],
    MetadataController.updateOneMetadata
  );

  /** 
   * Delete metadata for one token
   */
  router.delete(
    "/:collectionId/metadata/:tokenId",
    ...[ Validator.deleteOneMetadata(), Validator.validate() ],
    MetadataController.deleteOneMetadata
  );

}

const metadataRouter: Router = Router();
routes(metadataRouter);


export default metadataRouter;
