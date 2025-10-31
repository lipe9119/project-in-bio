"use server";

import { Timestamp } from "firebase-admin/firestore";
import { randomUUID } from "node:crypto";
import { auth } from "../lib/auth";
import { db, storage } from "../lib/firebase";

export async function saveProfile(formData: FormData) {
  const session = await auth();

  if (!session) return false;

  try {
    const profileId = formData.get("profileId") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const file = formData.get("profilePic") as File;

    let imagePath = null;

    const hasFile = file && file.size > 0;

    if (hasFile) {
      const currentProfile = await db.collection("profiles").doc(profileId).get();
      const currentImagePath = currentProfile.data()?.imagePath;

      if (currentImagePath) {
        const currentStorageRef = storage.file(currentImagePath);
        const [exists] = await currentStorageRef.exists();

        if (exists) await currentStorageRef.delete();
      }

      const storageref = storage.file(`profiles-images/${profileId}/${randomUUID()}`);
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await storageref.save(buffer);

      imagePath = storageref.name;
    }

    await db
      .collection("profiles")
      .doc(profileId)
      .update({
        name,
        description,
        ...(hasFile && { imagePath }),
        updatedAt: Timestamp.now().toMillis(),
      });

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
}
