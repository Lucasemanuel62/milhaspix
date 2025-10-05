import { instructions } from "../data/instructions"

export default function Instrucoes({ etapaAtual }: { etapaAtual: number }) {

    // Mostrar instrução baseada no passo atual (1-3)
    const currentInstruction = instructions[etapaAtual - 1] || instructions[0]
    // Não mostrar instrução na etapa 4
    if (etapaAtual === 4) {
        return null
    }

    return (
        <div className="w-full lg:w-[248px] h-fit min-h-[110px] flex flex-col rounded-[8px] border border-pb-03 gap-3 p-2 lg:mt-0 mt-4">
            <div className="w-full lg:w-[224px] h-[86px] flex flex-col gap-2">
                <h4 className="w-full lg:w-[182px] h-[21px] font-dmsans font-medium text-[16px] leading-[130%] text-[#2E3D50]">{currentInstruction.title}</h4>
                <span className="w-full lg:w-[224px] h-[57px] font-dmsans font-normal text-[12px] leading-[160%] text-[#475569]">{currentInstruction.description}</span>
            </div>
        </div>
    )
}