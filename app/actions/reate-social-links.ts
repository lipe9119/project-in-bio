"use server";

import { Timestamp } from "firebase-admin/firestore";
import { auth } from "../lib/auth";
import { db } from "../lib/firebase";

export async function createSocialLinks({
  profileId,
  github,
  instagram,
  linkedin,
  twitter,
}: {
  profileId: string;
  github: string;
  instagram: string;
  linkedin: string;
  twitter: string;
}) {
  const session = auth();

  if (!session) return;

  try {
    await db.collection("profiles").doc(profileId).update({
      socialMedias: {
        github,
        instagram,
        linkedin,
        twitter,
      },
      updatedAt: Timestamp.now().toMillis(),
    });

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
}
