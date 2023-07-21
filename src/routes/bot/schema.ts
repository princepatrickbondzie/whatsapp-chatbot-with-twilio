import Joi from "@hapi/joi";

export default {
  payload: Joi.object().keys({
    name: Joi.string().required(),
    message: Joi.string().required(),
    from: Joi.string().required(),
  }),
};
