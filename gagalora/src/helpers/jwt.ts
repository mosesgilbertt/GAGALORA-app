import { jwtVerify } from 'jose';
import { sign, verify } from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET_KEY as string;

export const signToken = (payload: { _id: string; email: string }) => sign(payload, SECRET);

export const verifyToken = (token: string) => verify(token, SECRET);

export const verifyWithJose = async <T>(token: string) => {
  const secret = new TextEncoder().encode(SECRET);
  const { payload } = await jwtVerify<T>(token, secret);

  return payload;
};
