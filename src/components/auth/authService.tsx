import { createContext, useEffect, useState, memo, useMemo } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';

export const AuthContext = createContext<{
  token?: string;
  setToken: (val: string) => void;
  user: { id: number; name: string } | null;
  setUser: any;
  setRefreshAccessToken: (val: string) => void;
  loginMutation: any;
  logoutMutation: any;
}>({
  token: '',
  setToken: () => {},
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
  const [token, setToken] = useState<string>();
  const [refreshAccessToken, setRefreshAccessToken] = useState<string>();
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('accesstoken') || '');
    setRefreshAccessToken(localStorage.getItem('refreshtoken') || '');
  }, []);

  useEffect(() => {
    if (refreshAccessToken) {
      //issitraukti accesstoken expiretime ir nistatyti i settimeout
      const handleSetTimeout = setTimeout(() => {
        refreshTokenMutation.mutate(refreshAccessToken || '');
      }, 200000);
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
      setToken(res.data?.data.accessToken.split(' ')[1]);
      setRefreshAccessToken(res.data?.data.refreshToken.split(' ')[1]);
      localStorage.setItem(
        'accesstoken',
        res.data?.data.accessToken.split(' ')[1]
      );
      localStorage.setItem(
        'refreshtoken',
        res.data?.data.refreshToken.split(' ')[1]
      );
      updateDefaultHeaders({ authorization: res.data?.data.accessToken });
    },
    onError: (error) => {
      alert(`${error} login`);
    },
  });

  const logout = async () => {
    return await axios.post('/auth/logout', { refToken: refreshAccessToken });
  };

  const logoutMutation = useMutation(logout, {
    onSuccess: (res) => {
      localStorage.clear();
      setToken('');
      setRefreshAccessToken('');
    },
    onError: (error) => {
      alert(error);
    },
  });

  const value = useMemo(
    () => ({
      token,
      setToken,
      user,
      setUser,
      setRefreshAccessToken,
      loginMutation,
      logoutMutation,
    }),
    [
      token,
      setToken,
      user,
      setUser,
      setRefreshAccessToken,
      loginMutation,
      logoutMutation,
    ]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
});
