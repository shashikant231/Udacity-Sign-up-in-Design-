import '../styles/globals.css'
import '../styles/buttons-sass.scss'
import Header from './components/Header'

function MyApp({ Component, pageProps }) {
  return (
  <>
  <Header/>
  <Component {...pageProps} />
  </>
  )
}

export default MyApp
