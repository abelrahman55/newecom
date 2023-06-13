import productData from "data/product/product";
import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import socialData from "data/social";
import { Reviews } from "../Reviews/Reviews";
import { ReviewFrom } from "../ReviewForm/ReviewFrom";
import { useRouter } from "next/router";
import { CartContext } from "pages/_app";

export const ProductDetails = () => {
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);

  const socialLinks = [...socialData];
  const products = [...productData];
  const [product, setProduct] = useState(null);
  const [addedInCart, setAddedInCart] = useState(false);

  useEffect(() => {
    if (router.query.id) {
      const data = products.find((pd) => pd.id === router.query.id);
      setProduct(data);
    }
  }, [router.query.id]);

  useEffect(() => {
    if (product) {
      setAddedInCart(Boolean(cart?.find((pd) => pd.id === product.id)));
    }
  }, [product, cart]);

  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState(2);
  const [activeColor, setActiveColor] = useState(2);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  const handleAddToCart = () => {
    const newProduct = { ...product, quantity: quantity };
    setCart([...cart, newProduct]);
  };

  if (!product) return <></>;
  return (
    <>
      {/* <!-- BEGIN PRODUCT --> */}
      <div className="product">
        <div className="wrapper">
          <div className="product-content">
            <div className="product-info">
              <h3 style={{ textAlign: "end" }}>{product.name}</h3>
              {product.isStocked ? (
                <span className="product-stock" style={{ textAlign: "end" }}>
                  مخزون معد للبيع
                </span>
              ) : (
                ""
              )}

              <span className="product-num" style={{ textAlign: "end" }}>
                SKU: {product.productNumber}
              </span>
              {product.oldPrice ? (
                <span className="product-price" style={{ textAlign: "end" }}>
                  ${product.price}{" "}
                  <span style={{ marginRight: "0px" }}>
                    ${product.oldPrice}
                  </span>
                </span>
              ) : (
                <span className="product-price" style={{ textAlign: "end" }}>
                  ${product.price}
                </span>
              )}
              <p style={{ textAlign: "end" }}>{product.content}</p>

              {/* <!-- Social Share Link --> */}
              <div className="contacts-info__social">
                <span>:تجدنا هنا</span>
                <ul>
                  {socialLinks.map((social, index) => (
                    <li key={index}>
                      <a href={social.path}>
                        <i className={social.icon ? social.icon : ""}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* <!-- Product Color info--> */}
              <div className="product-options">
                {/* <div className='product-info__color'>
                  <span style={{textAlign:"end"}}>: اللون</span>
                  <ul>
                    {product?.colors.map((color, index) => (
                      <li
                        onClick={() => setActiveColor(index)}
                        className={activeColor === index ? 'active' : ''}
                        key={index}
                        style={{ backgroundColor: color }}
                      ></li>
                    ))}
                  </ul>
                </div> */}

                {/* <!-- Order Item counter --> */}
                <div className="product-info__quantity">
                  <span
                    className="product-info__quantity-title"
                    style={{ textAlign: "end" }}
                  >
                    : الكمية
                  </span>
                  <div className="counter-box">
                    <span
                      onClick={() => {
                        if (quantity > 1) {
                          setQuantity(quantity - 1);
                        }
                      }}
                      className="counter-link counter-link__prev"
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
                      onClick={() => setQuantity(quantity + 1)}
                      className="counter-link counter-link__next"
                    >
                      <i className="icon-arrow"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="product-buttons">
                <button
                  disabled={addedInCart}
                  onClick={() => handleAddToCart()}
                  className="btn btn-icon"
                >
                  <i className="icon-cart"></i> السلة
                </button>
                <button className="btn btn-grey btn-icon">
                  <i className="icon-heart"></i> المفضلة
                </button>
              </div>
            </div>
            {/* <!-- Product Main Slider --> */}
            <div className="product-slider">
              <div className="product-slider__main">
                <Slider
                  fade={true}
                  asNavFor={nav2}
                  arrows={false}
                  lazyLoad={true}
                  ref={(slider1) => setNav1(slider1)}
                >
                  {product.imageGallery.map((img, index) => (
                    <div key={index} className="product-slider__main-item">
                      <div className="products-item__type">
                        {product.isSale && (
                          <span className="products-item__sale">
                            أُوكَازيُون
                          </span>
                        )}
                        {product.isNew && (
                          <span className="products-item__new">جديد</span>
                        )}
                      </div>
                      <img src={img} alt="product" />
                    </div>
                  ))}
                </Slider>
              </div>

              {/* <!-- Product Slide Nav --> */}
              <div className="product-slider__nav">
                <Slider
                  arrows={false}
                  asNavFor={nav1}
                  ref={(slider2) => setNav2(slider2)}
                  slidesToShow={4}
                  swipeToSlide={true}
                  focusOnSelect={true}
                >
                  {product.imageGallery.map((img, index) => (
                    <div key={index} className="product-slider__nav-item">
                      <img src={img} alt="product" />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

          {/* <!-- Product Details Tab --> */}
          <div className="product-detail">
            <div className="tab-wrap product-detail-tabs">
              <ul
                className="nav-tab-list tabs pd-tab"
                style={{
                  marginLeft: "35%",
                  display: "flex",
                  alignSelf: "center",
                }}
              >
                <li
                  className={tab === 1 ? "active" : ""}
                  onClick={() => setTab(1)}
                >
                  الوصف
                </li>
                <li
                  className={tab === 2 ? "active" : ""}
                  onClick={() => setTab(2)}
                >
                  الاراء
                </li>
              </ul>
              <div className="box-tab-cont">
                {/* <!-- Product description --> */}
                {tab === 1 && (
                  <div className="tab-cont">
                    <p>{product.description}</p>
                    <p>{product.description}</p>
                  </div>
                )}

                {tab === 2 && (
                  <div className="tab-cont product-reviews">
                    {/* <!-- Product Reviews --> */}
                    <Reviews reviews={product.reviews} />

                    {/* <!-- Product Review Form --> */}
                    <ReviewFrom />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <img
          className="promo-video__decor js-img"
          src="/assets/img/promo-video__decor.jpg"
          alt=""
        />
      </div>
      {/* <!-- PRODUCT EOF   --> */}
    </>
  );
};
