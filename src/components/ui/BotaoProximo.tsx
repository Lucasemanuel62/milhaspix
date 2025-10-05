export default function BotaoProximo({ onNext }: { onNext: () => void }) {
    return (
        <button
            onClick={onNext}
            className="flex items-center w-fit min-w-[142px] h-[40px] rounded-[44px] bg-[#1E90FF] py-[10px] px-6 gap-2"
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