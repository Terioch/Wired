import React, { useContext, createContext } from "react";
import { SERVER_URL } from "../config/server";
import { useAuth } from "./authContext";
import axios, { AxiosInstance } from "axios";
import { useEffect } from "react";

interface IFetchContext {
	authAxios: AxiosInstance;
}

const FetchContext = createContext<IFetchContext>({} as IFetchContext);

export const FetchProvider: React.FC = ({ children }) => {
	const {
		authState: { token },
	} = useAuth();

	const authAxios = axios.create({
		baseURL: SERVER_URL,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	// useEffect(() => {
	// authAxios.interceptors.request.use(
	// 	config => {
	// 		config.headers.Authorization = `Bearer ${token}`;
	// 		return config;
	// 	},
	// 	error => {
	// 		return Promise.reject(error);
	// 	}
	// );
	// });

	console.log(token);

	return (
		<FetchContext.Provider value={{ authAxios }}>
			{children}
		</FetchContext.Provider>
	);
};

export const useAuthAxios = () => useContext(FetchContext);
