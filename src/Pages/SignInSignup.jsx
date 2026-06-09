import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Buttons from "../Components/Buttons";
import Input from "../Components/Input";

function SignInSignup({ setIsLoggedIn, setUser }) {
  const [flip, setFlip] = useState(false);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });


  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    password: "",
  });


  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };


  const handleLogin = async () => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/login",
      loginData
    );

    console.log(res.data);

    // SAVE TOKEN
    localStorage.setItem("token", res.data.token);

    // SAVE USER ID
    localStorage.setItem("userId", res.data.user.id);

    // SAVE USER
    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    setIsLoggedIn(true);
    setUser(res.data.user);

    navigate("/");

  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message || "Login Failed"
    );
  }
};


  const handleSignup = async () => {
  try {

    const res = await axios.post(
      "http://localhost:3000/api/signup",
      signupData
    );

    console.log(res.data);

    localStorage.setItem("token", res.data.token);

    localStorage.setItem(
      "userId",
      res.data.user.id
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    setIsLoggedIn(true);

    setUser(res.data.user);

    navigate("/");

    setFlip(false);

  } catch (error) {

    console.log(error);

    console.log(
      error.response?.data?.message || "Signup Failed"
    );
  }
};

  return (
    <div className="min-h-screen bg-[#0b1020] flex items-center justify-center px-4 overflow-hidden">

      <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-3xl top-10 left-10"></div>

      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl bottom-10 right-10"></div>

      <div className="relative w-full max-w-5xl h-[500px] perspective-[2000px]">

        <motion.div
          animate={{ rotateY: flip ? 180 : 0 }}
          transition={{ duration: 0.9 }}
          className="relative w-full h-full preserve-3d"
        >

          <div
            className="
              absolute
              w-full
              h-full
              backface-hidden
              rounded-3xl
              overflow-hidden
              bg-[#11152b]
              border
              border-[#22284a]
              shadow-2xl
              grid
              md:grid-cols-2
            "
          >

            {/* LEFT SIDE */}
            <div
              className="hidden md:flex flex-col justify-center px-16 text-white"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >

              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Welcome Back
              </h1>

              <p className="text-lg text-white/80">
                Login to continue your tourism journey and access bookings,
                flights, hotels and more.
              </p>

              <div className="mt-10">
                <button
                  onClick={() => setFlip(true)}
                  className="
                    px-8
                    py-3
                    rounded-xl
                    border
                    border-white
                    hover:bg-white
                    hover:text-black
                    transition-all
                  "
                >
                  Create Account
                </button>
              </div>
            </div>

            {/* LOGIN FORM */}
            <div className="flex items-center justify-center px-8 md:px-20">

              <div className="w-full max-w-md">

                <h2 className="text-4xl font-bold text-white mb-2">
                  Sign In
                </h2>

                <p className="text-gray-400 mb-10">
                  Enter your account details
                </p>

                <div className="space-y-5">

                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                  />

                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                  />

                  <div onClick={handleLogin}>
                    <Buttons name="Login" />
                  </div>

                </div>

                <p className="text-gray-400 mt-8 text-center md:hidden">
                  Don't have an account?

                  <span
                    onClick={() => setFlip(true)}
                    className="text-cyan-400 ml-2 cursor-pointer"
                  >
                    Signup
                  </span>
                </p>

              </div>

            </div>

          </div>

          {/* SIGNUP PAGE */}
          <div
            style={{ transform: "rotateY(180deg)" }}
            className="
              absolute
              w-full
              h-full
              backface-hidden
              rounded-3xl
              overflow-hidden
              bg-[#11152b]
              border
              border-[#22284a]
              shadow-2xl
              grid
              md:grid-cols-2
            "
          >

            {/* SIGNUP FORM */}
            <div className="flex items-center justify-center px-8 md:px-20">

              <div className="w-full max-w-md">

                <h2 className="text-4xl font-bold text-white mb-2">
                  Create Account
                </h2>

                <p className="text-gray-400 mb-10">
                  Signup to start booking
                </p>

                <div className="space-y-5">

                  <Input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={signupData.fullname}
                    onChange={handleSignupChange}
                  />

                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                  />

                  <Input
                    type="password"
                    name="password"
                    placeholder="Create Password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                  />

                  <div onClick={handleSignup}>
                    <Buttons name="Signup" />
                  </div>

                </div>

                <p className="text-gray-400 mt-8 text-center md:hidden">
                  Already have account?

                  <span
                    onClick={() => setFlip(false)}
                    className="text-cyan-400 ml-2 cursor-pointer"
                  >
                    Login
                  </span>
                </p>

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div
              className="hidden md:flex flex-col justify-center px-16 text-white"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >

              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Join Us Today
              </h1>

              <p className="text-lg text-white/80">
                Create your account and explore flights, trains, hotels,
                bikes, cabs and holiday packages.
              </p>

              <div className="mt-10">
                <button
                  onClick={() => setFlip(false)}
                  className="
                    px-8
                    py-3
                    rounded-xl
                    border
                    border-white
                    hover:bg-white
                    hover:text-black
                    transition-all
                  "
                >
                  Sign In
                </button>
              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default SignInSignup;