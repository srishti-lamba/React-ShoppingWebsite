import React from "react";
import './productCard.css';

const ProductCard = ({product_id, productName, price, image_url, category}) => {
    const ondrag = (e) => {
        e.dataTransfer.setData("id", product_id)
        e.dataTransfer.setData("productName", productName)
        e.dataTransfer.setData("quantity", 1)
        e.dataTransfer.setData("price", price)
    }


    return (
        <div className="product-card" draggable onDragStart={ondrag}>
            <img src={image_url} />
            <p className="price">${price}</p>
            <p>{category}</p>
            <p>{productName}</p>
        </div>
    )
}

export default ProductCard;