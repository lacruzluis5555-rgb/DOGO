/* =====================================================
   DATOS DEL QUIZ Y CLIENTE
===================================================== */

let nombreCliente = "";
let telefonoCliente = "";
let nombrePerro = "";
let tipoPerro = "";
let edadPerro = "";
let tamanoPerro = "";
let energiaPerro = "";
let objetivoPerro = "";

/* =====================================================
   CONFIGURACIÓN EMAILJS
===================================================== */

if (typeof emailjs !== "undefined") {
    emailjs.init({
        publicKey: "BucFFcK66xixi0s-Y"
    });
} else {
    console.error("Error: EmailJS no se ha cargado correctamente.");
}

/* =====================================================
   HELPER DE VALIDACIÓN VISUAL (CERO ALERT)
===================================================== */

function mostrarError(elementId, mensaje) {
    const inputElem = document.getElementById(elementId);
    if (!inputElem) return;
    let errorSpan = inputElem.parentElement.querySelector(`.error-msg[data-for="${elementId}"]`);
    
    if (!errorSpan) {
        errorSpan = document.createElement("span");
        errorSpan.className = "error-msg";
        errorSpan.setAttribute("data-for", elementId);
        inputElem.parentNode.insertBefore(errorSpan, inputElem.nextSibling);
    }
    
    errorSpan.innerText = mensaje;
    inputElem.classList.add("input-error");
}

function limpiarErrores(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const errores = container.querySelectorAll(".error-msg");
    errores.forEach(el => el.remove());

    const inputs = container.querySelectorAll(".input-error");
    inputs.forEach(el => el.classList.remove("input-error"));
}

/* =====================================================
   ETAPA 1 DEL QUIZ (CON DISEÑO Y VALIDACIÓN LIMPIA)
===================================================== */

function mostrarOtroTipo() {
    let seleccion = document.getElementById("tipoPerro").value;
    let otroContainer = document.getElementById("otroTipoContainer");
    if (!otroContainer) return;

    if (seleccion === "Otro") {
        otroContainer.classList.remove("oculto");
    } else {
        otroContainer.classList.add("oculto");
        document.getElementById("otroTipo").value = "";
    }
}

function guardarPaso1() {
    limpiarErrores("step1");

    const clienteInput = document.getElementById("nombreClienteQuiz");
    const telefonoInput = document.getElementById("telefonoClienteQuiz");
    const nombrePerroInput = document.getElementById("nombrePerro");
    const tipoPerroSelect = document.getElementById("tipoPerro");
    const edadPerroSelect = document.getElementById("edadPerro");

    nombreCliente = clienteInput ? clienteInput.value.trim() : "";
    telefonoCliente = telefonoInput ? telefonoInput.value.trim() : "";
    nombrePerro = nombrePerroInput ? nombrePerroInput.value.trim() : "";
    let seleccion = tipoPerroSelect ? tipoPerroSelect.value : "";
    edadPerro = edadPerroSelect ? edadPerroSelect.value : "";

    let esValido = true;

    if (clienteInput && nombreCliente === "") {
        mostrarError("nombreClienteQuiz", "Escribe tu nombre.");
        esValido = false;
    }

    if (telefonoInput) {
        if (telefonoCliente === "") {
            mostrarError("telefonoClienteQuiz", "Escribe tu número de teléfono.");
            esValido = false;
        } else {
            const regexTelefono = /^\+?[0-9]{8,15}$/;
            if (!regexTelefono.test(telefonoCliente)) {
                mostrarError("telefonoClienteQuiz", "Teléfono inválido (solo números, mínimo 8 dígitos).");
                esValido = false;
            }
        }
    }

    if (nombrePerro === "") {
        mostrarError("nombrePerro", "Escribe el nombre de tu perro.");
        esValido = false;
    }

    if (seleccion === "") {
        mostrarError("tipoPerro", "Selecciona el tipo o raza de tu perro.");
        esValido = false;
    }

    if (seleccion === "Otro") {
        let otroTipoElem = document.getElementById("otroTipo");
        let otroTipo = otroTipoElem ? otroTipoElem.value.trim() : "";
        if (otroTipo === "") {
            mostrarError("otroTipo", "Especifica la raza o tipo de tu perro.");
            esValido = false;
        } else {
            tipoPerro = otroTipo;
        }
    } else {
        tipoPerro = seleccion;
    }

    if (edadPerro === "") {
        mostrarError("edadPerro", "Selecciona la edad de tu perro.");
        esValido = false;
    }

    if (!esValido) return;

    // Transición usando clases CSS para evitar que desaparezcan elementos
    document.getElementById("step1").classList.add("oculto");
    document.getElementById("step2").classList.remove("oculto");
}

