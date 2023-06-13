import Link from 'next/link';
import productData from 'data/product/product';

export const ProfileAside = () => {
  const recentlyViewed = [...productData].slice(0, 3);
  return (
    <>
      <div className='profile-aside'>
        <div className='profile-aside__subscribe'>
          <h3>ابق على تواصل</h3>
          <div className='box-field'>
            <input
              type='email'
              className='form-control'
              placeholder='أدخل بريدك الإلكتروني'
            />
          </div>
          <button type='submit' className='btn'>
            اشترك
          </button>
          <img
            src='/assets/img/subscribe-img-decor-sm.png'
            className='js-img'
            alt=''
          />
        </div>
        <div className='profile-aside__viewed'>
          <h5 style={{textAlign:"end"}}>شاهدت ايضا</h5>
          {recentlyViewed.map((product) => (
            <div key={product.id} className='profile-aside__viewed-item'>
              <Link href={`/product/${product.id}`}>
                <a className='profile-aside__viewed-item-img'>
                  <img src={product.image} className='js-img' alt='' />
                </a>
              </Link>
              <div className='profile-aside__viewed-item-info'>
                <Link href={`/product/${product.id}`}>
                  <a className='profile-aside__viewed-item-title'>
                    {product.name}
                  </a>
                </Link>
                <span className='profile-aside__viewed-item-price'>
                  ${product.price}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div
          className='profile-aside__discount js-img'
          style={{ backgroundImage: `url('/assets/img/discount-bg-sm.jpg')` }}
        >
          <div className='profile-aside__discount-title'>
            Get Your
            <br />
            <span>50%</span> Off
          </div>
          <Link href='/shop'>
            <a className='btn'>
              get now!
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};
