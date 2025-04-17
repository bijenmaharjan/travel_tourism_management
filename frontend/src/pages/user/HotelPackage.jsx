import React from "react";
import UserHotelTile from "../../components/user/UserHotelTile";
import { useSelector } from "react-redux";

const HotelPackage = () => {
  const { hotelList } = useSelector((state) => state.adminHotel);
  console.log("hotelList", hotelList);
  return (
    <div>
      <UserHotelTile hotels={hotelList} />
    </div>
  );
};

export default HotelPackage;
