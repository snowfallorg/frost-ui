import { createContext } from "react";
import useIsClient from "./useIsClient";
import useLocalStorage from "./useLocalStorage";

export const APP_THEME_KEY = "app/theme";
export enum AppTheme {
	Light = "light",
	Dark = "dark",
}

export default function useIsDarkTheme() {
	const isClient = useIsClient();
	const storage = useLocalStorage();

	if (!isClient) {
		return false;
	}
}
