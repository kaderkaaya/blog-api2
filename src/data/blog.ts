import { BlogModel } from "../models/blog.js";
import mongoose, { Types } from "mongoose";

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
            { isPublished },
            { new: true }
        );
        return blog;
    };

    static async unpublishBlog(authorId: string, blogId: string, isPublished: boolean) {
        const blog = await BlogModel.findOneAndUpdate(
            {
                _id: blogId,
                authorId
            },
            { isPublished },
            { new: true }
        );
        return blog;
    };
    static async updateBlog(blogId: string, title?: string, content?: string, isDraft?: boolean, isPublished?: boolean) {
        const blogObjectId = new mongoose.Types.ObjectId(blogId);
        const updateFields: Partial<{
            title: string,
            content: string,
            isDraft: boolean,
            isPublished: boolean
        }> = {};
        if (title !== undefined) {
            updateFields.title = title;
        }
        if (content !== undefined) {
            updateFields.content = content;
        }
        if (isDraft !== undefined) {
            updateFields.isDraft = isDraft;
        }
        if (isPublished !== undefined) {
            updateFields.isPublished = isPublished;
        }
        const blog = await BlogModel.findByIdAndUpdate(
            { _id: blogObjectId },
            updateFields,
            { new: true }
        );

        return blog;
    };

    static async getBlog(blogId: string) {
        const blogObjectId = new mongoose.Types.ObjectId(blogId);
        const blog = await BlogModel.findById({
            _id: blogObjectId
        });
        return blog;
    };

    static async addTags(authorId: string, blogId: string, tags: any) {
        const blogObjectId = new mongoose.Types.ObjectId(blogId);
        const blog = await BlogModel.findOneAndUpdate(
            {
                _id: blogObjectId,
                authorId
            },
            { tags },
            { new: true }
        );
        return blog;
    };

    static async uploadBlogImage(authorId: string, blogId: string, imagePath: string) {
        const blog = await BlogModel.findOneAndUpdate(
            {
                _id: blogId,
                authorId
            },
            { $set: { imageUrl: imagePath } },
            { new: true }
        );
        return blog
    };

    static async getBlogs() {
        const blogs = await BlogModel.find()
        return blogs;
    };

    static async getUserWithBlog(blogId: string) {
        const blogWithUser = await BlogModel.aggregate([
            {
                $match: { _id: new Types.ObjectId(blogId) }
            },
            {
                $lookup: {
                    from: "users",
                    let: { authorObjId: { $toObjectId: "$authorId" } },
                    pipeline: [
                        {
                            $match:
                                { $expr: { $eq: ["$_id", "$$authorObjId"] } }
                        },
                    ],
                    as: "owner"
                }
            },
            {
                $unwind: "$owner"
            }
        ]);
        return blogWithUser
    }
}
export default BlogData;