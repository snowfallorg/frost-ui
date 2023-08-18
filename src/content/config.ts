import { z, defineCollection } from "astro:content";

const libCollection = defineCollection({
	type: "data",
	schema: z.object({
		location: z
			.object({
				line: z.number(),
				column: z.number(),
				file: z.string(),
			})
			.optional(),
		name: z.string(),
		path: z.array(z.string()),
		type: z.string(),
		comment: z.string().optional(),
	}),
});

export const collections = {
	lib: libCollection,
};
