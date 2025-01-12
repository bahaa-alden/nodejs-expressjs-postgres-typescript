import { Role } from '@prisma/client';
import { NextFunction, Response, ParsedRequest } from 'express';

export default (...roleCodes: Role[]) =>
  (req: ParsedRequest, res: Response, next: NextFunction) => {
    req.currentRoleCodes = roleCodes;
    next();
  };
