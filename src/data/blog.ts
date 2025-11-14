import { BlogModel } from "../models/blog.js";

class BlogData {
    static async createBlog(authorId: string, title: string, content: string, isDraft: boolean, tags: any, isPublished: boolean) {
        const blog = await BlogModel.create({
            authorId,
            title,
            content,
            isDraft,
            tags,
            isPublished
        });
        return blog;
    }

}
export default BlogData;