import React, { useEffect } from "react";
import {
  BedDouble,
  Plane,
  CalendarDays,
  Users,
  CreditCard,
  MapPin,
  Hotel,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { getBookings } from "../../store/booking"; // ✅ Make sure this import is correct

const UserSidebarBooking = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.auth);
  console.log("booking", bookings);

  useEffect(() => {
    if (open && user?.token) {
      dispatch(getBookings(user.token));
    }
  }, [dispatch, open, user?.token]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-80 sm:w-96 bg-white dark:bg-gray-900 px-4"
      >
        <SheetHeader className="px-2">
          <SheetTitle className="text-xl font-bold text-primary dark:text-white">
            Your Travel Plans
          </SheetTitle>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            All your upcoming and past bookings
          </p>
        </SheetHeader>

        <div className="mt-4 h-[calc(100%-80px)] overflow-y-auto space-y-3">
          {loading && (
            <div className="space-y-3 px-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <Skeleton className="h-5 w-3/4 mb-1" />
                  <Skeleton className="h-3 w-1/2 mb-2" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 mx-2">
              <p className="text-red-600 dark:text-red-400 text-center text-sm font-medium">
                {error}
              </p>
            </div>
          )}

          {!loading && bookings?.length === 0 && (
            <div className="flex flex-col items-center justify-center h-56 text-center px-2">
              <Plane className="w-10 h-10 text-gray-300 mb-3" />
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                No bookings yet
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                You haven’t made any travel bookings so far.
              </p>
            </div>
          )}

          {!loading &&
            bookings?.length > 0 &&
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-gray-800 dark:text-white">
                    {booking.destination || "Unknown Destination"}
                  </h3>
                  <Badge>{booking.status || "Pending"}</Badge>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Date: {formatDate(booking.date)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Guests: {booking.guests || 1}
                </p>
              </div>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserSidebarBooking;
