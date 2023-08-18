export enum FlakeProtocol {
	Path = "path",
	GitHub = "github",
}

export function flakeUriToLink(uri: string, path?: string): string {
	const [protocol, ...rest] = uri.split(":");
	const target = rest.join(":");

	const normalizedPath = path && path.startsWith("/") ? path.substring(1) : path;

	switch (protocol) {
		default:
			throw new Error(`Unknown protocol "${protocol}" in flake uri "${uri}".`);
		case FlakeProtocol.Path: {
			const base = `file://${target}`;

			if (normalizedPath) {
				return `${base}/${normalizedPath}`;
			} else {
				return base;
			}
		}
		case FlakeProtocol.GitHub: {
			const [owner, repo, ...refParts] = target.split("/");

			const base = `https://github.com/${owner}/${repo}`;
			const ref = refParts.join("/") || "main";

			if (normalizedPath) {
				return `${base}/blob/${ref}/${normalizedPath}`;
			} else {
				return `${base}/tree/${ref}`;
			}
		}
	}
}
