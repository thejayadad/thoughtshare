'use server'

import { authOptions } from "./auth";

const { getServerSession } = require("next-auth")

const getServerUser = async () => {
  const session = await getServerSession(authOptions);

  return session?.user;
} 

export default getServerUser;