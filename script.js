let player = {
    name: "",
    maxHP: 100,
    hp: 100,
    power: 80,
    defense: 70
};

let enemy = {
    hp: 100,
    maxHP: 100
};

let defending = false;


function selectHero(name, hp, power, defense) {

    player.name = name;
    player.maxHP = hp;
    player.hp = hp;
    player.power = power;
    player.defense = defense;

    document.getElementById("heroesPage").style.display = "none";

    document.getElementById("battlePage").style.display = "block";

    document.getElementById("playerName").textContent = name;

    updatePlayerHP();

    enemy.hp = 100;

    updateEnemyHP();

    document.getElementById("battleMessage").textContent =
        "⚔️ " + name + " шайқасқа кірді!";
}


function attack() {

    if (enemy.hp <= 0 || player.hp <= 0) {
        return;
    }

    let damage = Math.floor(
        Math.random() * 16
    ) + 10;

    enemy.hp -= damage;

    if (enemy.hp < 0) {
        enemy.hp = 0;
    }

    updateEnemyHP();

    document.getElementById("battleMessage").textContent =
        "⚔️ Сен " + damage + " зиян келтірдің!";

    if (enemy.hp <= 0) {

        document.getElementById("battleMessage").textContent =
            "🏆 ЖЕҢІС! Сен қарсыласты жеңдің!";

        return;
    }

    enemyAttack();
}


function specialAttack() {

    if (enemy.hp <= 0 || player.hp <= 0) {
        return;
    }

    let damage = Math.floor(
        Math.random() * 25
    ) + 20;

    enemy.hp -= damage;

    if (enemy.hp < 0) {
        enemy.hp = 0;
    }

    updateEnemyHP();

    document.getElementById("battleMessage").textContent =
        "⚡ АРНАЙЫ КҮШ! " + damage + " зиян!";

    if (enemy.hp <= 0) {

        document.getElementById("battleMessage").textContent =
            "🏆 КЕРЕМЕТ! Арнайы күшпен жеңдің!";

        return;
    }

    enemyAttack();
}


function defend() {

    if (enemy.hp <= 0 || player.hp <= 0) {
        return;
    }

    defending = true;

    document.getElementById("battleMessage").textContent =
        "🛡️ Сен қорғандың! Келесі шабуыл әлсіз болады.";

    enemyAttack();
}


function enemyAttack() {

    setTimeout(function() {

        let damage = Math.floor(
            Math.random() * 15
        ) + 5;

        if (defending) {

            damage = Math.floor(damage / 2);

            defending = false;
        }

        player.hp -= damage;

        if (player.hp < 0) {
            player.hp = 0;
        }

        updatePlayerHP();

        document.getElementById("battleMessage").textContent +=
            " 👹 Қарсылас саған " + damage + " зиян келтірді!";

        if (player.hp <= 0) {

            document.getElementById("battleMessage").textContent =
                "💀 ЖЕҢІЛІС! Қайтадан байқап көр!";
        }

    }, 700);
}


function updatePlayerHP() {

    let percent =
        (player.hp / player.maxHP) * 100;

    document.getElementById("playerHP").style.width =
        percent + "%";

    document.getElementById("playerHPText").textContent =
        "❤️ " + player.hp + " / " + player.maxHP;
}


function updateEnemyHP() {

    let percent =
        (enemy.hp / enemy.maxHP) * 100;

    document.getElementById("enemyHP").style.width =
        percent + "%";

    document.getElementById("enemyHPText").textContent =
        "❤️ " + enemy.hp + " / " + enemy.maxHP;
}


function backToHeroes() {

    document.getElementById("battlePage").style.display =
        "none";

    document.getElementById("heroesPage").style.display =
        "block";
}
