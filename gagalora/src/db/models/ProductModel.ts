import { database } from '../config/mongodb';

interface GetAllParams {
  page: string;
  search: string;
}

class ProductModel {
  static collection() {
    return database.collection('products');
  }

  static async getAll({ page, search }: GetAllParams) {
    const limit = 8;
    const skip = (Number(page) - 1) * limit;

    const arrQuery = search
      .trim()
      .split(' ')
      .map((el) => ({
        name: {
          $regex: el,
          $options: 'i',
        },
      }));

    const products = await this.collection()
      .find({
        $and: arrQuery,
      })
      .skip(skip)
      .limit(limit)
      .toArray();
    return products;
  }

  static async getBySlug(slug: string) {
    const product = await this.collection().findOne({ slug });
    return product;
  }
}

export default ProductModel;
