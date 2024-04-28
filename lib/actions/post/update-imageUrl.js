'use server'
import getServerUser from "@/lib/getServerUser";
import prisma from "@/lib/prisma";


export async function updateImage(eventData) {
  const user = await getServerUser();
  const userEmail = user.email;
  const { imageUrl, postId } = eventData;

  if (!user) {
    throw new Error('User not found');
  }

  try {
    // Fetch user by email to get the correct userId
    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    // Update the post title using prisma.post.update
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        imageUrl,
        userId: existingUser.userEmail,
      },
    });

    console.log("Post Image updated:", updatedPost);
    return updatedPost
  } catch (error) {
    console.error("Error updating post image:", error);
    throw new Error('Error: ' + error.message);
  }


}
