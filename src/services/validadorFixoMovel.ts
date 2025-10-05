export const validaTelefone = (value: number | null) => {
    const onlyNumbers = String(value ?? "").replace(/\D/g, "");
  
    // só valida se tiver algum número digitado
    if (onlyNumbers.length === 0) return true;
  
    // valida se possui exatamente 10 (DDD + número)
    if (onlyNumbers.length < 10) {
      return "Digite um telefone válido com DDD";
    }
  
    return true;
  };

  export const validaCelular = (value: number | null) => {
    const onlyNumbers = String(value ?? "").replace(/\D/g, "");
  
    // só valida se tiver algum número digitado
    if (onlyNumbers.length === 0) return true;
  
    // valida se possui exatamente 11 números (DDD + número)
    if (onlyNumbers.length < 11 ) {
      return "Digite um Celular válido com DDD";
    }
  
    return true;
  };

  
  