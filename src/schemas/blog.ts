import {z} from "zod";

export const createBlog = z.object({
    authorId: z.string(),
    title: z.string(),
    content: z.string(),
    isDraft: z.boolean(),
    tags: z.array(z.string()).min(1).max(10), 
    isPublished: z.boolean(),
});


export default {
    createBlog,
}