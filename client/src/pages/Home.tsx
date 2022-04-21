import React from "react";

import Layout from "../components/Layout";

import Greetings from "../components/homeComponents/Greetings";
import QuickLinks from "../components/homeComponents/QuickLinks";
import NavigationTileCoponents from "../components/homeComponents/NavigationTileComponent";

const HomePage = function (): JSX.Element {
  return (
    <Layout>
      <Greetings name="pintio" />
      <QuickLinks />
      <NavigationTileCoponents />
    </Layout>
  );
};

export default HomePage;
