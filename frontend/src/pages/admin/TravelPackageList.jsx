import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTravelPackages,
  deleteTravelPackage,
} from "../../store/admin/admintravel";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import TravelPackageForm from "../../components/admin/TravelPackageForm";
import ConfirmationDialog from "../../components/admin/ConfirmationDialog";

const TravelPackageList = () => {
  const dispatch = useDispatch();
  const { packages, isLoading, error } = useSelector(
    (state) => state.travelPackage
  );
  // console.log("travelPackage", packages);
  const [openForm, setOpenForm] = useState(false);
  const [editPackage, setEditPackage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    dispatch(fetchTravelPackages());
  }, [dispatch]);

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await dispatch(deleteTravelPackage(deleteId)).unwrap();
        setSnackbar({
          open: true,
          message: "Package deleted successfully!",
          severity: "success",
        });
        setDeleteId(null);
        dispatch(fetchTravelPackages());
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.message || "Failed to delete package",
          severity: "error",
        });
      }
    }
  };

  const handleFormSuccess = (message) => {
    setSnackbar({
      open: true,
      message,
      severity: "success",
    });
    setOpenForm(false);
    dispatch(fetchTravelPackages());
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (isLoading && !packages.length) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Travel Packages</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setEditPackage(null);
            setOpenForm(true);
          }}
        >
          Add Package
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packages?.map((pkg) => (
              <TableRow key={`package-${pkg._id}`}>
                <TableCell>{pkg.name}</TableCell>
                <TableCell>{pkg.category}</TableCell>
                <TableCell>
                  {pkg?.location?.city}, {pkg?.location?.country}
                </TableCell>
                <TableCell>
                  {pkg?.duration?.days}d/{pkg?.duration?.nights}n
                </TableCell>
                <TableCell>
                  NPR{" "}
                  {(pkg?.price?.basePrice || 0) - (pkg?.price?.discount || 0)}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setEditPackage(pkg);
                      setOpenForm(true);
                    }}
                  >
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => setDeleteId(pkg._id)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TravelPackageForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSuccess={handleFormSuccess}
        packageData={editPackage}
      />

      <ConfirmationDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this travel package?"
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TravelPackageList;
