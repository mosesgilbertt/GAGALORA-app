import UserModel from '@/db/models/UserModel';
import errorHandler from '@/helpers/errorHandler';

export async function POST(request: Request) {
  try {
    const res = await request.json();
    await UserModel.create(res);

    return Response.json({ message: 'Registered user successfully' });
  } catch (error) {
    return errorHandler(error);
  }
}
