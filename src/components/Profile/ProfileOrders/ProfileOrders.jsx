import orderData from "data/orders/orders";
import { useState } from "react";
import { Card } from "./Card/Card";

export const ProfileOrders = () => {
  const [active, setActive] = useState(-1);
  const orders = [...orderData];
  const handleCollapse = (indx) => {
    if (active === indx) {
      setActive(-1);
    } else {
      setActive(indx);
    }
  };
  return (
    <>
      <div dir="rtl" className="profile-orders">
        <div className="profile-orders__row profile-orders__row-head">
          <div className="profile-orders__col" style={{ textAlign: "end" }}>
            التاريخ
          </div>
          <div className="profile-orders__col" style={{ textAlign: "end" }}>
            عنوان التسليم
          </div>
          <div className="profile-orders__col" style={{ textAlign: "end" }}>
            الكمية
          </div>
          <div className="profile-orders__col" style={{ textAlign: "end" }}>
            الحاله
          </div>
        </div>
        {orders.map((order, index) => (
          <Card
            key={index}
            index={index}
            onCollapse={handleCollapse}
            order={order}
            active={active}
          />
        ))}
      </div>
    </>
  );
};
