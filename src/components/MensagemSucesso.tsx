import { useNavigate } from "react-router-dom"
import ArrowRightIcon from "./icons/ArrowRightIcon"
import successIcon from "../assets/successIcon.png"

interface PropsMensagemSucesso {
    onVoltarEtapa1?: () => void;
}

export default function MensagemSucesso({ onVoltarEtapa1 }: PropsMensagemSucesso) {
    const navigate = useNavigate()
    return (
        <div className="w-full lg:w-[928px] h-[85vh] lg:h-[443px] lg:justify-center overflow-hidden flex flex-col items-center bg-white rounded-2 shadow-md">
            <div className="flex-1 lg:flex-none w-full flex flex-col items-center justify-center gap-4 p-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <img src={successIcon} alt="success" className="w-[60px] h-[61px]" />
                </div>

                <h2 className="text-[#1E90FF] font-dmsans font-medium text-[20px] leading-7 text-center max-w-[276px] lg:max-w-[357px]">
                    Ordem de venda criada com sucesso!
                </h2>

                <p className="text-[#2E3D50] font-dmsans font-medium text-[14px] leading-5 lg:leading-7 text-center max-w-[276px] lg:max-w-[444px]">
                    Agora é só aguardar — assim que suas milhas forem vendidas, o valor será transferido direto para sua conta via Pix.
                </p>
            </div>

            {/* Botões - fixados ao final no mobile, centralizados no desktop */}
            <div className="w-full lg:w-fit h-[72px] lg:h-auto px-4 lg:px-0 border-t border-[#E2E2E2] lg:border-0 flex flex-row items-center justify-between gap-4">
                <button
                    onClick={() => onVoltarEtapa1 ? onVoltarEtapa1() : navigate("/")}
                    className="lg:hidden flex items-center justify-center w-fit lg:w-[120px] h-[48px] rounded-[44px] bg-white border border-gray-300 text-gray-700 font-medium text-[16px] py-[10px] px-6 hover:bg-gray-50 transition-colors"
                >
                    Sair
                </button>

                <button
                    onClick={() => navigate("/lista-ofertas")}
                    className="flex items-center justify-center w-fit lg:w-[196px] h-[40px] rounded-[44px] bg-[#1E90FF] text-white font-medium text-[16px] py-[10px] px-6 gap-2 hover:bg-blue-700 transition-colors"
                >
                    <span className="font-dmsans font-medium text-[14px] leading-5 text-white text-center w-[124px]">Ver minhas ofertas</span>
                    <ArrowRightIcon />
                </button>
            </div>
        </div>
    )
}
