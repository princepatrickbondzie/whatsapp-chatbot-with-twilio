import Joi from "@hapi/joi";
import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { ValidationSource } from "../common/enums";

export const JoiObjectId = () =>
  Joi.string().custom((value, helpers) => {
    if (!Types.ObjectId.isValid(value)) return helpers.error("any.invalid");
    return value;
  }, "Object Id Validation");

export const JoiUrlEndpoint = () =>
  Joi.string().custom((value, helpers) => {
    if (value.includes("://")) return helpers.error("any.invalid");
    return value;
  }, "Url Endpoint Validation");

export const JoiAuthBearer = () =>
  Joi.string().custom((value, helpers) => {
    if (!value.startsWith("Bearer ")) return helpers.error("any.invalid");
    if (!value.split(" ")[1]) return helpers.error("any.invalid");
    return value;
  }, "Authorization Header Validation");

export default (schema: any, source?: keyof Request) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = source ? req[source] : req.body;
      const { error } = schema.validate(data);

      if (!error) return next();

      const { details } = error;
      const message = details
        .map((i: any) => i.message.replace(/['"]+/g, ""))
        .join(",");

      next(new Error(message));
    } catch (error) {
      next(error);
    }
  };
