import cookie from "cookie";
import { Request, Response, NextFunction } from "express";

function withAuth(req: Request, res: Response, next: NextFunction) {
  const cookies = cookie.parse(req.headers.cookie ?? "");

  // TODO
  (req as any).user = {
    id: "asd",
    email: "me@bene.dev",
    name: "Bene",
  };

  next();
}

export default withAuth;
