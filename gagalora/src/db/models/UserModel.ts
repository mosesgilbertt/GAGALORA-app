import z from 'zod';
import { NewUser, UserType } from '@/types';
import { database } from '../config/mongodb';
import { hashPassword } from '@/helpers/hashPassword';

const UserSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(5, { message: 'Password must be at least 5 characters long' }),
});

class UserModel {
  static collection() {
    return database.collection<UserType>('users');
  }

  static async create(newUser: NewUser) {
    UserSchema.parse(newUser);

    const existingUser = await this.collection().findOne({
      $or: [{ username: newUser.username }, { email: newUser.email }],
    });
    if (existingUser) {
      throw { message: 'Username or email already exists', status: 400 };
    }

    newUser.password = hashPassword(newUser.password);

    await this.collection().insertOne(newUser);

    return 'Successfully created user';
  }

  static async findByEmail(email: string) {
    return this.collection().findOne({ email });
  }
}

export default UserModel;
