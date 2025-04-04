import * as React from 'react';

import Content from '@system/layouts/Content';
import DemoBentoLayout from '@demos/DemoBentoLayout';
import DemoPricing from '@demos/DemoPricing';
import DemoSimpleGrid from '@demos/DemoSimpleGrid';
import Footer from '@system/Footer';
import GlobalModalManager from '@system/modals/GlobalModalManager';
import Navigation from '@system/Navigation';
import Page from '@components/Page';
import SectionFullHeight from '@system/sections/SectionFullHeight';

import { H1, Lead } from '@system/typography';

function ExampleFullLanding(props) {
  return (
    <Page
      title="wireframes.internet.dev ➝ components ➝ full section"
      description="A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites."
      url="https://wireframes.internet.dev/examples/components/full-section"
    >
      <Navigation />
      <SectionFullHeight>
        <Content>
          <H1>Pierre: Changelog</H1>
          <Lead style={{ marginTop: `var(--type-scale-5)` }}>
            A lightweight website template to test our design system. You can view this template on GitHub and see how we write websites. <br />
            <br />
            This example tests a navigation, theming, mobile responsiveness, a SEO pixel, and full browser height sections.
          </Lead>
        </Content>
      </SectionFullHeight>
      <SectionFullHeight>
        <DemoBentoLayout />
      </SectionFullHeight>
      <SectionFullHeight>
        <DemoSimpleGrid />
      </SectionFullHeight>
      <SectionFullHeight>
        <DemoPricing />
      </SectionFullHeight>
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

export default ExampleFullLanding;
