import UserModel from '@/db/models/UserModel';
import errorHandler from '@/helpers/errorHandler';
import { comparePassword } from '@/helpers/hashPassword';
import { signToken } from '@/helpers/jwt';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const user = await UserModel.findByEmail(body.email);
    if (!user) {
      throw { message: 'Invalid email or password', status: 401 };
    }

    const isValidPassword = comparePassword(body.password, user.password);
    if (!isValidPassword) {
      throw { message: 'Invalid email or password', status: 401 };
    }

    const access_token = signToken({
      _id: user._id.toString(),
      email: user.email,
    });

    const cookieStore = await cookies();
    cookieStore.set('Authorization', `Bearer ${access_token}`);

    return Response.json({ access_token });
  } catch (error) {
    return errorHandler(error);
  }
}
