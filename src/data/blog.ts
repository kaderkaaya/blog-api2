import { BlogModel } from "../models/blog.js";

class BlogData {
    static async createBlog(authorId: string, title: string, content: string, isDraft: boolean, tags: any) {
        const blog = await BlogModel.create({
            authorId,
            title,
            content,
            isDraft,
            tags,
        });

        return blog;
    };
    static async publishBlog(authorId: string, blogId: string, isPublished: boolean) {
        const blog = await BlogModel.findOneAndUpdate(
            {
                _id: blogId,
                authorId
            },
            {
                $set: { isPublished: true }
            }
        );
        return blog;
    };
    static async updateBlog(authorId: string, blogId: string, title: string, content: string, isDraft: boolean, isPublished: boolean) {
        const updateData: Partial<{
            title: any,
            content: any,
            isDraft: any,
            isPublished: any
        }> = {};
        if (title) {
            updateData.title = title;
        }
        if (content) {
            updateData.content = content;
        }
        if (isDraft) {
            updateData.isDraft = isDraft;
        }
        if (isPublished) {
            updateData.isPublished = isPublished;
        }
        const blog = await BlogModel.findByIdAndUpdate(
            { _id: blogId },
            updateData,
            { upsert: true },

        );
        return blog;
    };


}
export default BlogData;