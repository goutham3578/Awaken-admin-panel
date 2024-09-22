import React, { useState, useEffect } from 'react';
import { Spinner } from 'reactstrap';
import "./loader.css";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading operation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center">
      {isLoading && (
        <div className="rotating-circle-loader absolute-center">
          <Spinner color="primary" />
          <div className="circle"></div>
        </div>
      )}
    </div>
  );
};

export default Loader;