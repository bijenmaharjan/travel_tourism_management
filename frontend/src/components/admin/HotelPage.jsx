import React from "react";
import AdminLayout from "./Layout";
import CreateHotel from "../../pages/admin/AdminHotel";

const HotelPage = () => {
  return (
    <AdminLayout>
      <CreateHotel />
    </AdminLayout>
  );
};

export default HotelPage;
