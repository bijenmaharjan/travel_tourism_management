import React from "react";
import PackageGrid from "../../components/user/PackageGrid";
import { useSelector } from "react-redux";

const TravelPackages = () => {
  const { packages = [], isLoading } = useSelector(
    (state) => state.travelPackage || {}
  );

  console.log("package", packages);
  return (
    <div>
      <PackageGrid packages={packages} />
    </div>
  );
};

export default TravelPackages;
