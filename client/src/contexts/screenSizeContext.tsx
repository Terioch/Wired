import React, {
	useState,
	useEffect,
	useContext,
	createContext,
} from "react";

interface IScreenSizeContext {
	screenWidth: number;
}

const ScreenSizeContext = createContext<IScreenSizeContext>(
	{} as IScreenSizeContext
);

export const ScreenSizeProvider: React.FC = ({ children }) => {
	const [screenWidth, setScreenWidth] = useState<number>(
		window.innerWidth
	);

	useEffect(() => {
		window.addEventListener("resize", () => {
			setScreenWidth(window.innerWidth);
		});
	}, []);

	return (
		<ScreenSizeContext.Provider value={{ screenWidth }}>
			{children}
		</ScreenSizeContext.Provider>
	);
};

export const useScreenSize = () => useContext(ScreenSizeContext);
