import { Link } from "react-router-dom";

function Header({ isLoggedIn, user }) {
  return (
    <header className="w-full bg-[#0f172a] border-b border-gray-800 shadow-lg">
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div>
          <Link
            to="/"
            className="text-3xl font-bold text-cyan-400"
          >
            Tour<span className="text-white">X</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-white font-medium">

          <Link to="/" className="hover:text-cyan-400 transition">
            Home
          </Link>

          <Link to="/find-flights" className="hover:text-cyan-400 transition">
            Flights
          </Link>

          <Link to="/trains" className="hover:text-cyan-400 transition">
            Trains
          </Link>

          <Link to="/hotels" className="hover:text-cyan-400 transition">
            Hotels
          </Link>

          <Link to="/transport" className="hover:text-cyan-400 transition">
            Transport
          </Link>

        </nav>

        <div className="flex items-center gap-4">

          {isLoggedIn ? (
            <>
             
              <div className="hidden md:flex flex-col text-right">
                <span className="text-white font-semibold">
                  {user?.fullname || "User"}
                </span>

                <span className="text-gray-400 text-sm">
                  Welcome Back
                </span>
              </div>

             
              <Link to= "/dashboard" className="w-11 h-11 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                {user?.fullname?.charAt(0).toUpperCase() || "U"}
              </Link>

             
              
            </>
          ) : (
            <>

              <Link
                to="/Join"
                className="
                  px-5
                  py-2
                  rounded-xl
                  bg-cyan-500
                  hover:bg-cyan-600
                  transition
                  text-white
                  font-semibold
                "
              >
                Join
              </Link>
            </>
          )}

        </div>

      </div>

    </header>
  );
}

export default Header;