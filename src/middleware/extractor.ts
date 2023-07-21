import { Request, Response, NextFunction } from "express";

function webhookMiddleware(req: Request, res: Response, next: NextFunction) {
  // Extract the required fields from the request payload
  const { ProfileName, WaId, Body } = req.body;

  // Modify the req.body to include the required fields
  req.body = {
    name: ProfileName,
    from: WaId,
    message: Body,
  };

  // Continue to the next controller
  next();
}

export default webhookMiddleware;
