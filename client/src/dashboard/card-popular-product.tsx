import { ShoppingBag } from "lucide-react";
import { Loading } from "../(components)/loading";
import { RenderStars } from "../(components)/rating";
import { useGetPopularProductsQuery } from "../state/api";
import { Product } from "../type/type";

const CardPopularProducts = () => {
  const user_id = { user_id: localStorage.getItem("user_id") };
  const {
    data: popularProducts,
    error,
    isLoading,
  } = useGetPopularProductsQuery(user_id);

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
            Produtos Populares
          </h3>
          <hr />
          <div className="overflow-auto h-full">
            {popularProducts?.popular_products?.map((product: Product) => (
              <div
                key={product.productId}
                className="flex items-center justify-between gap-3 px-5 py-7 border-b"
              >
                <div className="flex items-center gap-3">
                  {/*<img
                    src={`https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/product${
                      Math.floor(Math.random() * 3) + 1
                    }.png`}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="rounded-lg w-14 h-14"
                  />*/}
                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold text-gray-700">
                      {product.name}
                    </div>
                    <div className="flex text-sm items-center">
                      <span className="font-bold text-blue-500 text-xs">
                        ${product.price}
                      </span>
                      <span className="mx-2">|</span>
                      {RenderStars(product.rating)}{" "}
                      <span className="mx-2">({product.rating})</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs flex items-center">
                  <button
                    className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2"
                    type="button"
                  >
                    {""}
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  {Math.round(product.stockQuantity / 1000)} mil vendidos
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;
