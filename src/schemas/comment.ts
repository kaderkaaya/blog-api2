import { z } from "zod";

export const createComment = z.object({
    userId: z.string(),
    comment: z.string(),
    blogId: z.string(),
});

export const updateCommentStatus = z.object({
    commentId: z.string(),
    blogId: z.string(),
    userId: z.string(),
});

export const updateComment = z.object({
    userId: z.string(),
    commentId: z.string(),
    comment: z.string(),
});

export const getComments = z.object({
    userId: z.string(),
    blogId: z.string(),
});

export const getCommentWithBlog = z.object({
    commentId: z.string(),
    blogId: z.string(),
});


export default {
    createComment,
    updateComment,
    getCommentWithBlog,
    getComments,
    updateCommentStatus
}