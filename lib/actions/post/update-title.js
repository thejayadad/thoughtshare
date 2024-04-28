'use server'

import getServerUser from "@/lib/getServerUser";
import prisma from "@/lib/prisma";


export async function updateTitle(eventData) {
    const user = await getServerUser();
    const userEmail = user.email;
    const { title, postId } = eventData;
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
   
    // Update the course title using prisma.course.update
    const updatedTitle = await prisma.post.update({
        where: { id: postId },
        data: {
          title,
          userId: existingUser.userEmail,
        },
      });
  
      console.log("Course title updated:", updatedTitle);
      return updateTitle
        } catch (error) {
            console.error("Error updating course title:", error);
            throw new Error('Error: ' + error.message);
        }
}