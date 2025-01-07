import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../store/cartSlice";
interface Products {
  map: any;
  id: number;
  brandName: string;
  desc: String;
  image: any;
  discount: number;
  MRP: number;
  price: number;
  shopId: number;
  bestSelling: boolean;
  available: boolean;
}
interface Props {
  shopProducts: Products;
}
const ShopByBrandProductDisplay: React.FC<Props> = ({ shopProducts }) => {
  const shops = useSelector((state: any) => state.fashionSlice[0].shops);
  //console.log("shops", shops);

  //console.log(shopProducts);
  const dispatch = useDispatch();

  const handleAddToCart = (sId: number, pId: number) => {
    dispatch(cartAction.addToCart({ sId, pId }));
    //alert("shop id: " + sId + " product id: " + pId);
  };
  return (
    <>
      <h3 className=" mb-4 container mt-md-2">Shop By Brand</h3>
      <div className="container mt-md-3 d-flex flex-wrap  gap-md-5 gap-2 mb-2 justify-content-evenly">
        {shopProducts.map((data: any) =>
          data.map((item: Products) => {
            const shop = shops.find((shop: any) => shop.id === item.shopId);
            return (
              <div
                key={item.id}
                className="card position-relative border-0 product-card"
              >
                {item.bestSelling && (
                  <span className="badge bg-warning best-seller">
                    Best seller
                  </span>
                )}
                <span className="small badge bg-success discount">
                  {item.discount}%
                </span>
                <img
                  src={item.image}
                  className="card-img-top card-img"
                  alt="..."
                />
                <div className="card-body mb-0 product-card-body">
                  <h6 className="card-title text-center">{item.brandName}</h6>
                  <p className="small text-wrap mb-0">
                    <span>{item.desc}</span>
                    <span className="shopName"> by {shop.shopName}</span>
                  </p>
                  <span className="small">₹{item.price}</span>
                  <span className=" text-size">
                    M.R.P:
                    <span className="text-decoration-line-through">
                      {item.MRP}
                    </span>
                  </span>
                  {item.available ? (
                    <button
                      className="btn btn-primary cart-btn mt-1 rounded-pill "
                      onClick={() => handleAddToCart(item.shopId, item.id)}
                    >
                      Add to cart
                    </button>
                  ) : (
                    <div className=" pt-4 text-center text-danger">
                      Out of Stock
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default ShopByBrandProductDisplay;
