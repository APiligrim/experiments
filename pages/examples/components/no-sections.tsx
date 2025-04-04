import * as React from 'react';

import Content from '@system/layouts/Content';
import DemoBentoLayout from '@demos/DemoBentoLayout';
import DemoPricing from '@demos/DemoPricing';
import DemoSimpleGrid from '@demos/DemoSimpleGrid';
import Footer from '@system/Footer';
import GlobalModalManager from '@system/modals/GlobalModalManager';
import Navigation from '@system/Navigation';
import Page from '@components/Page';

import { H1, Lead } from '@system/typography';

function ExampleNoSections(props) {
  return (
    <Page
      title="wireframes.internet.dev ➝ components ➝ no sections"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/components/no-sections"
    >
      <Navigation />
      <Content>
        <H1>Pierre: Changelog</H1>
        <Lead style={{ marginTop: `var(--type-scale-5)` }}>
          A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites. <br />
          <br />
          This example tests a navigation, theming, mobile responsiveness, a SEO pixel, and half browser height sections so more content is above the fold.
        </Lead>
      </Content>
      <DemoBentoLayout />
      <DemoSimpleGrid />
      <DemoPricing style={{ marginTop: `var(--type-scale-5)` }} />
      <Footer />
      <GlobalModalManager />
    </Page>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default ExampleNoSections;
