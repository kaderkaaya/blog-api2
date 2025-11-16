import {z} from "zod";

export const createBlog = z.object({
    authorId: z.string(),
    title: z.string(),
    content: z.string(),
    isDraft: z.boolean(),
    tags: z.array(z.string()).min(1).max(10), 
});
export const publishBlog = z.object({
    authorId: z.string(),
    blogId: z.string(),
    isPublished: z.boolean(),
});
export const updateBlog = z.object({
    blogId:z.string(),
    authorId: z.string(),
    title: z.string(),
    content: z.string(),
    isDraft: z.boolean(),
     isPublished: z.boolean(),
});
export const addTags = z.object({
    authorId: z.string(),
    blogId:z.string(),
    tags: z.array(z.string()).min(1).max(10), 
});
export const uploadBlogImage = z.object({
    authorId: z.string(),
    blogId:z.string(),
    imageUrl: z.string(),
});


export default {
    createBlog,
    publishBlog,
    updateBlog,
    addTags,
    uploadBlogImage
}