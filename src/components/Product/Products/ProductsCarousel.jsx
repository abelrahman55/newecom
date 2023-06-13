import {
  SlickArrowPrev,
  SlickArrowNext,
} from 'components/utils/SlickArrows/SlickArrows';
import { CartContext } from 'pages/_app';
import { useContext } from 'react';
import Slider from 'react-slick';
import { SingleProduct } from './SingleProduct/SingleProduct';
import { useMutation } from 'react-query';
import { addfavourite_fn } from 'configs/APIs';

export const ProductsCarousel = ({ productsdata }) => {
  //console.log(productsdata)
  const { cart, setCart } = useContext(CartContext);

  const handleAddToCart = (id) => {
    const newProduct = productsdata?.find((pd) => pd.id === id);
    setCart([...cart, { ...newProduct, quantity: 1 }]);
  };

  // const handleaddtofav=(id)=>{

  // }

  const AddMutation = useMutation({
    mutationFn: (body) => addfavourite_fn(body),
    onSuccess: (res) => {
      //alert(res.data);
      if (res.data?.status=="success") {
        alert(res.data?.message)
      }
      else if(res.data?.status=="error"){
        alert(res.data?.message)
      }
      else{
        alert("something went wrong")
      }
    },
    onError: (err) => {
      alert(err);
    },
  });

  const handleaddtofav = (id) => {
    console.log(productsdata)
    let myproduct=productsdata.filter(item=>item.id==id)[0];
    console.log(myproduct)

    AddMutation.mutate({
      user_id:1,
      item_id:id,
      toggle:!myproduct.favorite?'add':'delete'
    });
  };


  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <SlickArrowPrev />,
    nextArrow: <SlickArrowNext />,
    lazyLoad: 'progressive',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {productsdata?.map((product) => (
          <SingleProduct
            addedInCart={Boolean(cart?.find((pd) => pd.id === product.id))}
            key={product.id}
            product={product}
            onAddToWish={(id) => console.log(id)}
            onAddToCart={handleAddToCart}
            handleaddfav={handleaddtofav}
            //onAddToFav={handleAddToFav}
          />
        ))}
      </Slider>
    </>
  );
};
