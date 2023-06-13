export const Subscribe = () => {
  return (
    <>
      {/* <!-- BEGIN SUBSCRIBE --> */}
      <div className="subscribe">
        <div className="wrapper">
          <div className="subscribe-form">
            <div className="subscribe-form__img">
              <img
                src="/assets/img/subscribe-img.png"
                className="js-img"
                alt=""
              />
            </div>
            <form>
              <h3 style={{ textAlign: "end" }}>ابق على تواصل</h3>
              <p style={{ textAlign: "end" }}>
                غذي بشرتك بمنتجات التجميل الخالية من السموم
              </p>
              <div className="box-field__row">
                <div className="box-field">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="أدخل بريدك الإلكتروني"
                  />
                </div>
                <button type="submit" className="btn">
                  إشترك
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <!-- SUBSCRIBE EOF   --> */}
    </>
  );
};
