import bgImage from "../assets/backroundimg.jpg";
import logoImage from "../assets/jobjourney.png";
import { Link } from "react-router-dom";


const HomePage = () => {
  return (
    <div
      className="min-h-screen w-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
     <div className="absolute left-5 top-5 w-[520px]">
        <img
          src={logoImage}
          alt="JobJourney"
          className="w-full h-auto max-w-none"
        />
      </div>
      <nav className="absolute top-35 right-50">
  <ul className="flex gap-6 text-blue-500 font-extrabold text-4xl">
    <li>
    <Link to="/login">Login / Signup</Link>

        </li>
    <li>
        <Link to = "/application">Application</Link>
        </li>
  </ul>
</nav>
<div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <h1 className="text-blue-500 font-extrabold text-6xl text-center">
          Manage and track your job applications effortlessly
        </h1>
      </div>

    </div>
  );
};

export default HomePage;
