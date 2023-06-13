import { MostViewed } from 'components/shared/MostViewed/MostViewed';
import { ProductDetails } from 'components/Product/ProductDetails/ProductDetails';

const { PublicLayout } = require('layout/PublicLayout');

const breadcrumbsData = [
  {
    label: 'الرئيسية',
    path: '/',
  },
  {
    label: 'تسوق',
    path: '/shop',
  },
  {
    label: 'Product',
    path: '/product',
  },
];
const ProductPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='تسوق'>
      <ProductDetails />
      <MostViewed />
    </PublicLayout>
  );
};

export default ProductPage;
