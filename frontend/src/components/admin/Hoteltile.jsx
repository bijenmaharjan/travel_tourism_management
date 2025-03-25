import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "../UI/card";
import { Button } from "../UI/button";
import {
  MapPin,
  Bed,
  Clock,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import EditHotelDialog from "./EditHotelDialog";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { deleteHotel, editHotel } from "../../store/admin/admin";
import { useDispatch } from "react-redux";

const HotelTile = ({ hotel }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ ...hotel });

  const dispatch = useDispatch();

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === hotel.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? hotel.images.length - 1 : prevIndex - 1
    );
  };

  const handleEditClick = () => {
    setFormData({ ...hotel });
    setIsEditDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      await dispatch(editHotel({ id: hotel._id, formData }));
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };
  const handleDelete = async () => {
    try {
      await dispatch(deleteHotel(hotel._id)); // Make sure this matches your Redux action
      setIsDeleteDialogOpen(false);
      // Optional: Refresh the hotel list or show success message
      dispatch(fetchAllHotels());
    } catch (error) {
      console.error("Error deleting hotel:", error);
      // Optional: Show error message to user
    }
  };

  const confirmDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <Card
        className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Carousel */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={hotel.images[currentImageIndex]}
            alt={hotel.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          />

          {/* Image counter */}
          {hotel.images.length > 1 && (
            <div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
              {currentImageIndex + 1}/{hotel.images.length}
            </div>
          )}

          {/* Carousel Controls */}
          {hotel.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-1.5 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-200"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-1.5 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-200"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Card Content */}
        <CardContent className="p-5 space-y-3">
          <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
            {hotel.name}
          </h2>

          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">{hotel.location}</span>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2">
            {hotel.description}
          </p>

          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-500 text-sm">
                <Bed className="h-4 w-4 mr-1" />
                <span>{hotel.roomsAvailable} rooms</span>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>
                  {hotel.checkInTime} - {hotel.checkOutTime}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-lg font-bold text-teal-600">
                NPR {hotel.pricePerNight}
              </span>
              <span className="block text-xs text-gray-400">per night</span>
            </div>
          </div>
        </CardContent>

        {/* Card Footer */}
        <CardFooter className="flex justify-between p-4 bg-gray-50 border-t border-gray-200">
          <Button
            variant="outline"
            className="flex items-center space-x-2 px-4 py-2 border-gray-300 hover:bg-gray-100 transition-colors"
            onClick={handleEditClick}
          >
            <Edit2 className="h-4 w-4" />
            <span>Edit</span>
          </Button>
          <Button
            variant="destructive"
            className="flex items-center space-x-2 px-4 py-2 hover:bg-red-600/90 transition-colors"
            onClick={confirmDelete}
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </Button>
        </CardFooter>
      </Card>

      {/* Edit Dialog */}
      {isEditDialogOpen && (
        <EditHotelDialog
          hotel={hotel}
          onClose={() => setIsEditDialogOpen(false)}
          onSave={handleSave}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <DeleteConfirmationDialog
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={() => {
            handleDelete(hotel._id);
            setIsDeleteDialogOpen(false);
          }}
          itemName={hotel.name}
        />
      )}
    </>
  );
};

export default HotelTile;
