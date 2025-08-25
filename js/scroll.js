function scrollEffect(){

  // Hämtar header-elementet med attribut data-hero
  const header = document.querySelector("header");
  const hero = document.querySelector("[data-hero]");

  function update(){

    // Sätter heroBottom som start på hero + 80% av höjden på hero
    const heroBottom = hero.offsetTop + hero.offsetHeight * 0.8;

    // Om vi scrollar förbi heroBottom, adderas klassen scrolled
    if (window.scrollY >= heroBottom) header.classList.add("scrolled");

    // Annars ta bort scrolled
    else header.classList.remove("scrolled");
  }

  update();

  // Varje gång vi scrollar körs update så att navbaren har tar effekt
  window.addEventListener("scroll", update, { passive: true });
}
scrollEffect();
