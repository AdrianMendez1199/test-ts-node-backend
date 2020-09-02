import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { AuthenticationError } from 'apollo-server';


/**
 * this function generate tokein
 * @param {string} payload 
 */

/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types  */
export const getToken = (payload: any): string =>
   jwt.sign({ payload }, process.env.JWT_SECRET as string);


/**
 * return token decode
 * @param {string} token 
 */

/* eslint-disable-next-line @typescript-eslint/ban-types */
export function decodeToken(token: string): string | object {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (e) {
    throw new AuthenticationError('Unauthenticated');
  }
}