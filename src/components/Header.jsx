import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <div className="flex flex-col items-center space-y-6">
        {/* Carousel at the top */}
        <ProductCarousel />

        {/* Products below the carousel */}
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
          {data.map((product) => (
            <div key={product._id}>
              <SmallProduct product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
