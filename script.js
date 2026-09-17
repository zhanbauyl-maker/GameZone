let level = 1;
let xp = 0;
let xpNeeded = 100;
let player = {
    name: "",
    maxHP: 100,
    hp: 100,
    power: 80
};

let enemy = {
    maxHP: 100,
    hp: 100
};

let defending = false;


// КЕЙІПКЕР ТАҢДАУ
function selectHero(name, hp, power, defense) {

    player.name = name;
    player.maxHP = hp;
    player.hp = hp;
    player.power = power;

    enemy.hp = enemy.maxHP;

    document.getElementById("heroesPage").style.display = "none";
    document.getElementById("battlePage").style.display = "block";

    document.getElementById("playerName").textContent = name;

    updatePlayerHP();
    updateEnemyHP();

    document.getElementById("battleMessage").textContent =
        "⚔️ " + name + " шайқасқа кірді!";
}


// ҚАРАПАЙЫМ ШАБУЫЛ
function attack() {

    // Қарсылас жеңілсе, қайта шабуыл жасамау
    if (enemy.hp <= 0) {
        return;
    }

    // 10-25 аралығында зиян
    const damage = Math.floor(Math.random() * 16) + 10;

    enemy.hp = enemy.hp - damage;

    if (enemy.hp < 0) {
        enemy.hp = 0;
    }

    updateEnemyHP();

    if (enemy.hp === 0) {
        document.getElementById("battleMessage").textContent =
            "🏆 ЖЕҢІС! Қарсыласты жеңдің! +100 XP";

        addXP(100);
        return;
    }

    document.getElementById("battleMessage").textContent =
        "⚔️ Сен " + damage + " зиян келтірдің!";

    // Қарсыластың жауап шабуылы
    setTimeout(enemyAttack, 700);
}


// АРНАЙЫ КҮШ
function specialAttack() {

    if (enemy.hp <= 0) {
        return;
    }

    const damage = Math.floor(Math.random() * 21) + 20;

    enemy.hp = enemy.hp - damage;

    if (enemy.hp < 0) {
        enemy.hp = 0;
    }

    updateEnemyHP();

    if (enemy.hp === 0) {
        document.getElementById("battleMessage").textContent =
            "⚡ КЕРЕМЕТ! Арнайы күшпен жеңдің! +100 XP";

        addXP(100);
        return;
    }
    document.getElementById("battleMessage").textContent =
        "⚡ Арнайы күш " + damage + " зиян келтірді!";

    setTimeout(enemyAttack, 700);
}


// ҚОРҒАНУ
function defend() {

    if (enemy.hp <= 0) {
        return;
    }

    defending = true;

    document.getElementById("battleMessage").textContent =
        "🛡️ Қорғаныс іске қосылды!";

    setTimeout(enemyAttack, 700);
}


// ҚАРСЫЛАСТЫҢ ШАБУЫЛЫ
function enemyAttack() {

    if (player.hp <= 0) {
        return;
    }

    let damage = Math.floor(Math.random() * 11) + 5;

    if (defending) {
        damage = Math.floor(damage / 2);
        defending = false;
    }

    player.hp = player.hp - damage;

    if (player.hp < 0) {
        player.hp = 0;
    }

    updatePlayerHP();

    if (player.hp === 0) {

        document.getElementById("battleMessage").textContent =
            "💀 ЖЕҢІЛІС! Қайтадан байқап көр!";

        return;
    }

    document.getElementById("battleMessage").textContent +=
        " 👹 Қарсылас " + damage + " зиян келтірді!";
}


// ОЙЫНШЫ HP
function updatePlayerHP() {

    const percent =
        (player.hp / player.maxHP) * 100;

    document.getElementById("playerHP").style.width =
        percent + "%";

    document.getElementById("playerHPText").textContent =
        "❤️ " + player.hp + " / " + player.maxHP;
}


// ҚАРСЫЛАС HP
function updateEnemyHP() {

    const percent =
        (enemy.hp / enemy.maxHP) * 100;

    document.getElementById("enemyHP").style.width =
        percent + "%";

    document.getElementById("enemyHPText").textContent =
        "❤️ " + enemy.hp + " / " + enemy.maxHP;
}


// КЕЙІПКЕРЛЕРГЕ ҚАЙТУ
function backToHeroes() {

    document.getElementById("battlePage").style.display =
        "none";

    document.getElementById("heroesPage").style.display =
        "block";
}
function addXP(amount) {
    xp += amount;

    if (xp >= xpNeeded) {
        xp -= xpNeeded;
        level++;

        player.power += 10;

        document.getElementById("battleMessage").textContent =
            "🎉 LEVEL UP! Сен енді LEVEL " + level + " деңгейдесің!";
    }

    updateXP();
}

function updateXP() {
    const percent = (xp / xpNeeded) * 100;

    document.getElementById("xpBar").style.width =
        percent + "%";

    document.getElementById("levelText").textContent =
        "⭐ LEVEL " + level;

    document.getElementById("xpText").textContent =
        "XP: " + xp + " / " + xpNeeded;
}
