import server from "./AxiosInterceptors";


export const select_home_fn=async(body)=>{
  return server.post("https://camp-coding.online/roma_store/user/home/select_home.php",body);
}

export const select_products_fn = async (body) => {
  return server.post("roma_store/user/home/select_products.php", body);
};

export const get_categories_fn = async () => {
  return server.get("roma_store/user/home/select_categories.php");
};

export const login_fn = async (body) => {
  return server.post("https://camp-coding.online/roma_store/user/auth/user_login.php", body);
};

export const signup_fn = async (body) => {
  return server.post("https://camp-coding.online/roma_store/user/auth/user_sign_up.php", body);
};
export const addfavourite_fn = async (body) => {
  return server.post("https://camp-coding.online/roma_store/user/home/add_remove_favorite.php", body);
};
export const get_favourits = async (body) => {
  return server.post("https://camp-coding.online/roma_store/user/home/select_favorite.php", body);
};
export const get_wishlist = async (body) => {
  return server.post("https://camp-coding.online/roma_store/user/home/select_favorite.php", body);
};

// export const addfavourite_fn=async(body)=>{
//   return server.post("https://camp-coding.online/roma_store/user/home/add_remove_favorite.php",body);
// }
