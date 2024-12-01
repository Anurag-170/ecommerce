import React from 'react';
import { connect } from 'react-redux';
import WishlistItem from './WishlistItem';
import { removeFromWishlist } from './wishlistActions';

const WishlistPage = ({ wishlistItems, removeFromWishlist }) => {
  return (
    <div className="wishlist-page">
      <h2>My Wishlist</h2>
      {wishlistItems.map(item => (
        <WishlistItem
          key={item.id}
          item={item}
          onRemove={() => removeFromWishlist(item.id)}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  wishlistItems: state.wishlistItems,
});

const mapDispatchToProps = {
  removeFromWishlist,
};

export default connect(mapStateToProps, mapDispatchToProps)(WishlistPage);