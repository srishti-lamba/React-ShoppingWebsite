import React from "react";
import './productCard.css';

const ProductCard = ({productName, price, image_url, category}) => {
    return (
        <div className="product-card">
            <img src={image_url} />
            <p className="price">{price}</p>
            <p>{category}</p>
            <p>{productName}</p>
        </div>
    )
}

export default ProductCard;