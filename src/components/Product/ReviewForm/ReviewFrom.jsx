import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

export const ReviewFrom = () => {
  const [rating, setRating] = useState(0);

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
    // other logic
  };
  return (
    <>
      {/* <!-- Product Review Form --> */}
      <div className='product-detail__form post-comment__form'>
        <div className='subscribe-form__img'>
          <img src='/assets/img/subscribe-img.png' />
        </div>
        <form>
          <h4 style={{textAlign:"end"}}>اترك رايك</h4>
          <p style={{textAlign:"end"}}>لن يتم نشر عنوان بريدك الإلكتروني</p>
          <div className='rating' data-id='rating_1'>
            <Rating
              onClick={handleRating}
              ratingValue={rating}
              fillColor='#cfc819'
              size='20px'
              emptyColor='#fff'
              style={{marginLeft:"100%"}}
            />
          </div>
          <div className='box-field'>
            <input
              type='text'
              className='form-control'
              placeholder='أدخل أسمك'
            />
          </div>
          <div className='box-field'>
            <input
              type='email'
              className='form-control'
              placeholder='أدخل بريدك الإلكتروني'
            />
          </div>
          <div className='box-field box-field__textarea'>
            <textarea
              className='form-control'
              placeholder='ادخل رايك'
            ></textarea>
          </div>
          <button type='submit' className='btn'>
            إرسال
          </button>
        </form>
      </div>
    </>
  );
};
