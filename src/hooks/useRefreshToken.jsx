import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const UseRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    console.log(response.data);

    const roleCode = response.data.roles?.find((v) => v != 0);
    setAuth((prev) => {
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
        fullname: response.data.fullname,
        email: response.data.email,
        roleCode: [5678],
      };
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default UseRefreshToken;
