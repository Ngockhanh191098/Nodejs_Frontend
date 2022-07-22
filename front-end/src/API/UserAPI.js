import axios from "axios";
import { useEffect, useState } from "react";

function UserAPI() {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  let login = localStorage.getItem("login") || null;
  login = JSON.parse(login);
  const [user, setUser] = useState({
    avatar: "",
    email: "",
    username: "",
    userId:""
  });
  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:5000/api/v1/user/${login.userId}`,
        { headers: { "access-token": login.accesstoken } }
      );
      if (data.avatar) {
        setUser({
          avatar: data.avatar,
          email: data.email,
          username: login.username,
          accesstoken: login.accesstoken,
          userId:data.id
        });
      }
      if (login.role === "admin") {
        setIsAdmin(true);
      }
      setIsLogged(true);
    } catch (error) {
      alert(error.response.message);
    }
  };
  useEffect(() => {
    if(login) {
      getUser();
    }
  }, []);

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    user: [user, setUser],
  };
}

export default UserAPI;
