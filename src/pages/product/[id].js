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
    label: 'المنتج',
    path: '/product',
  },
];
const SingleProductPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='تسوق'>
      <ProductDetails />
      <MostViewed additionalClass='product-viewed' />
    </PublicLayout>
  );
};

export default SingleProductPage;
