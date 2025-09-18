// cookies.js
(function() {
  // Funciones para gestionar cookies
  function setCookie(name, value, days) {
      let expires = "";
      if (days) {
          let date = new Date();
          date.setTime(date.getTime() + (days*24*60*60*1000));
          expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

  function getCookie(name) {
      let nameEQ = name + "=";
      let ca = document.cookie.split(';');
      for(let i=0;i < ca.length;i++) {
          let c = ca[i].trim();
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
  }

  // Crear el banner dinámicamente
  if (!getCookie("cookies_aceptadas")) {
      let banner = document.createElement("div");
      banner.id = "cookie-banner";
      banner.style = `
          position: fixed; bottom: 0; left: 0; width: 100%;
          background: #222; color: #fff; text-align: center;
          padding: 15px; z-index: 9999; font-family: Arial, sans-serif;
      `;
      banner.innerHTML = `
          Esta web usa cookies para mejorar tu experiencia. 
          <button id="accept-cookies" style="
              background: #0d6efd; color: #fff; border: none;
              padding: 8px 15px; margin-left: 10px; border-radius: 5px;
              cursor: pointer;
          ">Aceptar</button>
      `;
      document.body.appendChild(banner);

      document.getElementById("accept-cookies").addEventListener("click", function() {
          setCookie("cookies_aceptadas", "si", 365);
          banner.style.display = "none";

          // Aquí se pueden cargar scripts bloqueados hasta que acepten
          loadMarketingScripts();
      });
  } else {
      // Ya aceptadas, cargar scripts bloqueados directamente
      loadMarketingScripts();
  }

  // Función para cargar scripts de marketing/analítica
  function loadMarketingScripts() {
      // Ejemplo: Google Analytics
      /* 
      let ga = document.createElement('script');
      ga.src = 'https://www.googletagmanager.com/gtag/js?id=TU_ID_ANALYTICS';
      ga.async = true;
      document.head.appendChild(ga);
      
      ga.onload = function() {
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'TU_ID_ANALYTICS');
      };
      */
  }
})();
