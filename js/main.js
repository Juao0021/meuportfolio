(function () {
  "use strict";

  var WHATSAPP = "5547991672785";
  document.documentElement.classList.add("js");

  /* Menu mobile */
  var btn = document.querySelector(".menu-btn");
  var menu = document.getElementById("menu");

  function setMenu(open) {
    if (!btn || !menu) return;
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.classList.toggle("is-open", open);
  }

  if (btn && menu) {
    btn.addEventListener("click", function () {
      setMenu(btn.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  /* Cabeçalho ao rolar */
  var header = document.querySelector(".header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Animação de entrada (com pequeno atraso escalonado nos grupos) */
  document.querySelectorAll(".cards, .steps, .values, .features, .works").forEach(function (group) {
    group.querySelectorAll(".reveal").forEach(function (el, i) {
      el.style.setProperty("--d", Math.min(i, 5) * 0.07 + "s");
    });
  });

  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Link ativo no menu conforme a seção visível */
  var links = document.querySelectorAll(".nav li a");
  if ("IntersectionObserver" in window && links.length) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var a = map[entry.target.id];
        if (a && entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("is-active"); });
          a.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) spy.observe(sec);
    });
  }

  /* Brilho que acompanha o mouse nos cards */
  document.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });

  /* Portfólio: se a captura do projeto não existir, mostra a capa com o nome */
  document.querySelectorAll(".work__shot img").forEach(function (img) {
    var shot = img.closest(".work__shot");
    function fail() { shot.classList.add("no-img"); }
    img.addEventListener("error", fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });

  /* Ano no rodapé */
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = String(new Date().getFullYear());

  /* Formulário: monta a mensagem e abre o WhatsApp */
  var form = document.getElementById("form-contato");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = form.elements.nome;
      var negocio = form.elements.negocio;
      var mensagem = form.elements.mensagem;
      var ok = true;

      [[nome, "erro-nome"], [mensagem, "erro-mensagem"]].forEach(function (pair) {
        var field = pair[0].closest(".field");
        var erro = document.getElementById(pair[1]);
        var vazio = pair[0].value.trim() === "";
        field.classList.toggle("has-error", vazio);
        erro.hidden = !vazio;
        if (vazio) {
          pair[0].setAttribute("aria-invalid", "true");
          if (ok) pair[0].focus();
          ok = false;
        } else {
          pair[0].removeAttribute("aria-invalid");
        }
      });

      if (!ok) return;

      var texto = "Olá! Vim pelo site da NEXO Studio e gostaria de um orçamento.\n\n" +
        "Nome: " + nome.value.trim() + "\n" +
        (negocio.value.trim() ? "Tipo de negócio: " + negocio.value.trim() + "\n" : "") +
        "Projeto: " + mensagem.value.trim();

      var url = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto);
      var win = window.open(url, "_blank", "noopener");
      if (!win) window.location.href = url;
    });
  }
})();
