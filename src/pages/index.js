import { Advantage } from "components/shared/Advantage/Advantage";
import { Banner } from "components/landing/Banner/Banner";
import { BrandLogo } from "components/shared/BrandLogo/BrandLogo";
import { Discount } from "components/landing/Discount/Discount";
import { Info } from "components/landing/Info/Info";
import { LatestNews } from "components/landing/LatestNews/LatestNews";
import { NewArrivals } from "components/landing/NewArrivals/NewArrivals";
import { TopCategories } from "components/landing/TopCategories/TopCategories";
import { Trending } from "components/landing/Trending/Trending";
import { Subscribe } from "components/shared/Subscribe/Subscribe";
import { Layout } from "layout/Layout";
import { useEffect, useState } from "react";
import { IS_LOGGED_IN, USER_ID } from "configs/AppConfig";
import router from "next/router";
import { select_home_fn } from "configs/APIs";
import { useMutation, useQuery } from "react-query";

export default function Home() {

  const [homedata, setHomedata] = useState({});
  const loginMutation = useMutation({
    mutationFn: (body) => select_home_fn(body),
    onSuccess: (res) => {
      //alert(res.data);
      setHomedata(res.data.message);

    },
    onError: (err) => {
      alert(err);
    },
  });

  const gethomedata = () => {

    loginMutation.mutate({
      user_id:1,
    });
  };
  useEffect(()=>{
    gethomedata()
  },[])
  return (
    <Layout>
      <Banner />
      <Trending productsdata={homedata?.trending_products}/>
      <BrandLogo />
      <Discount />
      <Advantage />
      <TopCategories />
      <NewArrivals />

      <Info />
      {/* <LatestNews /> */}
      <Subscribe />
    </Layout>
  );
}
