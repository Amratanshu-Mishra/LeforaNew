import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartContext } from "../services/CartContext"; // Import Cart Context
import { useAuth } from "../services/AuthContext"; // Import useAuth to check if user is logged in
import "./LeforaShop.css";
import item1 from "../assets/img/item1.jpg";
import item2 from "../assets/img/item2.jpg";
import item3 from "../assets/img/item3.jpg";
import item4 from "../assets/img/item4.jpg";

const LeforaShop = ({ currentPage, handleNavClick }) => {
  const { addToCart } = useContext(CartContext); // Get addToCart function from context
  const { currentUser } = useAuth(); // Get currentUser from Auth context

  // Log currentUser to ensure it's being set correctly
  useEffect(() => {
    console.log("Current User:", currentUser); // Check the currentUser value
  }, [currentUser]);

  const shopItems = [
    {
      id: 1,
      name: "Utkarsh Fertiliser",
      description: "Plant Fertilizer for Potted Plants",
      price: 250,
      img: item1,
    },
    {
      id: 2,
      name: "Natures+ Fertiliser",
      description: "Humic Acid for Plant Growth",
      price: 320,
      img: item2,
    },
    {
      id: 3,
      name: "Gardener ToolSet",
      description: "7 Pcs Gardening Tools Kit",
      price: 500,
      img: item3,
    },
    {
      id: 4,
      name: "Green Touch Two in 1",
      description: "Garden Pan Hoe with Hedge Shear",
      price: 600,
      img: item4,
    },
  ];

  const handleAddToCart = (item) => {
    if (currentUser) {
      console.log("User is logged in, adding item to cart:", item);
      addToCart(item); // Allow adding to cart if user is logged in
    } else {
      console.log("User is not logged in, cannot add item to cart.");
      alert("You need to be logged in to add items to the cart.");
    }
  };

  return (
    <>
      <Navbar currentPage={currentPage} handleNavClick={handleNavClick} />
      <div className="lefora-shop-container">
        <div className="shop-content">
          <h1>Welcome to the Lefora Shop!</h1>
          <p>
            Browse our gardening tools, seeds, and other essentials for your
            garden.
          </p>
          <div className="shop-items">
            {shopItems.map((item) => (
              <div key={item.id} className="shop-item">
                <div className="prod-img">
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="prod-desc">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>Price: Rs {item.price}</p>
                  <button className="btn" onClick={() => handleAddToCart(item)}>
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LeforaShop;
