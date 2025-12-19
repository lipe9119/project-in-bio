"use client";

import { addCustomLink, Link } from "@/app/actions/add-custom-links";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import Button from "../../ui/button";
import Modal from "../../ui/modal";
import TextInput from "../../ui/text-input";

interface AddCustomLinkProps {
  customLink1?: Link;
  customLink2?: Link;
  customLink3?: Link;
}

export function AddCustomLink({ customLink1, customLink2, customLink3 }: AddCustomLinkProps) {
  const router = useRouter();
  const { profileId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isSavingCustomLinks, setIsSavingCustomLinks] = useState(false);

  const [link1, setLink1] = useState(
    customLink1 || {
      title: "",
      url: "",
    }
  );
  const [link2, setLink2] = useState(
    customLink2 || {
      title: "",
      url: "",
    }
  );
  const [link3, setLink3] = useState(
    customLink3 || {
      title: "",
      url: "",
    }
  );

  async function handleSaveCustomLinks() {
    setIsSavingCustomLinks(true);

    if (!profileId) return;

    await addCustomLink(
      {
        link1,
        link2,
        link3,
      },
      profileId as string
    );

    startTransition(() => {
      setIsOpen(false);
      setIsSavingCustomLinks(false);
      router.refresh();
    });
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-3 rounded-xl bg-[#1e1e1e] hover:bg-[#2e2e2e]"
      >
        <Plus />
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]">
          <p className="text-white font-bold text-xl">Adicionar link customizado</p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex flex-col w-full">
                <p>Título do link</p>
                <TextInput
                  placeholder="Digite o título"
                  value={link1.title}
                  onChange={(e) => setLink1({ ...link1, title: e.target.value })}
                />
              </div>

              <div className="flex flex-col w-full">
                <p className="font-bold">Link</p>
                <TextInput
                  placeholder="Inserir url"
                  value={link1.url}
                  onChange={(e) => setLink1({ ...link1, url: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col w-full">
                <p>Título do link</p>
                <TextInput
                  placeholder="Digite o título"
                  value={link2.title}
                  onChange={(e) => setLink2({ ...link2, title: e.target.value })}
                />
              </div>

              <div className="flex flex-col w-full">
                <p className="font-bold">Link</p>
                <TextInput
                  placeholder="Inserir url"
                  value={link2.url}
                  onChange={(e) => setLink2({ ...link2, url: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col w-full">
                <p>Título do link</p>
                <TextInput
                  placeholder="Digite o título"
                  value={link3.title}
                  onChange={(e) => setLink3({ ...link3, title: e.target.value })}
                />
              </div>

              <div className="flex flex-col w-full">
                <p className="font-bold">Link</p>
                <TextInput
                  placeholder="Inserir url"
                  value={link3.url}
                  onChange={(e) => setLink3({ ...link3, url: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <button className="font-bold text-white" onClick={() => setIsOpen(false)}>
              Voltar
            </button>
            <Button onClick={handleSaveCustomLinks} disabled={isSavingCustomLinks}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
