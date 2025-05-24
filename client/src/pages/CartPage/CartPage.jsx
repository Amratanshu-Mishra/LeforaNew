import { useState, useContext } from "react";
import Navbar from "../../components/Navbar";
import "./CartPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../services/CartContext";
import { useAuth } from "../../services/AuthContext"; // Import AuthContext
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const CartPage = ({ currentPage, handleNavClick }) => {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);
  const { currentUser } = useAuth(); // Access current user from AuthContext

  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    state: "",
    zip: "",
    address: "",
    scheduleDate: "",
  });

  const [slider, setSlider] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showPayPal, setShowPayPal] = useState(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePaymentChange = (e) => {
    const selectedPaymentMethod = e.target.value;
    setPaymentMethod(selectedPaymentMethod);
  };

  const validateInputs = () => {
    let validationErrors = {};
    if (!deliveryInfo.name) validationErrors.name = "Name is required";
    if (!deliveryInfo.mobile)
      validationErrors.mobile = "Mobile number is required";
    else if (!/^[0-9]{10}$/.test(deliveryInfo.mobile))
      validationErrors.mobile = "Invalid mobile number";
    if (!deliveryInfo.email) validationErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(deliveryInfo.email))
      validationErrors.email = "Invalid email address";
    if (!deliveryInfo.city) validationErrors.city = "City is required";
    if (!deliveryInfo.state) validationErrors.state = "State is required";
    if (!deliveryInfo.zip) validationErrors.zip = "ZIP code is required";
    else if (!/^[0-9]{5,6}$/.test(deliveryInfo.zip))
      validationErrors.zip = "Invalid ZIP code";
    if (!deliveryInfo.address) validationErrors.address = "Address is required";
    if (!deliveryInfo.scheduleDate)
      validationErrors.scheduleDate = "Schedule date is required";

    return validationErrors;
  };

  const handleInputChange = (e) => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
  };

  const handleApprove = async (orderID) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/orders/create",
        {
          userId: currentUser.id, // Include user ID
          cartItems,
          deliveryInfo,
          totalPrice,
          paymentMethod: "PayPal",
          orderID,
        }
      );

      if (response.data.message === "Order saved successfully!") {
        setErrors({});
        navigate("/thankYou");
      }
    } catch (err) {
      console.error("Error saving order:", err);
    }
  };

  const handleConfirmOrder = async () => {
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length === 0) {
      if (paymentMethod === "online") {
        setShowPayPal(true);
      } else {
        try {
          const response = await axios.post(
            "http://localhost:3001/api/orders/create",
            {
              userId: currentUser.id, // Include user ID
              cartItems,
              deliveryInfo,
              totalPrice,
              scheduleDate: deliveryInfo.scheduleDate,
              paymentMethod: paymentMethod === "cod" ? "COD" : "POS",
            }
          );
          if (response.data.message === "Order saved successfully!") {
            navigate("/thankYou");
          }
        } catch (err) {
          console.error("Error saving order:", err);
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleIncrement = (id) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleDecrement = (id) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCartItems);
  };

  return (
    <>
      <Navbar currentPage={currentPage} handleNavClick={handleNavClick} />
      <div className="cart-page">
        <div className="left-section">
          <div>
            <h2>Delivery Information</h2>
            <div className="delivery-info">
              <form>
                {/* Form fields for delivery information */}
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Your Name"
                      value={deliveryInfo.name}
                      onChange={handleInputChange}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                  </div>
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input
                      type="phone"
                      name="mobile"
                      placeholder="Enter Your Number"
                      value={deliveryInfo.mobile}
                      onChange={handleInputChange}
                    />
                    {errors.mobile && <p className="error">{errors.mobile}</p>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Your Email"
                      value={deliveryInfo.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Enter Your City"
                      value={deliveryInfo.city}
                      onChange={handleInputChange}
                    />
                    {errors.city && <p className="error">{errors.city}</p>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      placeholder="Enter Your State"
                      value={deliveryInfo.state}
                      onChange={handleInputChange}
                    />
                    {errors.state && <p className="error">{errors.state}</p>}
                  </div>
                  <div className="form-group">
                    <label>ZIP</label>
                    <input
                      type="number"
                      name="zip"
                      placeholder="Enter Your Zip/Postal Code"
                      value={deliveryInfo.zip}
                      onChange={handleInputChange}
                    />
                    {errors.zip && <p className="error">{errors.zip}</p>}
                  </div>
                </div>
                <div className="form-group full-width">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter Your Address"
                    value={deliveryInfo.address}
                    onChange={handleInputChange}
                  />
                  {errors.address && <p className="error">{errors.address}</p>}
                </div>
                <div className="form-group full-width">
                  <label>Schedule Date</label>
                  <input
                    type="date"
                    name="scheduleDate"
                    value={deliveryInfo.scheduleDate}
                    onChange={handleInputChange}
                  />
                  {errors.scheduleDate && (
                    <p className="error">{errors.scheduleDate}</p>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Payment Method Section */}
          <div>
            <h2>Payment Method</h2>
            <div className="payment-method">
              <div className="payment-options">
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    onChange={handlePaymentChange}
                  />
                  Online Payment (PayPal)
                </label>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    onChange={handlePaymentChange}
                  />
                  Cash on Delivery
                </label>
              </div>
            </div>
          </div>

          {/* Render PayPal Button only if confirmed */}
          {showPayPal && paymentMethod === "online" && (
            <PayPalScriptProvider
              options={{
                "client-id":
                  "AeYhfs76JnTAGRATRI1bHoRPx4IbUCNiSj_e9pm54PYDpnjHgsS2BjJ2aOIV04AjUZLY0Kc3e6k9sfU7",
                currency: "USD",
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalPrice.toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    handleApprove(data.orderID);
                  });
                }}
              />
            </PayPalScriptProvider>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="right-section-container">
          <h2>Order Summary</h2>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.img}
                  alt={item.name}
                  className="cart-item-image"
                />
                <span>{item.name}</span>
                <span>
                  <button onClick={() => handleDecrement(item.id)}>-</button>
                  {item.quantity}
                  <button onClick={() => handleIncrement(item.id)}>+</button>
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="total-price">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
          </div>
          <button className="checkout-btn" onClick={handleConfirmOrder}>
            Proceed To Pay
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
