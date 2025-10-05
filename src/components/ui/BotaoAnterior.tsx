export default function BotaoAnterior({ onPrevious }: { onPrevious: () => void }) {
    return (
        <button
            onClick={onPrevious}
            className="flex items-center w-fit h-[40px] rounded-[44px] border border-pb-03 py-[10px] px-6 gap-2"
        >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L6 8L10 4" stroke="#2E3D50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden lg:inline w-[40px] h-[20px] font-dmsans font-medium text-[14px] leading-[20px] text-center text-[#2E3D50]">Voltar</span>
        </button>
    )
}