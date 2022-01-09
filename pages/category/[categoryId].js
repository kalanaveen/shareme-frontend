import Head from 'next/head';
import {Search,Layout} from '../../components';

export default function Category() {
  return (
    <div>
      <Head>
        <title>Share Me</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout><Search/></Layout>
    </div>
  )
}