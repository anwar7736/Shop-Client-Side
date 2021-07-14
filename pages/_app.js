import '../styles/globals.css'
import '../styles/button.css'
import '../styles/card.css'
import '../styles/dashboard.css'
import '../styles/form.css'
import '../styles/images.css'
import '../styles/modal.css'
import '../styles/navMenu.css'
import '../styles/table.css'
import '../styles/transaction.css'
import '../styles/animate.min.css'
import '../styles/fontawesome.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NextNprogress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  return (
  		<>
  			<NextNprogress
			   color="#CB4D85"
			   startPosition={0.2}
			   stopDelayMs={100}
			   height="3"
			/>
  			 <Component {...pageProps} />
  		</>
  	)

}

export default MyApp
