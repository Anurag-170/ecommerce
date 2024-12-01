import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from './wishlistActionTypes';

export const addToWishlist = (item) => ({
  type: ADD_TO_WISHLIST,
  payload: item,
});

export const removeFromWishlist = (itemId) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: itemId,
});

