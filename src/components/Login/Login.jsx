import { SocialLogin } from "components/shared/SocialLogin/SocialLogin";
import { login_fn } from "configs/APIs";
import { IS_LOGGED_IN, USER_ID } from "configs/AppConfig";
import router from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";

export const Login = () => {
  const [user_email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: (body) => login_fn(body),
    onSuccess: (res) => {
      alert(res.data);
      if (res.data?.message?.user_id) {
        localStorage.setItem(USER_ID, res.data?.message?.user_id || 1);
        localStorage.setItem(IS_LOGGED_IN, true);
        router.push("/");
      }
    },
    onError: (err) => {
      alert(err);
    },
  });

  const doLogin = (event) => {
    event.preventDefault();

    loginMutation.mutate({
      user_email,
      password,
    });
  };

  return (
    <>
      {/* <!-- BEGIN LOGIN --> */}
      <div className="login">
        <div className="wrapper">
          <div
            className="login-form js-img"
            style={{ backgroundImage: `url('/assets/img/login-form__bg.png')` }}
          >
            <form onSubmit={doLogin}>
              <div className="box-field">
                <input
                  type="text"
                  className="form-control"
                  placeholder="أدخل بريدك الإلكتروني"
                  onChange={(event) => {
                    event.preventDefault();
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div className="box-field">
                <input
                  type="password"
                  className="form-control"
                  placeholder="ادخل رقمك السري"
                  onChange={(event) => {
                    event.preventDefault();
                    setPassword(event.target.value);
                  }}
                />
              </div>
              <label
                className="checkbox-box checkbox-box__sm"
                style={{ paddingLeft: "80%" }}
              >
                <input type="checkbox" />
                <span className="checkmark"></span>
                تذكرني
              </label>
              <button className="btn" type="submit">
                تسجيل دخول
              </button>
              <div className="login-form__bottom">
                <span style={{ textAlign: "end" }}>
                  لا يوجد بريد؟{" "}
                  <a onClick={() => router.push("/registration")}>انشئ حساب</a>
                </span>
                <a href="#" style={{ textAlign: "end" }}>
                  هل نسيت كلمة السر؟
                </a>
              </div>
            </form>
          </div>
        </div>
        <img
          className="promo-video__decor js-img"
          src="/assets/img/promo-video__decor.jpg"
          alt=""
        />
      </div>
      {/* <!-- LOGIN EOF   --> */}
    </>
  );
};
