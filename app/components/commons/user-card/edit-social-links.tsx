"use client";

import { createSocialLinks } from "@/app/actions/reate-social-links";
import { Github, Instagram, Linkedin, Plus, Twitter } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import Button from "../../ui/button";
import Modal from "../../ui/modal";
import TextInput from "../../ui/text-input";

export function EditSocialLinks({
  socialMedias,
}: {
  socialMedias?: {
    github?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavingSocialLinks, setIsSavingSocialLinks] = useState(false);

  const router = useRouter();

  const { profileId } = useParams();

  const [github, setGithub] = useState(socialMedias?.github || "");
  const [instagram, setInstagram] = useState(socialMedias?.instagram || "");
  const [linkedin, setLinkedin] = useState(socialMedias?.linkedin || "");
  const [twitter, setTwitter] = useState(socialMedias?.twitter || "");

  async function handleAddSocialLinks() {
    setIsSavingSocialLinks(true);

    if (!profileId) return;

    await createSocialLinks({
      profileId: profileId as string,
      github,
      instagram,
      linkedin,
      twitter,
    });

    startTransition(() => {
      setIsModalOpen(false);
      setIsSavingSocialLinks(false);
      router.refresh();
    });
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]"
      >
        <Plus />
      </button>

      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]">
          <p className="text-white font-bold text-xl">Adicionar redes sociais</p>

          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-2 w-full">
              <Github />
              <TextInput
                type="text"
                placeholder="Link Github"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 w-full">
              <Instagram />
              <TextInput
                type="text"
                placeholder="Link Instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 w-full">
              <Linkedin />
              <TextInput
                type="text"
                placeholder="Link LinkedIn"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 w-full">
              <Twitter />
              <TextInput
                type="text"
                placeholder="Link Twitter"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <button className="font-bold text-white" onClick={() => setIsModalOpen(false)}>
              Voltar
            </button>

            <Button onClick={handleAddSocialLinks} disabled={isSavingSocialLinks}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
