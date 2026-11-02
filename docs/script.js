(function () {
  var dict = {
    en: {
      tagline: "Currently studying technology and Brazilian politics.",
      clock_label: "Local time:",
      about_title: "About",
      loc_label: "Location",
      loc_value: "State of São Paulo, Brazil",
      tz_label: "Time zone",
      spoken_label: "Languages",
      spoken_value: "Portuguese (BR), English (US)",
      devices_title: "My devices",
      primary: "Primary phone",
      secondary: "Secondary phone",
      code_title: "Code",
      a_little: "(a little)",
      links_title: "Find me"
    },
    pt: {
      tagline: "Atualmente estudando tecnologia e política brasileira.",
      clock_label: "Hora local:",
      about_title: "Sobre",
      loc_label: "Localização",
      loc_value: "Estado de São Paulo, Brasil",
      tz_label: "Fuso horário",
      spoken_label: "Idiomas",
      spoken_value: "Português (BR), inglês (US)",
      devices_title: "Meus aparelhos",
      primary: "Celular principal",
      secondary: "Celular secundário",
      code_title: "Código",
      a_little: "(um pouco)",
      links_title: "Me encontre"
    }
  };

  var locales = { en: "en-US", pt: "pt-BR" };
  var lang = "en";
  var clock = document.getElementById("clock");

  try {
    var saved = localStorage.getItem("lang");
    if (saved === "pt" || saved === "en") lang = saved;
  } catch (e) {}

  function tick() {
    var now = new Date();
    clock.textContent = new Intl.DateTimeFormat(locales[lang], {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: lang === "en"
    }).format(now);
    clock.setAttribute("datetime", now.toISOString());
  }

  function apply(next) {
    lang = next;
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = dict[lang][el.getAttribute("data-i18n")];
      if (value !== undefined) el.textContent = value;
    });
    document.querySelectorAll("[data-lang]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === lang));
    });
    try { localStorage.setItem("lang", lang); } catch (e) {}
    tick();
  }

  document.querySelectorAll("[data-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      apply(btn.getAttribute("data-lang"));
    });
  });

  document.querySelectorAll(".shot img").forEach(function (img) {
    img.addEventListener("error", function () {
      img.style.visibility = "hidden";
    });
  });

  var avatar = document.querySelector(".avatar");
  if (avatar) {
    avatar.addEventListener("error", function () {
      avatar.style.display = "none";
    });
  }

  apply(lang);
  setInterval(tick, 1000);
})();

