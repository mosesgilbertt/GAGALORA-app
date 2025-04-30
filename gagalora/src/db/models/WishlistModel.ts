import { ObjectId } from 'mongodb';
import { database } from '../config/mongodb';

class WishlistModel {
  static collection() {
    return database.collection('wishlists');
  }

  static async create(newWishlist: { productId: string; userId: string }) {
    await this.collection().insertOne({
      productId: new ObjectId(newWishlist.productId),
      userId: new ObjectId(newWishlist.userId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static async getAll(userId: string) {
    const wishlists = await this.collection()
      .aggregate([
        {
          $match: {
            userId: new ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'productId',
            foreignField: '_id',
            as: 'product',
          },
        },
        {
          $unwind: {
            path: '$product',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            productId: 1,
            createdAt: 1,
            updatedAt: 1,
            product: 1,
          },
        },
      ])
      .toArray();

    return wishlists;
  }

  static async findById(wishlistId: string) {
    const wishlist = await this.collection().findOne({
      _id: new ObjectId(wishlistId),
    });

    return wishlist;
  }

  static async delete(wishlistId: string) {
    await this.collection().deleteOne({
      _id: new ObjectId(wishlistId),
    });

    return 'success';
  }
}

export default WishlistModel;
