'use server'
import getServerUser from "@/lib/getServerUser";
import prisma from "@/lib/prisma";

export async function createPost(eventData) {
    const user = await getServerUser();
    const userEmail = user.email;

    if (!user) {
        throw new Error('User not found');
    }

    try {
        const { title } = eventData;
        const existingUser = await prisma.user.findUnique({
            where: { email: userEmail },
        });

        if (!existingUser) {
            throw new Error('User not found');
        }

        const newPost = await prisma.post.create({
            data: {
                title,
                userId: existingUser.email
            },
        });

        return newPost;
    } catch (error) {
        console.log("Create Post Error " + error)
        throw new Error('Failed to create post.');
    }
}
