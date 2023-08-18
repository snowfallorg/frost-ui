const wrapper = {
	get(key: string, { json = true } = {}) {
		try {
			const value = globalThis.localStorage.getItem(key);

			return json && value !== null ? JSON.parse(value) : value;
		} catch (error) {
			console.error(`useLocalStorage() could not get key ${key}`, error);
			return json ? null : "";
		}
	},
	set(key: string, value: any, { json = true } = {}) {
		try {
			globalThis.localStorage.setItem(key, json ? JSON.stringify(value) : value);
		} catch (error) {
			console.error(`useLocalStorage() could not set key ${key}`, error);
		}
	},
} as const;

const fake: typeof wrapper = {
	get(key, { json = true } = {}) {
		return json ? null : "";
	},
	set(key, value, options) {},
};

export default function useLocalStorage() {
	if (globalThis.localStorage) {
		return wrapper;
	} else {
		return fake;
	}
}
