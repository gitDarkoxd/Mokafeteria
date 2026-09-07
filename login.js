document.addEventListener('DOMContentLoaded', () => {
  const formLogin = document.getElementById('formLogin');
  const formRegister = document.getElementById('formRegister');

  // Reglas de validación
  // 1. Correo con formato válido (ej. usuario@dominio.cl)
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // 2. Contraseña: 8 a 20 caracteres, al menos una mayúscula y un número
  const regexPassword = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&._-]{8,20}$/;

  
  // Valida un campo de correo y actualiza clases de Bootstrap
  
  function validarCorreo(inputElement) {
    const valor = inputElement.value.trim();
    if (!regexEmail.test(valor)) {
      inputElement.classList.add('is-invalid');
      inputElement.classList.remove('is-valid');
      return false;
    } else {
      inputElement.classList.remove('is-invalid');
      inputElement.classList.add('is-valid');
      return true;
    }
  }

  
   // Valida un campo de contraseña y actualiza clases de Bootstrap
  
  function validarPassword(inputElement) {
    const valor = inputElement.value;
    if (!regexPassword.test(valor)) {
      inputElement.classList.add('is-invalid');
      inputElement.classList.remove('is-valid');
      return false;
    } else {
      inputElement.classList.remove('is-invalid');
      inputElement.classList.add('is-valid');
      return true;
    }
  }

  // Comportamiento en tiempo real para Inicio de Sesión
  const loginEmail = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');

  loginEmail.addEventListener('input', () => validarCorreo(loginEmail));
  loginPassword.addEventListener('input', () => validarPassword(loginPassword));

  // Envío del Formulario de Inicio de Sesión
  formLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const emailValido = validarCorreo(loginEmail);
    const passValido = validarPassword(loginPassword);

    if (emailValido && passValido) {
      alert('¡Inicio de sesión exitoso! Bienvenido a Mokafetería.');
      formLogin.reset();
      loginEmail.classList.remove('is-valid');
      loginPassword.classList.remove('is-valid');
    }
  });

  // Comportamiento en tiempo real para Registro
  const regName = document.getElementById('regName');
  const regEmail = document.getElementById('regEmail');
  const regPassword = document.getElementById('regPassword');

  regName.addEventListener('input', () => {
    if (regName.value.trim().length >= 2) {
      regName.classList.remove('is-invalid');
      regName.classList.add('is-valid');
    } else {
      regName.classList.add('is-invalid');
      regName.classList.remove('is-valid');
    }
  });

  regEmail.addEventListener('input', () => validarCorreo(regEmail));
  regPassword.addEventListener('input', () => validarPassword(regPassword));

  // Envío del Formulario de Registro
  formRegister.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const nombreValido = regName.value.trim().length >= 2;
    if (!nombreValido) {
      regName.classList.add('is-invalid');
    }

    const emailValido = validarCorreo(regEmail);
    const passValido = validarPassword(regPassword);

    if (nombreValido && emailValido && passValido) {
      alert('¡Registro exitoso en Mokafetería! Ya puedes iniciar sesión.');
      formRegister.reset();
      regName.classList.remove('is-valid');
      regEmail.classList.remove('is-valid');
      regPassword.classList.remove('is-valid');

      // Cambiar a la pestaña de login automáticamente tras el registro
      const loginTabBtn = document.getElementById('login-tab');
      const tabInstance = new bootstrap.Tab(loginTabBtn);
      tabInstance.show();
    }
  });
});