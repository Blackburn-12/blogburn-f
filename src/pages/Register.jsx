import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Footer, Navbar } from '../components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      toast.success('User registered successfully!');
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <>
      <div className="pt-20">
        <Navbar />
      </div>
      <div className="flex items-center justify-center h-[85vh]">
        <div className="max-w-lg w-full mx-auto">
          <div
            style={{
              boxShadow:
                '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
            className="bg-loginbox rounded-lg shadow-xl overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-center text-3xl font-extrabold text-boxtext">
                Welcome
              </h2>
              <p className="mt-4 text-center text-boxtext">
                Signup to continue
              </p>
              {error && <div className="text-red-500">{error}</div>}
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm">
                  <div className="mt-4">
                    <label className="sr-only" htmlFor="name">
                      Username
                    </label>
                    <input
                      placeholder="name"
                      className="appearance-none relative block w-full px-3 py-3 border border-boxtext bg-white text-boxtext rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      required=""
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="sr-only" htmlFor="email">
                      Email address
                    </label>
                    <input
                      placeholder="Email address"
                      className="appearance-none relative block w-full px-3 py-3 border border-boxtext bg-white text-boxtext rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      required=""
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="sr-only" htmlFor="password">
                      Password
                    </label>
                    <input
                      placeholder="Password"
                      className="appearance-none relative block w-full px-3 py-3 border border-boxtext bg-white text-boxtext rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      required=""
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <button
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-boxtext hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Signing up...' : 'Signup'}
                  </button>
                </div>
              </form>
            </div>
            <div className="px-8 py-4 text-center">
              <span className="text-boxtext">Already have an account? </span>
              <Link
                className="font-medium text-indigo-500 hover:text-indigo-400"
                to="/login"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Register;
