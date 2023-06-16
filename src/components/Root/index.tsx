import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout';
import BuildScreen from '../BuildScreen';
import NotFoundScreen from '../NotFoundScreen';
import ProductScreen from '../ProductScreen';
import ComparisonScreen from '../ComparisonScreen';

const Root: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<BuildScreen />} />
        <Route path="/*" element={<NotFoundScreen />} />
        <Route path="/product/:category/:id/*" element={<ProductScreen />} />
        <Route path="/comparison" element={<ComparisonScreen />} />
        <Route path="/login" element={<div>Sign In</div>} />
        <Route path="/register" element={<div>Sign Up</div>} />
        <Route path="/assemblies" element={<div>Assemblies</div>} />
        <Route path="/assembly/:id/*" element={<div>Assembly</div>} />
      </Routes>
    </Layout>
  );
};

// eslint-disable-next-line jest/no-export
export default Root;
