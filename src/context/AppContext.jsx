import React, { createContext, useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import { useNavigate } from 'react-router-dom';
const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [image, setimage] = useState(null);
  const [credits, setcredits] = useState(0);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    
    getUser();
  }, []);


  console.log("AppContext user:", user,credits);

  const getUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        clearUser();
        setloading(false);
        return;
      }
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.PROFILE);
        setuser(response.data.user);
        setcredits(response.data.user.CreditBalance);
        setloading(false);
      } catch (error) {
        clearUser();
        console.log(error);
      }
    };

  const generateImage = async (prompt) => {
    if(credits < 1){
      navigate('/buy');
      return false;
    }
    const { data } = await axiosInstance.post(API_PATHS.IMAGE.GENERATE_IMAGE, { prompt });
    if (data.success) {
      setimage(data.resultImage);
      navigate('/image');
      await getUser();
    }
    else {
      setimage(null);
    }
    
  }


  const clearUser = () => {
    setuser(null);
    localStorage.removeItem('token');
    setloading(false);
  };

  const updateUser = (userData) => {
    setuser(userData);
    setloading(false);
  }

  const value = { user, setuser, clearUser, loading, updateUser,image,generateImage };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider };
export default AppContext;
