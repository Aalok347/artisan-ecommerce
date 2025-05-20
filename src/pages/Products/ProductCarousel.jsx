import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    pauseOnHover: true,
    adaptiveHeight: true,
    dotsClass: "slick-dots !bottom-4",
  };

  return (
    <div className="w-full bg-night py-8 px-4 shadow-xl">
      {isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading featured products...</div>
        </div>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 px-4">Featured Products</h2>
          <Slider {...settings} className="relative">
            {products.map(
              ({
                image,
                _id,
                name,
                price,
                description,
                brand,
                createdAt,
                numReviews,
                rating,
                quantity,
                countInStock,
              }) => (
                <div key={_id} className="outline-none focus:outline-none">
                  <div className="flex flex-col md:flex-row gap-8 bg-gray-900 rounded-xl p-6 shadow-lg">
                    <div className="md:w-1/2">
                      <img
                        src={image}
                        alt={name}
                        className="w-full h-64 md:h-96 object-contain rounded-lg bg-night p-4"
                      />
                    </div>
                    
                    <div className="md:w-1/2 flex flex-col justify-between text-gray-200">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">{name}</h2>
                        <p className="text-xl text-emerald-400 font-semibold mb-4">${price.toFixed(2)}</p>
                        <p className="mb-6 text-gray-300">{description.substring(0, 200)}...</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <FaStore className="mr-2 text-emerald-400" />
                            <span>Brand: <span className="font-medium">{brand}</span></span>
                          </div>
                          <div className="flex items-center">
                            <FaClock className="mr-2 text-emerald-400" />
                            <span>Added: <span className="font-medium">{moment(createdAt).fromNow()}</span></span>
                          </div>
                          <div className="flex items-center">
                            <FaStar className="mr-2 text-emerald-400" />
                            <span>Reviews: <span className="font-medium">{numReviews}</span></span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <FaStar className="mr-2 text-emerald-400" />
                            <span>Rating: <span className="font-medium">{rating.toFixed(1)}/5</span></span>
                          </div>
                          <div className="flex items-center">
                            <FaShoppingCart className="mr-2 text-emerald-400" />
                            <span>Quantity: <span className="font-medium">{quantity}</span></span>
                          </div>
                          <div className="flex items-center">
                            <FaBox className="mr-2 text-emerald-400" />
                            <span>In Stock: <span className="font-medium">{countInStock}</span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;