

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
}
function openPreferences() {
  document.getElementById("cookie-preferences").style.display = "flex";
}
function closePreferences() {
  document.getElementById("cookie-preferences").style.display = "none";
}
function savePreferences() {
  let analytics = document.getElementById("analytics").checked;
  let marketing = document.getElementById("marketing").checked;
  localStorage.setItem("cookies-consent", JSON.stringify({analytics, marketing}));
  document.getElementById("cookie-preferences").style.display = "none";
  document.getElementById("cookie-banner").style.display = "none";
}
window.onload = function() {
  if (!localStorage.getItem("cookies-consent")) {
    document.getElementById("cookie-banner").style.display = "flex";
  }
}

function acceptCookies() {
  console.log("🎯 Se ha hecho clic en el botón Aceptar Cookies"); // CHIVATO 3
  localStorage.setItem("cookies-consent", "all");
  loadGTM();
  document.getElementById("cookie-banner").style.display = "none";
}