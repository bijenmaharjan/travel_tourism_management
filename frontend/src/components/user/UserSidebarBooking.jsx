import React, { useEffect } from "react";
import { Plane } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { getBookingsByUserId } from "../../store/booking";

const UserSidebarBooking = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.booking);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (open && isAuthenticated && user?.userId) {
      dispatch(getBookingsByUserId(user.userId));
    }
  }, [open, isAuthenticated, user?.userId, dispatch]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  if (!isAuthenticated) {
    return (
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="right" className="w-80 sm:w-96">
          <SheetHeader>
            <SheetTitle>Authentication Required</SheetTitle>
            <p className="text-sm text-gray-500">
              Please log in to view your bookings
            </p>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80 sm:w-96">
        <SheetHeader>
          <SheetTitle>Your Travel Plans</SheetTitle>
          <p className="text-sm text-gray-500">
            All your upcoming and past bookings
          </p>
        </SheetHeader>

        <div className="mt-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
              {error}
            </div>
          ) : bookings?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Plane className="w-10 h-10 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium">No bookings yet</h3>
              <p className="text-sm text-gray-500 mt-1">
                You haven't made any travel bookings yet
              </p>
            </div>
          ) : (
            bookings?.map((booking) => (
              <div
                key={booking._id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">
                      {booking.hotel?.name || "Unknown Hotel"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatDate(booking.checkIn)} -{" "}
                      {formatDate(booking.checkOut)}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {booking.status || "Confirmed"}
                  </Badge>
                </div>  
                <div className="mt-2 text-sm">
                  <p>Guests: {booking.guests || 1}</p>
                  <p className="font-medium mt-1">
                    Total: ${booking.totalAmount?.toFixed(2) || "0.00"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserSidebarBooking;
