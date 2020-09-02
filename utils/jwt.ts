import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { AuthenticationError } from 'apollo-server';


interface Token { 
  payload: { username: string }
}

/**
 * this function generate tokein
 * @param {string} payload 
 */

export const generateToken = (payload: { username: string }): string =>
   jwt.sign({ payload }, process.env.JWT_SECRET as string, { 
     expiresIn: Number(process.env.EXP_JWT_TIME) || '24h'
  });


/**
 * return token decode
 * @param {string} token 
 */

 export function decodeToken(token: string): Token  {
  try {
    token = token.replace('Bearer ', ''); 
    return jwt.verify(token, process.env.JWT_SECRET as string) as Token;
  } catch (e) {
    throw new AuthenticationError('Unauthenticated');
  }
}