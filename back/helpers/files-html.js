const errorVerificar = () => {
    return `<div style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
                <h3 style="border-bottom: 0.3rem solid #ffe54c;; color:#ffa8ba; padding-bottom: 1rem; width:fit-content;">
                    Error de verificación de cuenta
                </h3>
                <p>Inténtelo de nuevo más tarde.</p>
            </div>`;
}

const exitoVerificar = () => {
    return `<div style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
                <h3 style="border-bottom: 0.3rem solid #ffe54c;; color:#72E6F5; padding-bottom: 1rem; width:fit-content;">
                    Cuenta verificada con éxito
                </h3>
                <p>Ya puedes iniciar sesión con tu cuenta.</p>
            </div>`;
}

module.exports = {
    errorVerificar,
    exitoVerificar
}