export function stripStorePath(path: string) {
	return path.replace(/\/nix\/store\/[\d\w]{32}\-[^\/]+/, "");
}
