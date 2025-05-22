import React from "react";
import PackageGrid from "../../components/user/PackageGrid";
import { useSelector } from "react-redux";

const TravelPackages = () => {
  const { packages = [], isLoading } = useSelector(
    (state) => state.travelPackage || {}
  );

  console.log("package", packages);

  if (isLoading) {
    return <div className="text-center p-10">Loading packages...</div>;
  }

  if (!packages.length) {
    return <div className="text-center p-10">No packages available yet.</div>;
  }

  return (
    <div>
      <PackageGrid packages={packages} />
    </div>
  );
};

export default TravelPackages;
