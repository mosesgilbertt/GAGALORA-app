import WishlistModel from '@/db/models/WishlistModel';
import errorHandler from '@/helpers/errorHandler';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const userId = request.headers.get('x-user-id');
    if (!userId) {
      throw { message: 'Please login first', status: 401 };
    }

    await WishlistModel.create({
      productId: body.productId,
      userId: userId,
    });

    return Response.json({ message: 'Success add new wishlist' });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function GET(request: Request) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      throw { message: 'Please login first', status: 401 };
    }

    const wishlists = await WishlistModel.getAll(userId);

    return Response.json(wishlists);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const wishlistId = searchParams.get('id');

    if (!wishlistId) {
      throw { message: 'Wishlist ID is required', status: 400 };
    }

    const userId = request.headers.get('x-user-id');
    if (!userId) {
      throw { message: 'Please login first', status: 401 };
    }

    const wishlist = await WishlistModel.findById(wishlistId);
    if (!wishlist) {
      throw { message: 'Wishlist not found', status: 404 };
    }

    await WishlistModel.delete(wishlistId);

    return Response.json({ message: 'Success delete wishlist' });
  } catch (error) {
    return errorHandler(error);
  }
}
