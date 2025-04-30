export type ProductType = {
  _id: string;
  id: number;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
};

export type CustomError = {
  message: string;
  status: number;
};

export type NewUser = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type UserType = {
  name: string;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};
