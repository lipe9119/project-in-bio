import { TRAIL_DAYS } from "@/app/lib/config";
import Button from "../ui/button";

export default function Pricing() {
  return (
    <div className="my-[150px] flex flex-col items-center gap-14">
      <div className="flex flex-col items-center gap-6">
        <h3 className="text-4xl font-bold text-white">Um valor acessivel para todos</h3>
        <p className="text-content-body text-xl text-center">
          Junte-se a comunidade de criadores profissionais que já estão elevando sua
          <br />
          presença online. teste gratuitamente por{" "}
          <strong className="text-accent-pink">{TRAIL_DAYS} dias</strong>, sem compromisso!
        </p>
      </div>

      <div className="flex items-end gap-9">
        <div className="w-[304px] p-8 flex flex-col gap-7 rounded-2xl border border-[#1e1e1e]">
          <div className="flex flex-col">
            <span className="text-white font-bold text-2xl">Mensal</span>
            <span className="text-content-body">Apenas</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-[48px]">R$ 9,90</span>
            <span className="text-content-headline text-2xl">/mês</span>
          </div>

          <Button variant="secundary">Assinar</Button>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-center items-center rounded-t-2xl w-[304px] bg-[linear-gradient(90deg,#4b2dbb_0%,#b5446b_100%)]">
            <span className="uppercase text-xs font-bold p-2">Recomendado</span>
          </div>

          <div className="p-[1.6px] bg-[linear-gradient(90deg,#4b2dbb_0%,#b5446b_100%)] rounded-b-2xl">
            <div className="w-full bg-background-secondary p-8 flex flex-col gap-7 rounded-b-2xl">
              <div className="flex flex-col">
                <span className="text-white font-bold text-2xl">Vitalicio</span>
                <span className="text-content-body">Economize com</span>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-white font-bold text-[48px]">R$ 99,90</span>
              </div>

              <Button>Assinar</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
