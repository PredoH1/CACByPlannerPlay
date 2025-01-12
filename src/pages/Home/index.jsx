import Header from "../../components/Header/Index";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Header />
      <Link to="/sobre">Sobre</Link>
      <p>pedro henrique souza candido</p>
    </>
  );
}

export default Home;
