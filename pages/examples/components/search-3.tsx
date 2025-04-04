import * as React from 'react';

import DemoSearchComponentThree from '@demos/DemoSearchComponentThree';
import Footer from '@system/Footer';
import GlobalModalManager from '@system/modals/GlobalModalManager';
import Navigation from '@system/Navigation';
import Page from '@components/Page';

function ExampleSearchVersionThree(props) {
  return (
    <Page
      isNotOpenSourceExample
      title="Components ➝ search concept III"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/components/search-3"
    >
      <DemoSearchComponentThree />
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default ExampleSearchVersionThree;