/* =====================================================
   ETAPA 2 DEL QUIZ
===================================================== */

function mostrarResultado() {
    limpiarErrores("step2");

    let tamanoElem = document.getElementById("tamanoPerro");
    let energiaElem = document.getElementById("energiaPerro");
    let objetivoElem = document.getElementById("objetivoPerro");

    tamanoPerro = tamanoElem ? tamanoElem.value : "";
    energiaPerro = energiaElem ? energiaElem.value : "";
    objetivoPerro = objetivoElem ? objetivoElem.value : "";

    let esValido = true;

    if (tamanoPerro === "") {
        mostrarError("tamanoPerro", "Selecciona el tamaño de tu perro.");
        esValido = false;
    }

    if (energiaPerro === "") {
        mostrarError("energiaPerro", "Selecciona el nivel de energía.");
        esValido = false;
    }

    if (objetivoPerro === "") {
        mostrarError("objetivoPerro", "Selecciona la necesidad principal.");
        esValido = false;
    }

    if (!esValido) return;

    // Transición limpia de paso 2 a resultado
    document.getElementById("step2").classList.add("oculto");
    document.getElementById("resultado").classList.remove("oculto");

    /* DATOS DEL PERRO Y CLIENTE EN VISTA */
    if(document.getElementById("resultadoNombre")) document.getElementById("resultadoNombre").innerText = nombrePerro;
    if(document.getElementById("resultadoTipo")) document.getElementById("resultadoTipo").innerText = tipoPerro;
    if(document.getElementById("resultadoEdad")) document.getElementById("resultadoEdad").innerText = edadPerro;
    if(document.getElementById("resultadoTamano")) document.getElementById("resultadoTamano").innerText = tamanoPerro;
    if(document.getElementById("resultadoEnergia")) document.getElementById("resultadoEnergia").innerText = energiaPerro;
    if(document.getElementById("resultadoObjetivo")) document.getElementById("resultadoObjetivo").innerText = objetivoPerro;

    /* RECOMENDACIÓN DE PLANES */
    let nombrePlan = "";
    let descripcion = "";
    let precio = "";
    let beneficios = "";

    if (edadPerro === "Cachorro") {
        nombrePlan = "DOGO Puppy Pack";
        descripcion = `${nombrePerro} está en etapa de crecimiento. Recomendamos un programa de educación temprana, control de mordida y hábitos de higiene.`;
        precio = "$75.000";
        beneficios = "3 semanas de programa educativo personalizado a domicilio.";
    } else if (edadPerro === "Senior" && (objetivoPerro === "General" || energiaPerro === "Bajo")) {
        nombrePlan = "DOGO Physio / Senior Care";
        descripcion = `${nombrePerro} es un perro senior y necesita cuidados especiales para sus articulaciones, relajación y paseos adaptados.`;
        precio = "$65.000";
        beneficios = "4 sesiones mensuales de movilidad suave y masajes a domicilio.";
    } else if (objetivoPerro === "Higiene") {
        nombrePlan = "DOGO Grooming Urbano";
        descripcion = `${nombrePerro} requiere mantener su pelaje e higiene al día con productos hipoalergénicos sin estrés.`;
        precio = "$55.000";
        beneficios = "Pack de 2 sesiones al mes (baño, deslanado, corte de uñas y oídos).";
    } else if (objetivoPerro === "Viaje") {
        nombrePlan = "DOGO Hotel Nocturno";
        descripcion = `Para cuando viajes o te ausentes, ${nombrePerro} contará con hospedaje familiar y cuidado 24/7 sin jaulas.`;
        precio = "$25.000";
        beneficios = "Estadía por noche en casa de cuidador verificado con fotos/videos.";
    } else if (objetivoPerro === "Conducta") {
        nombrePlan = "DOGO Training";
        descripcion = `${nombrePerro} presenta una necesidad relacionada con conducta y hábitos. Recomendamos un plan de adiestramiento.`;
        precio = "$80.000";
        beneficios = "4 sesiones individuales a domicilio más un plan de hábitos.";
    } else if (objetivoPerro === "Cuidado") {
        nombrePlan = "DOGO Daycare";
        descripcion = `${nombrePerro} necesita compañía, socialización y enriquecimiento durante el día.`;
        precio = "$60.000";
        beneficios = "Pack de 4 jornadas de enriquecimiento ambiental.";
    } else if (objetivoPerro === "Actividad" || energiaPerro === "Alto") {
        nombrePlan = "DOGO Walk";
        descripcion = `${nombrePerro} necesita liberar energía y mantener actividad física de forma regular.`;
        precio = "$45.000";
        beneficios = "12 paseos al mes con reporte de conducta y seguimiento.";
    } else {
        nombrePlan = "DOGO Tag";
        descripcion = `Placa inteligente con código QR y perfil web para identificar a ${nombrePerro} ante cualquier emergencia.`;
        precio = "$7.990";
        beneficios = "Identificador inteligente con perfil web y alertas.";
    }

    if(document.getElementById("nombrePlan")) document.getElementById("nombrePlan").innerText = nombrePlan;
    if(document.getElementById("descripcionPlan")) document.getElementById("descripcionPlan").innerText = descripcion;
    if(document.getElementById("precioPlan")) document.getElementById("precioPlan").innerText = precio;
    if(document.getElementById("beneficiosPlan")) document.getElementById("beneficiosPlan").innerText = "Beneficios: " + beneficios;

    if(document.getElementById("mensajeResultado")) {
        document.getElementById("mensajeResultado").innerHTML =
            `DOGO analizó la información de <strong>${nombrePerro}</strong> (Dueño: ${nombreCliente}) y seleccionó una recomendación ideal.`;
    }

    let mensaje = `¡Hola DOGO! Mi nombre es ${nombreCliente} (Tel: ${telefonoCliente}). Hice el diagnóstico para mi perro ${nombrePerro} (${tipoPerro}) y me recomendó el plan *${nombrePlan}*. Me gustaría consultar disponibilidad.`;
    let numeroWhatsApp = "56948911189";

    if(document.getElementById("whatsappButton")) {
        document.getElementById("whatsappButton").href =
            `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    }

    guardarOrdenAutomaticaDelQuiz(nombrePerro + " (" + nombreCliente + ")", nombrePlan, precio, telefonoCliente);
}

// Función auxiliar para registrar la orden del quiz
function guardarOrdenAutomaticaDelQuiz(clienteStr, servicio, monto, telefono) {
    let ordenes = obtenerOrdenesRegistradas();
    const nuevaOrden = {
        id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
        cliente: clienteStr,
        telefono: telefono || "Sin teléfono",
        servicio: servicio,
        monto: monto,
        fecha: new Date().toLocaleDateString('es-CL'),
        estado: "En revisión"
    };
    ordenes.push(nuevaOrden);
    localStorage.setItem('dogo_ordenes', JSON.stringify(ordenes));
}

/* =====================================================
   FORMULARIO DE CONTACTO + EMAILJS
===================================================== */

function enviarFormulario(event) {
    event.preventDefault();

    const formulario = document.getElementById("formContacto");
    const estadoMsg = document.getElementById("mensajeEstado");
    const btnSubmit = formulario ? formulario.querySelector("button[type='submit']") : null;

    if (estadoMsg) {
        estadoMsg.className = "mensaje-estado";
        estadoMsg.innerText = "Enviando mensaje...";
    }
    
    if (btnSubmit) btnSubmit.disabled = true;

    emailjs.sendForm("service_z50dwxr", "template_yc8sicf", formulario)
        .then(function() {
            if (estadoMsg) {
                estadoMsg.className = "mensaje-estado exito";
                estadoMsg.innerText = "¡Mensaje enviado con éxito! Revisa tu correo para ver la confirmación.";
            }
            if(formulario) formulario.reset();
        })
        .catch(function(error) {
            console.error("Error de EmailJS:", error);
            if (estadoMsg) {
                estadoMsg.className = "mensaje-estado error";
                estadoMsg.innerText = "No se pudo enviar el mensaje. Intenta nuevamente.";
            }
        })
        .finally(function() {
            if (btnSubmit) btnSubmit.disabled = false;
        });
}

/* =====================================================
   LÓGICA DE LOGIN ADMINISTRADOR (USER: admin / PASS: 1234)
===================================================== */

function procesarLoginAdmin(event) {
    event.preventDefault();

    const usuarioInput = document.getElementById("loginUser").value.trim();
    const passwordInput = document.getElementById("loginPassword").value.trim();
    const errorMsg = document.getElementById("errorLogin");

    if (usuarioInput === "admin" && passwordInput === "1234") {
        localStorage.setItem("dogo_admin_logged", "true");

        if (errorMsg) {
            errorMsg.style.color = "#10B981";
            errorMsg.innerText = "¡Acceso concedido! Redirigiendo al panel de administración...";
        }

        setTimeout(() => {
            window.location.href = "panel.html";
        }, 1000);

    } else {
        if (errorMsg) {
            errorMsg.style.color = "#DC2626";
            errorMsg.innerText = "Usuario o contraseña incorrectos. (Usa: admin / 1234)";
        }
    }
}

/* =====================================================
   GESTIÓN DE ÓRDENES Y PANEL DE ADMINISTRACIÓN
===================================================== */

function obtenerOrdenesRegistradas() {
    let ordenes = localStorage.getItem('dogo_ordenes');
    if (!ordenes) {
        ordenes = [
            { id: "ORD-101", cliente: "Rocco (Juan Pérez)", telefono: "948911189", servicio: "DOGO Walk", monto: "$45.000", fecha: "28/10/2026", estado: "En revisión" }
        ];
        localStorage.setItem('dogo_ordenes', JSON.stringify(ordenes));
    } else {
        ordenes = JSON.parse(ordenes);
    }
    return ordenes;
}

// Registrar contratación directa desde servicios.html (Modal flotante o flujo directo)
function contratarServicio(nombreServicio, precioServicio) {
    let modal = document.getElementById('modalContratacion');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalContratacion';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); display: flex; justify-content: center;
            align-items: center; z-index: 1000;
        `;
        modal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 8px; width: 90%; max-width: 400px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
                <h3 id="modalTituloServicio" style="margin-bottom: 15px; color: #2C3E50;">Contratar Servicio</h3>
                <form id="formContratacionDirecta" onsubmit="procesarContratacionDirecta(event)">
                    <input type="hidden" id="inputNombreServicio">
                    <input type="hidden" id="inputPrecioServicio">
                    
                    <label style="display:block; margin-bottom:5px; font-weight:600;">Tu Nombre:</label>
                    <input type="text" id="clientName" placeholder="Ej. Carlos Pérez" style="width:100%; padding:8px; margin-bottom:12px; border:1px solid #ccc; border-radius:4px;" required>
                    
                    <label style="display:block; margin-bottom:5px; font-weight:600;">Nombre de tu Perro:</label>
                    <input type="text" id="clientDog" placeholder="Ej. Rocco" style="width:100%; padding:8px; margin-bottom:12px; border:1px solid #ccc; border-radius:4px;" required>
                    
                    <label style="display:block; margin-bottom:5px; font-weight:600;">Teléfono de Contacto:</label>
                    <input type="tel" id="clientPhone" placeholder="Ej. 948911189" style="width:100%; padding:8px; margin-bottom:15px; border:1px solid #ccc; border-radius:4px;" required>
                    
                    <div id="estadoContratacion" style="margin-bottom: 10px; font-weight: bold; font-size: 13px; text-align: center;"></div>
                    
                    <div style="display: flex; justify-content: flex-end; gap: 10px;">
                        <button type="button" onclick="cerrarModalContratacion()" style="padding: 8px 15px; background: #95a5a6; color: white; border: none; border-radius: 4px; cursor: pointer;">Cancelar</button>
                        <button type="submit" style="padding: 8px 15px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer;">Enviar Solicitud</button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
    }

    if(document.getElementById('modalTituloServicio')) document.getElementById('modalTituloServicio').innerText = `Contratar: ${nombreServicio} (${precioServicio})`;
    if(document.getElementById('inputNombreServicio')) document.getElementById('inputNombreServicio').value = nombreServicio;
    if(document.getElementById('inputPrecioServicio')) document.getElementById('inputPrecioServicio').value = precioServicio;
    if(document.getElementById('estadoContratacion')) document.getElementById('estadoContratacion').innerText = '';
    
    let formDir = document.getElementById('formContratacionDirecta');
    if(formDir) formDir.reset();
    
    if(document.getElementById('inputNombreServicio')) document.getElementById('inputNombreServicio').value = nombreServicio;
    if(document.getElementById('inputPrecioServicio')) document.getElementById('inputPrecioServicio').value = precioServicio;
    
    modal.style.display = 'flex';
}

