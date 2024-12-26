import React from "react";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../store/cartSlice";

function CartPayment() {
  const cartIds = useSelector((state: any) => state.cartsSlice);
  const products = useSelector((state: any) => state.fashionProductSlice);
  const curItemPresent = products[0].filter((item: any) =>
    cartIds.includes(item.id)
  );
  const CONVENIENCE_FEES = 99;
  const SHIPPING = 50;
  let MRPPrice = 0;
  let discountPrice = 0;
  let total = 0;
  let price = 0;
  curItemPresent.forEach((item: any) => {
    MRPPrice += item.MRP;
    discountPrice += item.MRP - item.price;
  }); //foreach loop for calculating total price and discount price
  price = MRPPrice - discountPrice;
  if (price > 499) {
    total = price + CONVENIENCE_FEES;
  } else if (price < 499 && cartIds.length != 0) {
    total = price + CONVENIENCE_FEES + SHIPPING;
  } else {
    total = price + CONVENIENCE_FEES; //total price after discount and convenience fees
  }

  const dispatch = useDispatch();
  const handlePayment = () => {
    dispatch(cartAction.placeOrder());
    cartIds.length != 0
      ? alert("Your order will be dispatched soon")
      : alert("Please add items to cart");
  };

  return (
    <div className="col-4 ">
      <div className="card bg-dark text-white rounded-3">
        <div className="card-body">
          <div className="d-flex justify-content-around ">
            <h3>Payment Info.</h3>
          </div>
          <hr className="m-0" />
          <p className=" mt-1 mb-1 text-center ">Card Accepted</p>
          <div className="d-flex gap-3 justify-content-center mb-3">
            <FaCcVisa className=" pay-card rounded-0 " />
            <FaCcMastercard className=" pay-card" />
          </div>

          <form className="mt-1">
            <div data-mdb-input-init className="form-outline form-white mb-3 ">
              <input
                type="text"
                id="typeName"
                className="form-control form-control-sm rounded-pill text-center"
                placeholder="Cardholder's Name "
              />
            </div>
            <div data-mdb-input-init className="form-outline form-white mb-3">
              <input
                type="text"
                id="typeText"
                className="form-control form-control-sm rounded-pill text-center"
                placeholder="Card Number"
                minLength={19}
                maxLength={19}
              />
            </div>
            <div className="row mb-4">
              <div className="col-md-6">
                <div data-mdb-input-init className="form-outline form-white">
                  <input
                    type="text"
                    id="typeExp"
                    className="form-control form-control-sm rounded-pill text-center"
                    placeholder="MM/YYYY"
                    size={7}
                    minLength={7}
                    maxLength={7}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div
                  data-mdb-input-init
                  className="form-outline form-white rounded-pill text-center"
                >
                  <input
                    type="password"
                    id="typeText"
                    className="form-control form-control-sm rounded-pill text-center"
                    placeholder="CVV"
                    minLength={3}
                    maxLength={3}
                  />
                </div>
              </div>
            </div>
          </form>
          <hr className="my-2" />
          <div className="d-flex justify-content-between">
            <p className="mb-2">PRICE DETAILS ({cartIds.length} ITEMS)</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="small  mb-2">MPR Price</p>
            <p className="small mb-2">₹{MRPPrice}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="small  small mb-2">Discount on MRP</p>
            <p className="  small mb-2 text-danger">--₹{discountPrice}</p>
          </div>
          {total < 499 && cartIds.length != 0 && (
            <div className="d-flex justify-content-between">
              <p className="small mb-2">Shipping</p>
              <p className="small mb-2">₹{SHIPPING}</p>
            </div>
          )}
          <div className="d-flex justify-content-between">
            <p className="small mb-2">Convenience fee</p>
            <p className="small mb-2">₹{CONVENIENCE_FEES}</p>
          </div>
          <hr className="my-1" />
          <div className="d-flex justify-content-between mb-2">
            <p className="small mb-2">Total</p>
            <p className="small mb-2">₹{total}</p>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-block rounded-pill w-100"
            onClick={handlePayment}
          >
            <span>Check Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPayment;
