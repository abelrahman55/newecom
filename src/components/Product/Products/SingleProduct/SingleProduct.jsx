import Link from "next/link";

export const SingleProduct = ({
  product,
  onAddToWish,
  onAddToCart,
  addedInCart,
  handleaddfav
}) => {
  const { name, oldPrice, price, image, isSale, isNew, id,addtofav,favorite } = product;
  //console.log(product)
  //console.log(favorite)
  //console.log(product)
  //console.log(addtofav);
  return (
    <>
      {/* <!-- BEING SINGLE PRODUCT ITEM --> */}
      <div className="products-item">
        <div className="products-item__type">
          {isSale && <span className="products-item__sale">أُوكَازيُون</span>}
          {isNew && <span className="products-item__new">جديد</span>}
        </div>
        <div className="products-item__img">
          <img src={image} className="js-img" alt="" />
          <div className="products-item__hover">
            <Link href={`/product/${id}`}>
              <a>
                <i className="icon-search"></i>
              </a>
            </Link>
            <div className="products-item__hover-options">
              <button className="addList" onClick={() => onAddToWish(id)}>
                <i className="icon-heart"
                  onClick={()=>handleaddfav(id)}
                ></i>

              </button>
              <button
                disabled={addedInCart}
                className={`addList ${addedInCart ? "added" : ""}`}
                onClick={() => onAddToCart(id)}
              >
                <i className="icon-cart"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="products-item__info">
          <Link href={`/product/${id}`}>
            <a>
              <span className="products-item__name">{name}</span>
            </a>
          </Link>
          <span className="products-item__cost">
            <span>{oldPrice && `$${oldPrice}`}</span> ${price}
          </span>
        </div>
      </div>
      {/* <!-- SINGLE PRODUCT ITEM EOF --> */}
    </>
  );
};
