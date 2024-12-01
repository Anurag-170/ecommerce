import React from 'react';

const WishlistItem = ({ item, onRemove }) => {
  return (
    <div className="wishlist-item">
      <img src={item.imageUrl} alt={item.name} />
      <div>
        <h3>{item.name}</h3>
        <p>Price: ${item.price}</p>
        <button onClick={onRemove}>Remove</button>
      </div>
    </div>
  );
};
export default WishlistItem;