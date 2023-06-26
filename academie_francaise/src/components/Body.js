import '../css/Body.css';
import Header from './Header';
import Footer from './Footer';

function Body({ children }) {
  return (
    <div>
      <Header/>
      {children}
      <Footer/>
    </div>
  );
}

export default Body;
