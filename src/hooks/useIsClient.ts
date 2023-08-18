export default function useIsClient() {
	return typeof window !== "undefined";
}
