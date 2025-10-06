/**
 * Calcula o valor máximo que o usuário pode receber baseado na lógica de milhas
 * @param mileValue - Valor por milheiro em R$ (ex: 16.50)
 * @param tipoProduto - Tipo do produto selecionado
 * @param cpfDisponiveis - Quantidade de CPFs disponíveis
 * @returns Valor máximo em R$ que o usuário pode receber
 */
export function calcularRecebaAte(
    mileValue: number,
    tipoProduto: string,
    cpfDisponiveis: number | string
): number {
    // Multiplicadores por tipo de produto
    const multiplicadores = {
        'Liminar': 1000,
        'Convencional': 800,
        'Promoção': 1200,
        'Corporativo': 600,
        'Clube de Milhas': 1500,
        'Cashback': 500,
        'Parceiro': 900
    };

    // Quantidade de milhas base por tipo de produto
    const milhasBase = multiplicadores[tipoProduto as keyof typeof multiplicadores] || 1000;

    // Limitar quantidade de CPFs se for um número específico
    let cpfLimit = typeof cpfDisponiveis === 'number' ? cpfDisponiveis : 1;
    if (typeof cpfDisponiveis === 'string') {
        if (cpfDisponiveis.toLowerCase() === 'ilimitado') {
            cpfLimit = 10; // Máximo de 10 CPFs para cálculos
        } else {
            cpfLimit = parseInt(cpfDisponiveis) || 1;
        }
    }

    // Calcular valor base
    const valorBase = mileValue * milhasBase;

    // Aplicar multiplicador de CPFs (mais CPFs = mais valor)
    const multiplicadorCpf = Math.min(cpfLimit * 0.8, 5); // Máximo 5x

    // Calcular valor final
    const valorFinal = valorBase * multiplicadorCpf;

    // Aplicar variação baseada no valor do milheiro (milheiro mais alto = mais valor)
    const fatorMilheiro = mileValue / 16.50; // 16.50 é o valor médio

    const resultado = valorFinal * fatorMilheiro;
    
    // Garantir que o resultado seja um número válido
    return isNaN(resultado) || resultado <= 0 ? 0 : resultado;
}

/**
 * Formata o valor para exibição
 */
export function formatarValorRecebaAte(valor: number): string {
    return valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}
