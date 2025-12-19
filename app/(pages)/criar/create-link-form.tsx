"use client";

import createLink from "@/app/actions/create-link";
import verifyLink from "@/app/actions/verify-link";
import Button from "@/app/components/ui/button";
import TextInput from "@/app/components/ui/text-input";
import { sanitizeLink } from "@/app/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function CreateLinkForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [link, setLink] = useState(sanitizeLink(searchParams.get("link") ?? "") || "");
  const [error, setError] = useState("");

  function handleLinkchange(e: ChangeEvent<HTMLInputElement>) {
    setLink(sanitizeLink(e.target.value));
    setError("");
  }

  async function handleSumit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (link.length === 0) return setError("Escolha um link");

    const isLinkTaken = await verifyLink(link);
    if (isLinkTaken) return setError("Desculpe, esse link já está em uso");

    const isLinkCreated = await createLink(link);

    if (!isLinkCreated) return setError("Erro ao criar o perfim. Tente Novamente");

    router.push(`/${link}`);
  }

  return (
    <>
      <form onSubmit={handleSumit} className="w-full flex items-center gap-2">
        <span className="text-white">projetcinbio.com/</span>
        <TextInput value={link} onChange={handleLinkchange} />
        <Button className="w-[126px]" disabled={link.length === 0}>
          Criar
        </Button>
      </form>

      <div>
        <span className="text-accent-pink">{error}</span>
      </div>
    </>
  );
}
