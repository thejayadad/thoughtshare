'use server'
import getServerUser from "@/lib/getServerUser";
import prisma from "@/lib/prisma";

export async function updateCategory(eventData) {
    const user = await getServerUser();
    const userEmail = user.email;
    const { categoryId, postId } = eventData;
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
    const updatedCategory = await prisma.post.update({
        where: { id: postId },
        data: {
          categoryId,
          userId: existingUser.userEmail,
        },
      });
      
      console.log("post title updated:", updatedCategory);
      return updatedCategory
      } catch (error) {
            console.error("Error updating post category:", error);
            throw new Error('Error: ' + error.message);
      }
}