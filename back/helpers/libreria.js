const generarCodigo = () => {
    let codigo = ''
    const chars = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let cont = 0

    while(cont < 7){;
        
        codigo += chars.charAt(Math.trunc(Math.random() * chars.length));
        cont = cont + 1;

    } 
    return codigo;   
}

module.exports = {
    generarCodigo
}