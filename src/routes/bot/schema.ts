import Joi from "@hapi/joi";

export default {
  payload: Joi.object().keys({
    ProfileName: Joi.string().required(),
    Body: Joi.string().required(),
    WaId: Joi.string().required(),
    From: Joi.string().required(),
  }),
};
