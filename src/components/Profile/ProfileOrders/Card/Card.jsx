export const Card = ({ order, index, onCollapse, active }) => {
  const { date, deliveryAddress, amount, status, orderItems } = order;

  return (
    <>
      <div
        dir="rtl"
        className={`profile-orders__item ${active === index && "active"}`}
      >
        <div className="profile-orders__row">
          <div className="profile-orders__col">
            <span className="profile-orders__col-mob">التاريخ</span>
            <span className="profile-orders__item-date">{date}</span>
          </div>
          <div className="profile-orders__col">
            <span className="profile-orders__col-mob">عنوان التسليم</span>
            <span className="profile-orders__item-addr">{deliveryAddress}</span>
          </div>
          <div className="profile-orders__col">
            <span className="profile-orders__col-mob">الكمية</span>
            <span className="profile-orders__item-price">${amount}</span>
          </div>
          <div className="profile-orders__col">
            <span className="profile-orders__col-mob">الحالة</span>
            <span
              className={`profile-orders__col-${
                status.delivered ? "تم التسليم" : "في الطريق"
              }`}
            >
              {status.onWay
                ? "في الطريق"
                : status.delivered
                ? "تم التسليم"
                : null}
            </span>
            <span
              onClick={() => onCollapse(index)}
              className="profile-orders__col-btn"
            ></span>
          </div>
        </div>
        <div className="profile-orders__content">
          <ul>
            {orderItems.map((item, index) => (
              <li key={index}>
                {item.name}
                <span>${item.price}</span>
              </li>
            ))}
            <li>
              طريقة الدفع:
              <span>بطاقة الخصم: **** **** **** 1633</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
