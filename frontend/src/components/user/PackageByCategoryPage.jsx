import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Header from "../../components/management/Header";
import axios from "axios";
import PackageGrid from "./PackageGrid";

const PackagesByCategoryPage = () => {
  const [searchParams] = useSearchParams();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const category = searchParams.get("category");

  useEffect(() => {
    const fetchPackagesByCategory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/v1/admin/travel-packages/category/${category}`
        );
        setPackages(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (category) {
      fetchPackagesByCategory();
    }
  }, [category]);

  return (
    <div>
      <Header />
      <div className="pt-20">
        {" "}
        {/* Add padding to account for fixed header */}
        {loading ? (
          <div className="text-center py-12">
            <p>Loading packages...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <p>Error: {error}</p>
          </div>
        ) : (
          <PackageGrid packages={packages} />
        )}
      </div>
    </div>
  );
};

export default PackagesByCategoryPage;
