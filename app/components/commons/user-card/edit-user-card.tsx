"use client";

import { saveProfile } from "@/app/actions/save-profile";
import { compressFiles, handleImageInput, triggerImageInput } from "@/app/lib/utils";
import { ProfileData } from "@/app/server/get-profile-data";
import { ArrowUpFromLine, UserPen } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import Button from "../../ui/button";
import Modal from "../../ui/modal";
import TextArea from "../../ui/text-area";
import TextInput from "../../ui/text-input";

export default function EditUserCard({ profileData }: { profileData?: ProfileData }) {
  const router = useRouter();
  const { profileId } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [name, setName] = useState(profileData?.name || "");
  const [description, setDescription] = useState(profileData?.description || "");

  async function handleSaveProfile() {
    setIsSavingProfile(true);

    if (!profileId) return;

    const imagesInput = document.getElementById("profile-pic-input") as HTMLInputElement;

    if (!imagesInput.files) return;

    const compressedFile = await compressFiles(Array.from(imagesInput.files));

    const formData = new FormData();
    formData.append("profileId", profileId as string);
    formData.append("profilePic", compressedFile[0]);
    formData.append("name", name);
    formData.append("description", description);

    await saveProfile(formData);

    startTransition(() => {
      setIsOpen(false);
      setIsSavingProfile(false);
      router.refresh();
    });
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <UserPen />
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10">
          <p className="text-white font-bold text-xl">Editar perfil</p>

          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile Picture"
                    className="object-cover object-center"
                  />
                ) : (
                  <button
                    className="w-full h-full"
                    onClick={() => triggerImageInput("profile-pic-input")}
                  >
                    100x100
                  </button>
                )}
              </div>

              <button
                className="text-white flex items-center gap-2"
                onClick={() => triggerImageInput("profile-pic-input")}
              >
                <ArrowUpFromLine className="size-4" />
                <span>Adicionar fotos</span>
              </button>
              <input
                type="file"
                className="hidden"
                accept="images/*"
                id="profile-pic-input"
                onChange={(e) => setProfilePic(handleImageInput(e))}
              />
            </div>

            <div className="flex flex-col gap-4 w-[293px]">
              <div className="flex flex-col gap-1">
                <label htmlFor="your-name" className="text-white font-bold">
                  Seu nome
                </label>
                <TextInput
                  id="your-name"
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="your-description" className="text-white font-bold">
                  Descrição
                </label>
                <TextArea
                  id="your-description"
                  placeholder="Fale um pouco sobre você"
                  className="h-36"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button className="font-bold text-white" onClick={() => setIsOpen(false)}>
              Voltar
            </button>
            <Button onClick={handleSaveProfile} disabled={isSavingProfile}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
