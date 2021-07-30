import React, { useContext, createContext } from "react";
import { useAuth } from "./authContext";
import axios, { AxiosInstance } from "axios";

interface IFetchContext {
	authAxios: any;
}

const FetchContext = createContext<IFetchContext>({ authAxios: () => {} });

export const FetchProvider: React.FC = ({ children }) => {
	const {
		authState: { token },
	} = useAuth();

	const authAxios = axios.create({
		baseURL: "http://localhost:3000",
	});

	authAxios.interceptors.request.use(
		config => {
			config.headers.Authorization = `Bearer ${token}`;
			return config;
		},
		error => {
			return Promise.reject(error);
		}
	);

	return (
		<FetchContext.Provider value={{ authAxios }}>
			{children}
		</FetchContext.Provider>
	);
};

export const useAuthAxios = () => useContext(FetchContext);