function cerrarModalContratacion() {
    const modal = document.getElementById('modalContratacion');
    if (modal) modal.style.display = 'none';
}

function procesarContratacionDirecta(event) {
    event.preventDefault();

    const servicio = document.getElementById('inputNombreServicio').value;
    const precio = document.getElementById('inputPrecioServicio').value;
    const cliente = document.getElementById('clientName').value.trim();
    const mascota = document.getElementById('clientDog').value.trim();
    const telefono = document.getElementById('clientPhone').value.trim();
    const estadoDiv = document.getElementById('estadoContratacion');

    const regexTelefono = /^\+?[0-9]{8,15}$/;
    if (!regexTelefono.test(telefono)) {
        if(estadoDiv) {
            estadoDiv.style.color = '#e74c3c';
            estadoDiv.innerText = 'Teléfono inválido. Ingresa solo números (mínimo 8 dígitos).';
        }
        return;
    }

    let ordenes = obtenerOrdenesRegistradas();
    const nuevaOrden = {
        id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
        cliente: `${mascota} (${cliente})`,
        telefono: telefono,
        servicio: servicio,
        monto: precio,
        fecha: new Date().toLocaleDateString('es-CL'),
        estado: 'En revisión'
    };

    ordenes.push(nuevaOrden);
    localStorage.setItem('dogo_ordenes', JSON.stringify(ordenes));

    if(estadoDiv) {
        estadoDiv.style.color = '#27ae60';
        estadoDiv.innerText = '¡Solicitud enviada! Tu servicio está siendo revisado y serás contactado apenas se apruebe.';
    }

    setTimeout(() => {
        cerrarModalContratacion();
    }, 3500);
}

