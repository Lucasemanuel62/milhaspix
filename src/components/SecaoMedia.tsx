import { useState } from "react";

interface PropsSecaoMedia {
    etapa: number;
}

export default function SecaoMedia({ etapa }: PropsSecaoMedia) {
    const [toggleAtivo, setToggleAtivo] = useState(false);
    // Só aparece na segunda etapa
    if (etapa !== 2) {
        return null;
    }

    return (
        <div className="w-full lg:w-[608px] p-0 lg:p-3 flex flex-col gap-3">
            <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={toggleAtivo}
                        onChange={(e) => setToggleAtivo(e.target.checked)}
                    />
                    <div className={`relative shrink-0 w-[44px] h-[24px] peer-focus:outline-none rounded-[9999px] peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E2E2E2] after:border after:rounded-[9999px] after:h-[20px] after:w-[20px] after:transition-all ${toggleAtivo ? 'bg-primary-02' : 'bg-[#E2E2E2]'}`}></div>
                    <span className={`ml-3 font-dmsans font-medium text-[16px] leading-[130%] text-[#2E3D50] transition-opacity ${toggleAtivo ? 'opacity-100' : 'opacity-50'}`}>
                        Definir média de milhas por passageiro
                    </span>
                </label>
            </div>

            {toggleAtivo && (
                <div className="flex flex-col lg:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="10.000"
                        className="w-full lg:w-[298px] h-[44px] rounded-[44px] border border-[#E2E2E2] py-[10px] px-[16px] font-dmsans text-[14px] text-[#2E3D50]"
                    />
                    <div className="bg-green-100 rounded-[44px] p-3 flex-1">
                        <span className="text-green-700 text-sm">
                            Melhor média para a sua oferta: <span className="font-semibold">27.800</span>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
