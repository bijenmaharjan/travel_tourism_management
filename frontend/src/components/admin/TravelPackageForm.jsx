import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createTravelPackage,
  updateTravelPackage,
} from "../../store/admin/admintravel";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Chip,
  Alert,
} from "@mui/material";

const categories = [
  "Adventure",
  "Luxury",
  "Family",
  "Honeymoon",
  "Cultural",
  "Wildlife",
];

const mealOptions = ["Breakfast", "Lunch", "Dinner", "Snacks"];
const transportOptions = ["Flight", "Bus"];

const TravelPackageForm = ({ open, onClose, onSuccess, packageData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    location: { country: "", city: "" },
    duration: { days: 0, nights: 0 },
    price: { basePrice: 0, discount: 0 },
    mealsIncluded: [],
    roomtype: "",
    amenities: "",
    transportation: "",
    availableSeats: 0,
    images: [],
  });
  const [imageUrls, setImageUrls] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (packageData) {
      setFormData(packageData);
      setImageUrls(packageData.images?.join("\n") || "");
    } else {
      // Reset form when creating new package
      setFormData({
        name: "",
        description: "",
        category: "",
        location: { country: "", city: "" },
        duration: { days: 0, nights: 0 },
        price: { basePrice: 0, discount: 0 },
        mealsIncluded: [],
        roomtype: "",
        amenities: "",
        transportation: "",
        availableSeats: 0,
        images: [],
      });
      setImageUrls("");
    }
    setError(null);
  }, [packageData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMealsChange = (event) => {
    const { value } = event.target;
    setFormData((prev) => ({
      ...prev,
      mealsIncluded: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleImagesChange = (e) => {
    const urls = e.target.value.split("\n").filter((url) => url.trim() !== "");
    setImageUrls(e.target.value);
    setFormData((prev) => ({ ...prev, images: urls }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (packageData) {
        await dispatch(
          updateTravelPackage({ id: packageData._id, packageData: formData })
        ).unwrap();
        onSuccess("Package updated successfully!");
      } else {
        await dispatch(createTravelPackage(formData)).unwrap();
        onSuccess("Package created successfully!");
      }
    } catch (error) {
      setError(error.message || "Operation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {packageData ? "Edit Travel Package" : "Create New Travel Package"}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Package Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Transportation</InputLabel>
                <Select
                  name="transportation"
                  value={formData.transportation}
                  onChange={handleChange}
                  required
                >
                  {transportOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                name="location.country"
                value={formData.location.country}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="location.city"
                value={formData.location.city}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Days"
                name="duration.days"
                type="number"
                value={formData.duration.days}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nights"
                name="duration.nights"
                type="number"
                value={formData.duration.nights}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Base Price ($)"
                name="price.basePrice"
                type="number"
                value={formData.price.basePrice}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Discount ($)"
                name="price.discount"
                type="number"
                value={formData.price.discount}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  multiple
                  name="mealsIncluded"
                  value={formData.mealsIncluded}
                  onChange={handleMealsChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {mealOptions.map((meal) => (
                    <MenuItem key={meal} value={meal}>
                      {meal}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Room Type"
                name="roomtype"
                value={formData.roomtype}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Available Seats"
                name="availableSeats"
                type="number"
                value={formData.availableSeats}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Amenities"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URLs (one per line)"
                name="images"
                value={imageUrls}
                onChange={handleImagesChange}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? (
              <CircularProgress size={24} />
            ) : packageData ? (
              "Update"
            ) : (
              "Create"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TravelPackageForm;
