import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHotels } from "../../store/admin/admin";
import HotelTile from "../../components/admin/Hoteltile"; // Import HotelTile component

const GetAllHotels = () => {
  const dispatch = useDispatch();
  const { hotelList, isLoading, error } = useSelector(
    (state) => state.adminHotel
  );

  useEffect(() => {
    dispatch(fetchAllHotels());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="hotel-list">
      <div className="flex justify-between">
        <h2 className="text-2xl   mb-2 pl-4 ">Hotels List</h2>
        <h2 className="flex underline">
          Total hotels: {`${hotelList.length}`}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotelList.length > 0 ? (
          hotelList.map((hotel) => (
            <HotelTile
              key={hotel._id} // use unique hotel id as key
              hotel={hotel}
              setCurrentEditId={() => {}}
              setOpenCreateHotelDialog={() => {}}
              setFormData={() => {}}
              handleDelete={() => {}}
            />
          ))
        ) : (
          <p>No hotels available</p>
        )}
      </div>
    </div>
  );
};

export default GetAllHotels;
