import Head from 'next/head'
import SnowflakeApp from '../components/SnowflakeApp'

const Page = () => (
  <div>
    <Head>
      <script src="https://apis.google.com/js/api.js" />
    </Head>
    <SnowflakeApp />
  </div>
)

export default Page
