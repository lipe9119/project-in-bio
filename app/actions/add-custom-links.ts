"use server";

import { auth } from "../lib/auth";
import { db } from "../lib/firebase";

export type Link = {
  title: string;
  url: string;
};

export async function addCustomLink(
  links: { link1: Link; link2: Link; link3: Link },
  profileId: string
) {
  const session = await auth();

  if (!session) return false;

  try {
    await db.collection("profiles").doc(profileId).update({
      link1: links.link1,
      link2: links.link2,
      link3: links.link3,
    });
  } catch (error) {}
}
