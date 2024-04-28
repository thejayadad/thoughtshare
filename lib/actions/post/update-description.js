'use server'
import getServerUser from "@/lib/getServerUser";
import prisma from "@/lib/prisma";

export async function updateDescription(eventData) {
    const user = await getServerUser();
    const { description, postId } = eventData;
    try {
            // Update the post description using prisma.course.update
    const updatedDescription = await prisma.post.update({
        where: { id: postId },
        data: {
          description,
        },
      });
  
      console.log("Course description updated:", updatedDescription);
    } catch (error) {
        console.error("Error updating course title:", error);
        throw new Error('Error: ' + error.message);   
    }
}