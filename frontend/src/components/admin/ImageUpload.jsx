import React, { useState } from "react";
import { UploadCloudIcon, XIcon, FileIcon, Trash2Icon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { toast } from "react-toastify";
import axios from "axios";

const ImageUpload = ({
  hotelImage = [],
  setHotelImage = () => {},
  hotelImageUrl = [],
  setHotelImageUrl = () => {},
  setFormData = () => {},
}) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = React.useRef(null);

  const handleRemoveImage = (index) => {
    setHotelImage(hotelImage.filter((_, i) => i !== index));
  };

  const handleRemoveUploadedImage = (index) => {
    setHotelImageUrl(hotelImageUrl.filter((_, i) => i !== index));
    setFormData((prevData) => ({
      ...prevData,
      images: hotelImageUrl.filter((_, i) => i !== index),
    }));
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const dropImage = (event) => {
    event.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    if (droppedFiles.length > 0) {
      setHotelImage((prev) => [...(prev || []), ...droppedFiles]);
    }
  };

  const handleImageFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length > 0) {
      setHotelImage((prev) => [...(prev || []), ...selectedFiles]);
    }
  };

  const handleUpload = async () => {
    if (!hotelImage || hotelImage.length === 0) {
      toast.error("Please select images to upload");
      return;
    }

    const uploadData = new FormData();
    hotelImage.forEach((file) => {
      uploadData.append("hotelimage", file);
    });

    try {
      setImageLoading(true);
      const response = await axios.post(
        "http://localhost:9000/admin/api/image/upload",
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 60000,
        }
      );

      // Combine existing URLs with new ones
      const updatedUrls = [...hotelImageUrl, ...response.data.urls];

      setHotelImageUrl(updatedUrls);
      setFormData((prevData) => ({
        ...prevData,
        images: updatedUrls,
      }));
      setHotelImage([]); // Clear the selected files after upload
      setImageLoading(false);
      toast.success("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Error uploading images. Please try again.");
      setImageLoading(false);
    }
  };

  const handleReupload = async () => {
    if (!hotelImage || hotelImage.length === 0) {
      toast.error("Please select new images to upload");
      return;
    }

    const uploadData = new FormData();
    hotelImage.forEach((file) => {
      uploadData.append("hotelimage", file);
    });

    try {
      setImageLoading(true);
      const response = await axios.post(
        "http://localhost:9000/admin/api/image/upload",
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 60000,
        }
      );

      // Replace all existing URLs with new ones
      setHotelImageUrl(response.data.urls);
      setFormData((prevData) => ({
        ...prevData,
        images: response.data.urls,
      }));
      setHotelImage([]); // Clear the selected files after upload
      setImageLoading(false);
      toast.success("Images re-uploaded successfully!");
    } catch (error) {
      console.error("Error re-uploading images:", error);
      toast.error("Error re-uploading images. Please try again.");
      setImageLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-md font-semibold mb-2 block">
          Upload Images
        </Label>
        <div
          onDragOver={handleDragOver}
          onDrop={dropImage}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-lg p-3 transition ${
            dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <input
            type="file"
            id="image-upload"
            className="hidden"
            ref={inputRef}
            onChange={handleImageFileChange}
            multiple
            required
          />
          {!hotelImage || hotelImage.length === 0 ? (
            <Label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center h-24 cursor-pointer"
            >
              <UploadCloudIcon className="w-8 h-8 text-slate-500 mb-1" />
              <span className="text-sm">Drag & drop or click to upload</span>
            </Label>
          ) : imageLoading ? (
            <Skeleton className="bg-gray-100 h-10 w-full rounded" />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {hotelImage.map((image, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-1 bg-gray-100 rounded-md text-xs"
                >
                  <div className="flex items-center truncate">
                    <FileIcon className="w-4 h-4 text-gray-800 mr-1" />
                    <p className="truncate max-w-[80px]">{image.name}</p>
                  </div>
                  <Button
                    onClick={() => handleRemoveImage(index)}
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 hover:text-red-700"
                  >
                    <XIcon className="w-3 h-3" />
                    <span className="sr-only">Remove File</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={handleUpload}
            disabled={!hotelImage || hotelImage.length === 0}
            className={`flex-1 p-2 rounded-lg ${
              !hotelImage || hotelImage.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Add Images
          </button>

          {hotelImageUrl.length > 0 && (
            <button
              type="button"
              onClick={handleReupload}
              disabled={!hotelImage || hotelImage.length === 0}
              className={`flex-1 p-2 rounded-lg ${
                !hotelImage || hotelImage.length === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              Replace All
            </button>
          )}
        </div>
      </div>

      {/* Uploaded Images Preview */}
      {hotelImageUrl && hotelImageUrl.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-semibold mb-2">Uploaded Images:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {hotelImageUrl.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`uploaded-img-${index}`}
                  className="w-full h-24 object-cover rounded-lg shadow"
                />
                <button
                  onClick={() => handleRemoveUploadedImage(index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2Icon className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
