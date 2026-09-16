function selectHero(heroName) {
    localStorage.setItem("selectedHero", heroName);

    alert(
        "⚔️ " + heroName +
        " таңдалды!\n\nКелесі кезеңде шайқас басталады."
    );
}
