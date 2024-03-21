import axios from 'axios';
import {createContext, useContext, useEffect, useState} from 'react';
import {API_BASE} from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAuthState {
  token: string | null;
  authenticated: boolean | null;
  phone?: string | null;
  _id?: string | null; 
}

interface IAuth {
  authState?: IAuthState;
  onLogin?: (phone: string) => Promise<any>;
  onVerify?: (code: string) => Promise<any>;
  onLogout?: () => Promise<void>;
}

const AuthContext = createContext<IAuth>({});
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}: any) => {
  const [authState, setAuthState] = useState<IAuthState>({
    token: null,
    authenticated: null,
    phone: null,
    _id:null
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const response = await axios.get(`${API_BASE}/auth/me`);
          const { _id, phone } = response.data.user; 
          setAuthState(prevState => ({
            ...prevState,
            token: token,
            authenticated: true,
            phone: phone,
            _id: _id, 
          }));
        } catch (error) {
          console.error('Ошибка получения данных пользователя:', error);
          setAuthState(prevState => ({
            ...prevState,
            token: null,
            authenticated: false,
            phone: null,
            _id: null, 
          }));
        }
      }
    };
    loadToken();
  }, []);

  async function login(phone: string) {
    try {
      const response = await axios.post(`${API_BASE}/auth/login`, {
        phone,
      });
      setAuthState({
        phone,
        token: null,
        authenticated: false,
      });

      return response;
    } catch (error) {
      setAuthState(prevState => ({...prevState, loading: false}));
      return {error: true, msg: (error as any).response.data};
    }
  }
  async function verify(code: string) {
    try {
      const response = await axios.post(`${API_BASE}/auth/verify`, {
        phone: authState.phone,
        code,
      });
      setAuthState({
        token: response.data.token,
        phone: authState.phone,
        authenticated: true,
      });
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.token}`;
      await AsyncStorage.setItem('token', response.data.token);
      return response;
    } catch (error) {
      setAuthState(prevState => ({...prevState, loading: false}));
      return (error as any).response;
    }
  }

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = '';
  };

  const value = {
    authState,
    onLogin: login,
    onVerify: verify,
    onLogout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
