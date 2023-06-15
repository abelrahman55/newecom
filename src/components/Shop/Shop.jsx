import { Products } from "components/Product/Products/Products";
import { PagingList } from "components/shared/PagingList/PagingList";
import { usePagination } from "components/utils/Pagination/Pagination";
import productData from "data/product/product";
import Slider from "rc-slider";
import { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import { AsideItem } from "../shared/AsideItem/AsideItem";
import { useMutation, useQuery } from "react-query";
import { get_categories_fn, getwatchedproducts, select_products_fn } from "configs/APIs";
import lodash from 'lodash/lodash';
import { USER_ID } from "configs/AppConfig";

// React Range
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const options = [
  { value: "highToMin", label: "من باهظ الثمن إلى رخيص" },
  { value: "minToHigh", label: "من الرخيص إلى باهظ الثمن" },
];
export const Shop = () => {
  const [products, setProducts] = useState([]);

  //const allProducts = [...productData];

  // const [productOrder, setProductOrder] = useState(
  //   products.sort((a, b) => (a.price < b.price ? 1 : -1))
  // );

  const [productsorigin, setoriginproducts] = useState([]);
  const [filter, setFilter] = useState({ isNew: false, isSale: true });
  const [searchTxt, setSearchTxt] = useState('');
  const [categoryid,setcategoryid]=useState(null);


  // useEffect(() => {
  //   setProducts(productOrder);
  // }, [productOrder]);

  // useEffect(() => {
  //   if (filter.isNew && filter.isSale) {
  //     const newPro = productOrder.filter(
  //       (pd) => pd.isNew === true && pd.isSale === true
  //     );
  //     setProducts(newPro);
  //   } else if (filter.isNew && !filter.isSale) {
  //     const newPro = productOrder.filter((pd) => pd.isNew === true);
  //     setProducts(newPro);
  //   } else if (filter.isSale && !filter.isNew) {
  //     const newPro = productOrder.filter((pd) => pd.isSale === true);
  //     setProducts(newPro);
  //   } else {
  //     //setProducts([...productOrder]);
  //   }
  // }, [filter, productOrder]);
  const recentlyViewed = [...products].slice(0, 3);
  const todaysTop = [...products].slice(3, 6);
  const paginate = usePagination(products, 9);

  const handleSort = (value) => {
    if (value === "highToMin") {
      const newOrder = products.sort((a, b) => (a.price < b.price ? 1 : -1));
      setProductOrder(newOrder);
      setoriginproducts(newOrder);
      setProducts(newOrder)
    }
    if (value === "minToHigh") {
      const newOrder = products.sort((a, b) => (a.price > b.price ? 1 : -1));
      setProductOrder(newOrder);
      setoriginproducts(newOrder);
      setProducts(newOrder)
    }
  };

  const { data: categories } = useQuery({
    queryFn: () => get_categories_fn(),
    onSuccess: (res) => {
      //console.log(res.data);
      // setCategories(res.data?.message);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // const [products, setProducts] = useState([]);

  const selectProducts = useMutation({
    mutationFn: (body) => select_products_fn(body),
    onSuccess: (res) => {
      //console.log(res.data)
      setProducts(res.data?.message);
      setoriginproducts(res.data?.message);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  useEffect(() => {
    let userData=JSON.parse(localStorage.getItem(USER_ID))
    selectProducts.mutate({
      user_id: userData?.user_id||0,
      start: 0,
      category_id: "all",
    });
  }, []);


  function searchType(e) {
    setSearchTxt(e);
    const formattedQuery = e.toLowerCase();
    const filteredData = lodash.filter(productsorigin, item => {
      return contains(item, formattedQuery);
    });
    setProducts(filteredData);
  }
  const contains = (items, query) => {
    const { name,category} = items;
    if (
      name?.toLowerCase().includes(query)||
      category?.toLowerCase().includes(query)
    ) {
      return true;
    }

    return false;
  };


  const [watched, setwatched] = useState([]);
  const [mostvisited, setmostvisited] = useState([]);
  const watchmutation = useMutation({
    mutationFn: (body) => getwatchedproducts(body),
    onSuccess: (res) => {
      console.log(res.data.message.user_last_visit_products)
      //alert(res.data);
      setwatched(res.data.message.user_last_visit_products);
      setmostvisited(res.data.message.most_visit_products);

    },
    onError: (err) => {
      console.log(err);
    },
  });

  const getwatched = () => {
    let userData=JSON.parse(localStorage.getItem(USER_ID))

    watchmutation.mutate({
      user_id:userData?.user_id||0,

    });
  };
  useEffect(()=>{
    getwatched()
  },[])

  return (
    <div>
      {/* <!-- BEGIN SHOP --> */}
      <div className="shop">
        <div className="wrapper">
          <div className="shop-content">
            {/* <!-- Shop Main --> */}
            <div className="shop-main">
              <div className="shop-main__filter">
                {/* <div className="shop-main__checkboxes">
                  <label className="checkbox-box">
                    <input
                      checked={filter.isSale}
                      onChange={() =>
                        setFilter({ ...filter, isSale: !filter.isSale })
                      }
                      type="checkbox"
                    />
                    <span className="checkmark"></span>
                    أُوكَازيُون
                  </label>
                  <label className="checkbox-box">
                    <input
                      checked={filter.isNew}
                      onChange={() =>
                        setFilter({ ...filter, isNew: !filter.isNew })
                      }
                      type="checkbox"
                    />
                    <span className="checkmark"></span>
                    جديد
                  </label>
                </div> */}
                <div className="shop-main__select">
                  {/* <Dropdown
                    options={options}
                    className="react-dropdown"
                    onChange={(option) => handleSort(option.value)}
                    value={options[0]}
                  /> */}
                </div>
              </div>
              <div className="shop-main__items">
                <Products products={paginate?.currentData()} />
              </div>

              {/* <!-- PAGINATE LIST --> */}
              <PagingList paginate={paginate} />
            </div>
            {/* <!-- Shop Aside --> */}
            <div className="shop-aside">
              <div className="box-field box-field__search">
                <input
                  type="search"
                  className="form-control"
                  placeholder="البحث"
                  onChange={e => {
                    searchType(e.target.value);
                  }}
                />
                <i className="icon-search"></i>
              </div>
              <div className="shop-aside__item">
                <span
                  className="shop-aside__item-title"
                  style={{ textAlign: "end" }}
                >
                  التصنيفات
                </span>
                <ul>
                  {categories?.data?.message.map((item, idex) => (
                    <li style={{
                      direction:'rtl'
                    }}>
                      <a

                        className={`${categoryid==item.categoryId?'active':''}`}
                        onClick={()=>{
                          searchType(item.name)
                          setcategoryid(item.categoryId)
                        }}
                        style={{
                          display:'flex',
                          alignItems:'center',
                          justifyContent:'start',
                          backgroundColor:categoryid==item.categoryId?'#068C45':'',
                          color:categoryid==item.categoryId?'white':'',
                          cursor:'pointer'
                        }}
                      >
                        <span
                          style={{
                          color:categoryid==item.categoryId?'white':'',
                          }}
                        >{item.name}</span> <span
                          style={{
                          color:categoryid==item.categoryId?'white':'',

                          }}
                        >({item.product_count})</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* <div className="shop-aside__item">
                <span
                  className="shop-aside__item-title"
                  style={{ textAlign: "end" }}
                >
                  السعر
                </span>
                <div className="range-slider">
                  <Range
                    min={0}
                    max={20}
                    defaultValue={[0, 20]}
                    tipFormatter={(value) => `${value}$`}
                    allowCross={false}
                    tipProps={{
                      placement: "bottom",
                      prefixCls: "rc-slider-tooltip",
                    }}
                  />
                </div>
              </div> */}
              <div className="shop-aside__item">
                <span
                  className="shop-aside__item-title"
                  style={{ textAlign: "end" }}
                >
                  لقد شاهدت
                </span>
                {watched?.map((data) => (
                  <AsideItem key={data.id} aside={data} />
                ))}
              </div>
              <div
                style={{
                  direction:'rtl'
                }}
              className="shop-aside__item">
                <span
                  className="shop-aside__item-title"
                  style={{ textAlign: "end" }}
                >
                  أعلى 3 لهذا اليوم
                </span>
                {mostvisited?.map((data) => (
                  <AsideItem key={data.id} aside={data} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <img
          className="promo-video__decor js-img"
          src="/assets/img/promo-video__decor.jpg"
          alt=""
        />
        <img
          className="shop-decor js-img"
          src="/assets/img/shop-decor.jpg"
          alt=""
        />
      </div>
      {/* <!-- SHOP EOF   --> */}
    </div>
  );
};
