import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />

      <HorizontalCardProduct
        category={"car-cleaning&detailing"}
        heading={"Car cleaning and services"}
      />
      <HorizontalCardProduct
        category={"ac-repair&services"}
        heading={"AC repair"}
      />

      <VerticalCardProduct category={"air-cooler"} heading={"Air cooler services"} />
      <VerticalCardProduct
        category={"computer-repair"}
        heading={"Computer repair"}
      />
      <VerticalCardProduct category={"washing-machine"} heading={"Washing machine"} />
      <VerticalCardProduct
        category={"women-spa"}
        heading={"Women spa"}
      />
      <VerticalCardProduct category={"makeup&styling-studio"} heading={"Makeup & styling"} />
      <VerticalCardProduct
        category={"salon-for-men"}
        heading={"Salon for men"}
      />
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />
      <VerticalCardProduct category={"electrician"} heading={"Electrician"} />
    </div>
  );
};

export default Home;
