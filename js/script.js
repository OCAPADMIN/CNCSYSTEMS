function loadGTM() {
  console.log("► Intentando cargar GTM..."); // CHIVATO 1

  if (window.gtmLoaded) {
    console.log("⚠ GTM ya estaba cargado anteriormente.");
    return;
  }
  window.gtmLoaded = true;

  (function(w,d,s,l,i){
      w[l]=w[l]||[];
      w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),
      dl=l!='dataLayer'?'&l='+l:'';

      j.async=true;
      j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;

      f.parentNode.insertBefore(j,f);
      console.log("✅ Script de GTM inyectado con éxito en el DOM."); // CHIVATO 2
  })(window,document,'script','dataLayer','GTM-PNLQP6N9');
}

function rejectCookies() {
  localStorage.setItem("cookies-consent", "none");
  document.getElementById("cookie-banner").style.display = "none";
  console.log("🚫 Cookies rechazadas por el usuario.");
}

function openPreferences() {
 const prefPanel = document.getElementById("cookie-preferences");
  if (prefPanel) {
    prefPanel.style.display = "flex";
  }
}

function closePreferences() {
  document.getElementById("cookie-preferences").style.display = "none";
}

// 1. MODIFICADO: Ahora evalúa si activa GTM tras guardar la configuración personalizada
function savePreferences() {
  let analytics = document.getElementById("analytics").checked;
  let marketing = document.getElementById("marketing").checked;
  
  localStorage.setItem("cookies-consent", JSON.stringify({analytics, marketing}));
  
  document.getElementById("cookie-preferences").style.display = "none";
  document.getElementById("cookie-banner").style.display = "none";
  
  // Si activa las analíticas (o marketing si lo controlas desde GTM), disparamos GTM en el acto
  if (analytics || marketing) {
    loadGTM();
  } else {
    console.log("🚫 Configuración guardada: GTM permanece bloqueado.");
  }
}

// 2. MODIFICADO: El lector al cargar la página ahora SÍ comprueba y aplica los consentimientos guardados
window.onload = function() {
  let consent = localStorage.getItem("cookies-consent");

  if (!consent) {
    // Si no hay registro, mostramos el banner
    document.getElementById("cookie-banner").style.display = "flex";
  } else {
    // Si ya existe registro, el banner se queda oculto y evaluamos qué hacer:
    if (consent === "all") {
      // Caso A: Aceptó todo en el banner principal
      loadGTM();
    } else if (consent !== "none") {
      // Caso B: Personalizó sus cookies (es un objeto JSON)
      try {
        let parsedConsent = JSON.parse(consent);
        if (parsedConsent.analytics || parsedConsent.marketing) {
          loadGTM();
        }
      } catch(e) {
        console.error("Error leyendo el JSON de consentimiento", e);
      }
    }
    // Caso C: Si es "none", no entra en ningún IF y GTM jamás se ejecuta.
  }
}

function acceptCookies() {
  console.log("🎯 Se ha hecho clic en el botón Aceptar Cookies"); // CHIVATO 3
  localStorage.setItem("cookies-consent", "all");
  loadGTM();
  document.getElementById("cookie-banner").style.display = "none";
}