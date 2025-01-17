import { NextFunction, Request, Response, ParsedRequest } from 'express';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import { ConflictError, NotFoundError } from '../core/ApiError';
import asyncHandler from '../middlewares/asyncHandler';
import { env_vars } from '../config';
import {
  FindUserOptions,
  userRepository,
} from '../database//repositories/user.repository';
import { ISignupSchema, ICredentialSchema } from '../schemas/auth.schema';
import {
  IUserAllSchema,
  IUserIdSchema,
  IUserUpdateSchema,
} from '../schemas/user.schema';
import { defaultOrderParams } from '../utils/order';
import { defaultPaginationParams } from '../utils/pagination';
import { existRecord, needRecord } from '../utils/record';
import { Role, User } from '@prisma/client';
import { excludeFields } from '../utils/utils';

export class UserController {
  // SignUp user handler
  public registerUser = asyncHandler(
    async (
      req: ParsedRequest<ISignupSchema>,
      res: Response,
      next: NextFunction,
    ) => {
      const { email, password, name } = req.valid.body;

      existRecord(
        await userRepository.exists(email),
        new ConflictError('User already exist'),
      );

      const user = await userRepository.insert({
        name,
        email,
        password,
        role: Role.USER,
      });

      const token = jwt.sign({ email: req.body.email }, env_vars.jwt.secret, {
        expiresIn: env_vars.jwt.accessExpiration,
      });
      res.created({
        message: 'user created',
        data: {
          token,
          user: excludeFields(user, ['password']),
        },
      });
    },
  );

  // passport local strategy handler
  public authenticateUser(
    req: ParsedRequest<ICredentialSchema>,
    res: Response,
    next: NextFunction,
  ) {
    passport.authenticate(
      'local',
      { session: false },
      function (err, user: User, info) {
        if (err) return next(err);
        if (user) {
          const token = jwt.sign(
            { email: req.valid.body.email },
            env_vars.jwt.secret,
            {
              expiresIn: env_vars.jwt.accessExpiration,
            },
          );
          res.ok({
            message: 'loggedIn',
            data: { token, user: excludeFields(user, ['password']) },
          });
        }
      },
    )(req, res, next);
  }

  // return authenticated user details
  public me(req: Request, res: Response, next: NextFunction) {
    res.ok({ message: 'success', data: excludeFields(req.user, ['password']) });
  }

  public async updateMe(
    req: ParsedRequest<IUserUpdateSchema>,
    res: Response,
    next: NextFunction,
  ) {
    const updateBody = req.valid.body;

    if (updateBody.email) {
      existRecord(
        await userRepository.exists(updateBody.email),
        new ConflictError('User already exist'),
      );
    }

    const data = await userRepository.patchById(req.user.id, updateBody);

    res.ok({
      message: 'User has been updated',
      data,
    });
  }

  public deleteMe = asyncHandler(
    async (req: ParsedRequest<void>, res: Response, next: NextFunction) => {
      await userRepository.deleteById(req.user.id);

      res.noContent({ message: 'User has been updated' });
    },
  );

  public get = asyncHandler(
    async (
      req: ParsedRequest<void, IUserAllSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const options: FindUserOptions = {
        filter: {},
        order: defaultOrderParams(
          req.valid.query.orderColumn,
          req.valid.query.orderDirection,
        ),
        pagination: defaultPaginationParams(
          req.valid.query.page,
          req.valid.query.pageSize,
        ),
        search: req.valid.query.search,
      };

      const users = await userRepository.findForUser(options);
      res.ok({
        message: 'success',
        data: users,
      });
    },
  );

  public getOne = asyncHandler(
    async (
      req: ParsedRequest<void, void, IUserIdSchema>,
      res: Response,
      next: NextFunction,
    ) => {
      const user = needRecord(
        await userRepository.findById(req.valid.params.id),
        new NotFoundError('user not found'),
      );

      res.ok({
        message: 'Get User Successfully',
        data: excludeFields(user, ['password']),
      });
    },
  );

  public updateOne = asyncHandler(
    async (
      req: ParsedRequest<IUserUpdateSchema, void, IUserIdSchema>,
      res: Response,
      next: NextFunction,
    ) => {
      const updateBody = req.valid.body;

      const user = needRecord(
        await userRepository.findById(req.valid.params.id),
        new NotFoundError('user not found'),
      );

      if (updateBody.email) {
        existRecord(
          await userRepository.exists(updateBody.email),
          new ConflictError('User already exist'),
        );
      }

      const data = await userRepository.patchById(req.user.id, updateBody);

      res.ok({
        message: 'User has been updated',
        data,
      });
    },
  );

  public deleteOne = asyncHandler(
    async (
      req: ParsedRequest<void, void, IUserIdSchema>,
      res: Response,
      next: NextFunction,
    ) => {
      const user = needRecord(
        await userRepository.findById(req.valid.params.id),
        new NotFoundError('user not found'),
      );

      await userRepository.deleteById(user.id);

      res.noContent({ message: 'User has been updated' });
    },
  );
}
export const userController = new UserController();
