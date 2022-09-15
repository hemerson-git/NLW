import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

export function CreateAdBanner() {
  return (
    <section className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8">
      <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
        <div>
          <strong className="text-2xl text-white font-black">
            Não encontrou o seu duo?
          </strong>

          <span className="text-zinc-400 block">
            Plublique um anúncio para encontrar novos players!
          </span>
        </div>

        <Dialog.Trigger
          type="button"
          className="py-3 px-4 bg-violet-500 text-white rounded flex items-center gap-2 hover:bg-violet-600 transition-colors"
        >
          <MagnifyingGlassPlus size={24} />
          Publicar Anúncio
        </Dialog.Trigger>
      </div>
    </section>
  );
}
