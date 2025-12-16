"use server";

import { Timestamp } from "firebase-admin/firestore";
import { randomUUID } from "node:crypto";
import { auth } from "../lib/auth";
import { db, storage } from "../lib/firebase";

export async function createProject(formData: FormData) {
  const session = await auth();

  if (!session) return;

  const file = formData.get("file") as File;
  const profileId = formData.get("profileId") as string;
  const projectName = formData.get("projectName") as string;
  const projectDescription = formData.get("projectDescription") as string;
  const projectUrl = formData.get("projectUrl") as string;

  const generateId = randomUUID();

  const storageRef = storage.file(`projects-images/${profileId}/${generateId}`);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await storageRef.save(buffer, {
    metadata: {
      contentType: file.type,
    },
  });

  const imagePath = storageRef.name;

  try {
    await db.collection("profiles").doc(profileId).collection("projects").doc(generateId).set({
      id: generateId,
      userId: session.user?.id,
      name: projectName,
      description: projectDescription,
      url: projectUrl,
      imagePath,
      createdAt: Timestamp.now().toMillis(),
    });

    return true;
  } catch (error) {
    console.error("Error creating project:", error);
    return false;
  }
}
