import Link from "next/link";

export const Card = ({ cart, onChangeQuantity }) => {
  const {
    name,
    image,
    id,
    isStocked,
    productNumber,
    oldPrice,
    price,
    quantity,
  } = cart;

  return (
    <>
      <div className="cart-table__row">
        {/* <span>
          <i className="icon-arrow"></i>
        </span>  */}
        <div className="cart-table__col">
          <Link href={`/product/${id}`}>
            <a className="cart-table__img">
              <img src={image} className="js-img" alt="" />
            </a>
          </Link>
          <div className="cart-table__info">
            <Link href={`/product/${id}`}>
              <a className="title5">{name}</a>
            </Link>
            {/* <span className="cart-table__info-num">SKU: {productNumber}</span> */}
          </div>
        </div>
        <div className="cart-table__col">
          {oldPrice ? (
            <span className="cart-table__price">
              <span>${oldPrice}</span>${price}
            </span>
          ) : (
            <span className="cart-table__price">${price}</span>
          )}
        </div>
        <div className="cart-table__col" style={{ paddingRight: "10%" }}>
          <div className="cart-table__quantity">
            <div className="counter-box">
              <span
                onClick={() => onChangeQuantity("decrement", quantity)}
                className="counter-link counter-link__next"
              >
                <i className="icon-arrow"></i>
              </span>
              <input
                type="text"
                className="counter-input"
                disabled
                value={quantity}
              />
              <span
                onClick={() => onChangeQuantity("increment", quantity)}
                className="counter-link counter-link__prev"
              >
                <i className="icon-arrow"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="cart-table__col">
          <span className="cart-table__total">
            ${(price * quantity).toFixed(2)}
          </span>
        </div>
        <div className="cart-table__col" style={{ paddingLeft: "10px" }}>
          {/* <span className="cart-table__total"> */}
          <img src={'/assets/img/trash.png'} className="js-img" alt="" style={{ width: "40px", height: "40px" }} />

        </div>
      </div>
    </>
  );
};
