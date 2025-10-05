import logo from '../assets/ativo-21-horizontal-logo.png'
import BalanceButton from './ui/BotaoSaldo'

export default function Cabecalho() {
    return (
        <header className="bg-primary-02 w-full h-[60px] flex justify-center border-b flex py-3 px-8">
            <nav className="max-w-[1216px] w-full flex justify-between">
                <img
                    src={logo}
                    alt="MilhasPix Logo"
                    className="w-[128px] h-[32px]"
                />
                <BalanceButton />
            </nav>
        </header>
    )
}