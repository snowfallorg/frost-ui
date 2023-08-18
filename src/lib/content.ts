import { getCollection } from "astro:content";

type KnownCollection = "apps" | "lib" | "meta" | "options" | "packages" | "overlays" | "shells";

export const safeGetCollection = async (
	name: KnownCollection,
	filter?: (item: any) => boolean
): Promise<Array<any>> => {
	try {
		// @ts-expect-error
		const collection = await getCollection(name, filter);
		return collection;
	} catch (error) {
		return [];
	}
};
