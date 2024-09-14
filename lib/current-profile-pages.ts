
import { db } from "./db";
import { redirect } from "next/navigation";
import { NextApiRequest } from "next";
import { getAuth } from "@clerk/nextjs/server";

export const currentProfilePages = async (req: NextApiRequest) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });

  if (!profile) {
    redirect('/')
  }

  return profile;
};
