import Auth from 'components/auth'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Spotifier</title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main>
        <Auth />
      </main>
    </>
  )
}
