import firebase,{FirebaseContext} from '../firebase';
import useAuthentication from "../hooks/useAuthentication";
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    const user = useAuthentication();
  
  return (
    <FirebaseContext.Provider
      value={{firebase, user}}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  )
}