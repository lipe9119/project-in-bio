"server-only";

import { Link } from "../actions/add-custom-links";
import { db } from "../lib/firebase";

export type ProfileData = {
  userId: string;
  name: string;
  description: string;
  imagePath: string;
  totalVisits: number;
  socialMedias?: {
    github?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  link1?: Link;
  link2?: Link;
  link3?: Link;
  createdAt: string;
};

export type ProjectData = {
  id: string;
  userId: string;
  name: string;
  description: string;
  imagePath: string;
  url: string;
  createdAt: string;
  totalVisits?: number;
};

export async function getProfileData(profileId: string) {
  const snapshot = await db.collection("profiles").doc(profileId).get();

  const data = snapshot.data() as ProfileData;

  return data;
}

export async function getProfileProjects(profileId: string) {
  const snapshot = await db.collection("profiles").doc(profileId).collection("projects").get();

  return snapshot.docs.map((doc) => doc.data()) as ProjectData[];
}

export async function getProfileId(userId?: string) {
  if (!userId) return null;
  const snapshot = await db.collection("profiles").where("userId", "==", userId).get();

  return snapshot.docs.map((doc) => doc.id)[0] ?? null;
}
