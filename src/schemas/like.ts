import { z } from "zod";

export const likeBlog = z.object({
    userId: z.string(),
    blogId: z.string(),
});

export const unlikeBlog = z.object({
   userId: z.string(),
   blogId: z.string(),
   likeId: z.string(),
});



export default {
    likeBlog,
    unlikeBlog,
}