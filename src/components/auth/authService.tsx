import { createContext, useEffect, useState, memo } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';

export const AuthContext = createContext<{
  token?: string;
  setAccessToken: (val: string) => void;
  user: { id: number; name: string } | null;
  setUser: any;
  setRefreshAccessToken: (val: string) => void;
  loginMutation: any;
  logoutMutation: any;
}>({
  token: '',
  setAccessToken: () => {},
  user: null,
  setUser: () => {},
  setRefreshAccessToken: () => {},
  loginMutation: () => {},
  logoutMutation: () => {},
});

export const updateDefaultHeaders = (headers: { [key: string]: string }) => {
  axios.defaults.headers.common = {
    ...axios.defaults.headers.common,
    ...headers,
  };
};

export const AuthContextProvider: React.FC = memo(({ children }) => {
  console.log('render');
  const [accessToken, setAccessToken] = useState<string>();
  const [token, setToken] = useState<string>();
  const [refreshAccessToken, setRefreshAccessToken] = useState<string>();
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);

  useEffect(() => {
    console.log('useefect');
    setToken(localStorage.getItem('accesstoken')?.split(' ')[1]);
    setRefreshAccessToken(localStorage.getItem('refreshtoken')?.split(' ')[1]);
  }, []);

  useEffect(() => {
    if (refreshAccessToken) {
      //issitraukti accesstoken expiretime ir nistatyti i settimeout
      const handleSetTimeout = setTimeout(() => {
        refreshTokenMutation.mutate(refreshAccessToken || '');
      }, 3000);
      return () => clearTimeout(handleSetTimeout);
    }
  }, [token, refreshAccessToken]);

  useEffect(() => {
    localStorage.setItem('accesstoken', token || '');
    updateDefaultHeaders({ authorization: token || '' });
  }, [token]);

  const refreshToken = async (token: string) => {
    return await axios.post('/auth/refresh-token', { token: token });
  };
  const refreshTokenMutation = useMutation(refreshToken, {
    onSuccess: (res) => {
      console.log(res);
      setToken(res.data?.accessToken);
      setRefreshAccessToken(res.data?.refreshToken);
    },
    onError: (error) => {
      alert(`${error} refreshtoken`);
    },
  });

  const loginAsync = async (user: { email: string; password: string }) => {
    return await axios.post('/auth/login', user);
  };

  const loginMutation = useMutation(loginAsync, {
    onSuccess: (res) => {
      setUser({
        id: res.data?.data?.user.id,
        name: res.data?.data?.user.name,
      });
      setToken(res.data?.data.accessToken);
      setRefreshAccessToken(res.data?.data.refreshToken);
      localStorage.setItem('accesstoken', res.data?.data.accessToken);
      localStorage.setItem('refreshtoken', res.data?.data.refreshToken);
      updateDefaultHeaders({ authorization: res.data?.data.accessToken });
    },
    onError: (error) => {
      alert(`${error} login`);
    },
  });

  const logout = async () => {
    return await axios.post('/auth/logout', refreshAccessToken);
  };

  const logoutMutation = useMutation(logout, {
    onSuccess: (res) => {
      localStorage.clear();
      setAccessToken('');
    },
    onError: (error) => {
      alert(error);
    },
  });
  return (
    <AuthContext.Provider
      value={{
        token,
        setAccessToken,
        user,
        setUser,
        setRefreshAccessToken,
        loginMutation,
        logoutMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
});
