import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout';
import BuildScreen from '../BuildScreen';
import NotFoundScreen from '../NotFoundScreen';
import ProductScreen from '../ProductScreen';

const Root: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<BuildScreen />} />
        <Route path="/login" element={<div>Sign In</div>} />
        <Route path="/register" element={<div>Sign Up</div>} />
        <Route path="/product/:category/:id/*" element={<ProductScreen />} />
        <Route path="/assemblies" element={<div>Assemblies</div>} />
        <Route path="/assembly/:id/*" element={<div>Assembly</div>} />
        <Route path="/*" element={<NotFoundScreen />} />
      </Routes>
    </Layout>
  );
};

// eslint-disable-next-line jest/no-export
export default Root;
