import { Response, NextFunction } from "express";
import { body, param, oneOf, validationResult  } from "express-validator";
import { CustomRequest } from "../interfaces/custom-express";
import ResponseManager, { REQ_VALIDATION_FAILED } from "../../common/helpers/response-manager";


class Validator {

  static validate() {
    return async (req: CustomRequest, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        return ResponseManager.respond(res, ResponseManager.generateMessage(REQ_VALIDATION_FAILED.code, "Invalid/incomplete input parameter(s)"));
      }
      return next();
    };
  }

  // METADATA

  static addOneMetadata() {
    return [
      param("collectionId").isString(),
      param("tokenId").isNumeric(),
      body("name").isString(),
      body("description").isString(),
      body("attributes").exists(),
      body("external_url").isString().isURL().optional(),
      oneOf([
        body("image").isString().isURL().optional(),
        body("image_data").isString().optional(),
      ]),
      body("background_color").isHexColor().optional(),
      body("animation_url").isString().isURL().optional(),
      body("youtube_url").isString().isURL().optional(),
    ];
  }

  static getOneMetadata() {
    return [
      param("collectionId").isString(),
      param("tokenId").isNumeric(),
    ];
  }

  static getAllMetadata() {
    return [
      param("collectionId").isString(),
    ];
  }

  static updateOneMetadata() {
    return [
      param("collectionId").isString(),
      param("tokenId").isNumeric(),
      body("name").isString().optional(),
      body("description").isString().optional(),
      body("attributes").exists().optional(),
      body("external_url").isString().isURL().optional(),
      body("image").isString().isURL().optional(),
      body("image_data").isString().optional(),
      body("background_color").isHexColor().optional(),
      body("animation_url").isString().isURL().optional(),
      body("youtube_url").isString().isURL().optional(),
    ];
  }

  static deleteOneMetadata() {
    return [
      param("collectionId").isString(),
      param("tokenId").isNumeric(),
    ];
  }
}


export default Validator;
