import * as passport from 'passport';
import { AuthFailureError } from '../core/ApiError';
import * as passportLocal from 'passport-local';
import * as passportJwt from 'passport-jwt';
import { JwtPayload } from '../core/JWT';
import { env_vars } from '../config';
import { userRepository } from '../database//repositories/user.repository';
import { validateHash } from '../utils/utils';

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

// local passport strategy for login

passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      const user = await userRepository.findByEmail(email);
      console.log(user);
      if (!user) {
        done(new AuthFailureError('Invalid email or password.'));
      } else {
        const result = await validateHash(password, user.password);
        if (!result) {
          done(new AuthFailureError('Invalid email or password.'));
        }
        return done(undefined, user);
      }
    },
  ),
);

// jwt passport strategy for protect routes

passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env_vars.jwt.secret,
    },
    async (jwtToken: JwtPayload, done) => {
      const user = await userRepository.findByEmail(
        jwtToken.email.toLowerCase(),
      );
      if (!user) return done(new AuthFailureError());
      return done(undefined, user);
    },
  ),
);
