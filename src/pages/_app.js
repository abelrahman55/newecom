import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/styles.scss";
import { USER_ID } from "configs/AppConfig";

export const CartContext = createContext();
const MyApp = ({ Component, pageProps }) => {
  const [cart, setCart] = useState([]);
  const queryClient = new QueryClient();
  //const id=window.localStorage.getItem(USER_ID);
  return (
    <QueryClientProvider client={queryClient}>
      <CartContext.Provider value={{ cart, setCart }}>
        <Component {...pageProps} />
      </CartContext.Provider>
    </QueryClientProvider>
  );
};

export default MyApp;
