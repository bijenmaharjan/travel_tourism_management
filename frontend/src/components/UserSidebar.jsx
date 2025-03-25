import React, { useState } from "react";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../components/ui/sheet";

const userSidebarMenuItems = [
  {
    id: "flights",
    label: "Flights",
    path: "/user/flights",
  },
  {
    id: "bus",
    label: "Bus",
    path: "/user/Bus",
  },
  {
    id: "travel",
    label: "Travel",
    path: "/user/travel",
  },
  {
    id: "travelpackage",
    label: "TravelPackages",
    path: "/user/flights",
  },
  {
    id: "stays",
    label: "Stays",
    path: "/user/Stays",
  },
  {
    id: "Hotels",
    label: "Hotels",
    path: "/user/hotels",
  },
  {
    id: "booked",
    label: "Booked",
    path: "/user/booked",
  },
  {
    id: "map",
    label: "map",
    path: "/user/map",
  },
];

const MenuItems = ({ setOpen }) => {
  const navigate = useNavigate();
  return (
    <nav className="mt-4 flex-col flex gap-2">
      {userSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen(false);
          }}
          className="px-4 py-2 cursor-pointer hover:bg-gray-200 rounded-md"
        >
          {menuItem.label}
        </div>
      ))}
    </nav>
  );
};

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="block">
      <button onClick={() => setOpen(true)} className="p-2">
        <Menu size={30} />
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle>
              <h1 className="text-2xl text-red-500">User Panel</h1>
            </SheetTitle>
          </SheetHeader>
          <MenuItems setOpen={setOpen} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HamburgerMenu;
