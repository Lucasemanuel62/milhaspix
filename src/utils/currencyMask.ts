// Função para formatar valor como moeda brasileira
export const formatCurrency = (value: string): string => {
    // Remove tudo que não é dígito
    const numericValue = value.replace(/\D/g, '');
    
    // Se não há valor, retorna string vazia
    if (!numericValue) return '';
    
    // Converte para número e divide por 100 para ter centavos
    const amount = parseInt(numericValue) / 100;
    
    // Formata como moeda brasileira
    return amount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

// Função para extrair valor numérico da string formatada
export const parseCurrencyValue = (formattedValue: string): number => {
    const numericValue = formattedValue.replace(/\D/g, '');
    return parseInt(numericValue) / 100;
};

// Função para aplicar máscara em tempo real
export const applyCurrencyMask = (value: string): string => {
    return formatCurrency(value);
};