// Cargar panel con verificación de seguridad
function cargarPanelAdmin() {
    const isLogged = localStorage.getItem('dogo_admin_logged');
    
    if (isLogged !== 'true') {
        window.location.href = "contacto.html";
        return;
    }

    renderizarTablaAdmin();
}

// Renderizar tabla del panel de administración con teléfono, link de llamada y botón Aprobar a WhatsApp
function renderizarTablaAdmin() {
    const tbody = document.getElementById('cuerpoTablaAdmin');
    if (!tbody) return;

    const ordenes = obtenerOrdenesRegistradas();
    tbody.innerHTML = "";

    if (ordenes.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:#666;">No hay solicitudes pendientes.</td></tr>`;
        return;
    }

    ordenes.forEach((item, index) => {
        let badgeColor = "#F59E0B"; // Amarillo para En revisión / Pendiente
        if (item.estado === "Aprobado" || item.estado === "Confirmado") badgeColor = "#10B981"; // Verde
        if (item.estado === "Cancelado") badgeColor = "#DC2626"; // Rojo

        const telFila = item.telefono || "948911189";

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${item.id}</strong></td>
            <td>${item.cliente}</td>
            <td><a href="tel:${telFila}" style="color: #2980b9; font-weight:600; text-decoration:none;" title="Llamar al cliente">📞 ${telFila}</a></td>
            <td>${item.servicio}</td>
            <td>${item.monto}</td>
            <td>${item.fecha}</td>
            <td>
                <span style="background-color: ${badgeColor}; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">
                    ${item.estado}
                </span>
            </td>
            <td>
                <button onclick="aprobarYEnviarWhatsApp(${index})" class="btn" style="background-color: #10B981; padding: 6px 12px; font-size: 12px; margin-right: 5px;" title="Aprobar y abrir WhatsApp">Aprobar 💬</button>
                <button onclick="eliminarOrden(${index})" class="btn" style="background-color: #DC2626; padding: 6px 12px; font-size: 12px;">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Aprobar orden y abrir WhatsApp con mensaje personalizado para el cliente
function aprobarYEnviarWhatsApp(index) {
    let ordenes = obtenerOrdenesRegistradas();
    if(ordenes[index]) {
        ordenes[index].estado = "Aprobado";
        localStorage.setItem('dogo_ordenes', JSON.stringify(ordenes));
        
        const orden = ordenes[index];
        let telLimpio = (orden.telefono || "56948911189").replace(/\s+/g, '').replace('+', '');
        
        const mensaje = `¡Hola! Te escribimos de DOGO SpA 🐾. Tu solicitud para el servicio de *${orden.servicio}* ha sido *APROBADA*. Nos pondremos en contacto contigo muy pronto para coordinar el horario y los detalles. ¡Gracias por confiar en nosotros!`;
        
        const urlWhatsApp = `https://wa.me/${telLimpio}?text=${encodeURIComponent(mensaje)}`;
        
        renderizarTablaAdmin();
        window.open(urlWhatsApp, '_blank');
    }
}

// Eliminar orden de la tabla
function eliminarOrden(index) {
    let ordenes = obtenerOrdenesRegistradas();
    ordenes.splice(index, 1);
    localStorage.setItem('dogo_ordenes', JSON.stringify(ordenes));
    renderizarTablaAdmin();
}

// Cerrar Sesión del Administrador
function cerrarSesionAdmin() {
    localStorage.removeItem('dogo_admin_logged');
    window.location.href = "contacto.html";
}

/* =====================================================
   EQUIPO DE TRABAJO (NOSOTROS)
===================================================== */

function cargarEquipoDogo() {
    const contenedorEquipo = document.getElementById("contenedorEquipo");
    
    if (contenedorEquipo) {
        const equipoDogo = [
            {
                nombre: "Luis La Cruz",
                cargo: "CEO & Co-Fundador",
                descripcion: "Líder de la estrategia general del negocio, la visión del proyecto y la expansión de servicios.",
                imagen: "img/equipo-luis.png"
            },
            {
                nombre: "Nelson Alerte",
                cargo: "Director de Tecnología (CTO)",
                descripcion: "Líder de desarrollo de la plataforma web, app, pasarela de automatización y sistemas de diagnóstico.",
                imagen: "img/equipo-nelson.jpeg"
            },
            {
                nombre: "Matías Navarrete",
                cargo: "Director de Operaciones",
                descripcion: "Encargado de la coordinación en terreno, logística, seguridad de los paseos y control de calidad.",
                imagen: "img/equipo-matias.png"
            },
            {
                nombre: "Camila Valenzuela",
                cargo: "Coordinadora de Bienestar Canino",
                descripcion: "Etóloga y especialista en conducta animal, supervisa los programas de entrenamiento y day care.",
                imagen: "img/equipo-camila.jpg"
            },
            {
                nombre: "Cristiano Ronaldo",
                cargo: "Especialista en Marketing Digital",
                descripcion: "Encargado de la captación de clientes, redes sociales y campañas de fidelización de la comunidad.",
                imagen: "img/equipo-esteban.jpg"
            }
        ];

        contenedorEquipo.innerHTML = "";

        equipoDogo.forEach(miembro => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.style.textAlign = "center";
            
            card.innerHTML = `
                <div style="width: 100px; height: 100px; margin: 0 auto 15px auto; background-color: #ddd; border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                    <img src="${miembro.imagen}" alt="${miembro.nombre}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <span style="display:none; font-size: 12px; color: #666;">Sin Foto</span>
                </div>
                <h3>${miembro.nombre}</h3>
                <p style="font-weight: bold; color: #e67e22; font-size: 14px; margin-bottom: 8px;">${miembro.cargo}</p>
                <p style="font-size: 13px;">${miembro.descripcion}</p>
            `;
            
            contenedorEquipo.appendChild(card);
        });
    }
}