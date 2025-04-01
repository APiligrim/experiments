import '@root/animations.scss';
import '@root/global.scss';

import SpinningCircles from '@root/components/RotatingCircle';
import Package from '@root/package.json';

export async function generateMetadata({ params, searchParams }) {
  const title = Package.name;
  const description = Package.description;
  const url = 'https://pierre.co/changelog';
  const handle = '@internetxstudio';

  return {
    metadataBase: new URL('https://pierre.co/changelog'),
    title,
    description,
    url,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [
        {
          url: 'https://intdev-global.s3.us-west-2.amazonaws.com/public/internet-dev/52e4a0c6-89b7-4a71-bc18-b1e7135ca4f9.png',
          width: 1200,
          height: 628,
        },
      ],
    },
    twitter: {
      title,
      description,
      url,
      handle,
      card: 'summary_large_image',
      images: ['https://intdev-global.s3.us-west-2.amazonaws.com/public/internet-dev/52e4a0c6-89b7-4a71-bc18-b1e7135ca4f9.png'],
    },
    icons: {
      icon: '/favicon-32x32.png',
      shortcut: '/favicon-16x16.png',
      apple: [{ url: '/apple-touch-icon.png' }, { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
      other: [
        {
          rel: 'apple-touch-icon-precomposed',
          url: '/apple-touch-icon-precomposed.png',
        },
      ],
    },
  };
}

export default async function Page(props) {
  return (
    <div>
      <SpinningCircles />
    </div>
  );
}
