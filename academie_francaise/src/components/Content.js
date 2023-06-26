import '../css/Content.css';
import Header from './Header';
import Footer from './Footer';

function Content({ children }) {
  return (
    <div className="Content">
      <Header/>
      {children}
      <Footer/>
    </div>
  );
}

export default Content;
