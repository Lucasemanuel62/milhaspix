export default function BotaoProximo({ onNext, disabled = false }: { onNext: () => void; disabled?: boolean }) {
    return (
        <button
            onClick={onNext}
            disabled={disabled}
            className={`flex items-center w-fit min-w-[142px] h-[40px] rounded-[44px] py-[10px] px-6 gap-2 ${disabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#1E90FF] hover:bg-blue-600'
                }`}
        >
            <span className="w-[70px] h-[20px] font-dmsans font-medium text-[14px] leading-[20px] text-center text-[#FFFFFF]">
                Prosseguir
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4L10 8L6 12" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    )
}