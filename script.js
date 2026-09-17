let currentStage = 1;

const enemies = [
    {
        name: "Қарақшы",
        hp: 100,
        power: 15,
        icon: "👹"
    },
    {
        name: "Жауынгер",
        hp: 140,
        power: 20,
        icon: "⚔️"
    },
    {
        name: "Басқыншы",
        hp: 180,
        power: 25,
        icon: "🗡️"
    },
    {
        name: "Қолбасшы",
        hp: 230,
        power: 30,
        icon: "👺"
    },
    {
        name: "БАС БОСС",
        hp: 300,
        power: 40,
        icon: "👹"
    }
];
let player = {
    name: "",
    maxHP: 100,
    hp: 100,
    power: 80
};

let enemy = {
    maxHP: 100,
    hp: 100,
    power: 15,
    name: "Қарақшы",
    icon: "👹"
};

let defending = false;

let level = 1;
let xp = 0;
let xpNeeded = 100;
const enemies = [
    {
        name: "Қарақшы",
        hp: 100,
        power: 15,
        icon: "👹"
    },
    {
        name: "Жауынгер",
        hp: 140,
        power: 20,
        icon: "⚔️"
    },
    {
        name: "Басқыншы",
        hp: 180,
        power: 25,
        icon: "🗡️"
    },
    {
        name: "Қолбасшы",
        hp: 230,
        power: 30,
        icon: "👺"
    },
    {
        name: "Бас Босс",
        hp: 300,
        power: 40,
        icon: "👹"
    }
];


// =========================
// КЕЙІПКЕР ТАҢДАУ
// =========================

function selectHero(name, hp, power, defense) {

    player.name = name;
    player.maxHP = hp;
    player.hp = hp;
    player.power = power;

    setEnemy();

    level = 1;
    xp = 0;

    document.getElementById("heroesPage").style.display = "none";
    document.getElementById("battlePage").style.display = "block";

    document.getElementById("playerName").textContent = name;

    updatePlayerHP();
    updateEnemyHP();
    updateXP();

    document.getElementById("battleMessage").textContent =
        "⚔️ " + name + " шайқасқа кірді!";
    }


// =========================
// ҚАЛЫПТЫ ШАБУЫЛ
// =========================

function attack() {

    if (enemy.hp <= 0 || player.hp <= 0) return;

    const damage = Math.floor(Math.random() * 16) + 10;

    enemy.hp -= damage;

    if (enemy.hp < 0) {
        enemy.hp = 0;
    }

    updateEnemyHP();

    if (enemy.hp === 0) {

        document.getElementById("battleMessage").textContent =
            "🏆 ЖЕҢІС! +100 XP";

        addXP(100);

        return;
    }

    document.getElementById("battleMessage").textContent =
        "⚔️ Сен " + damage + " зиян келтірдің!";

    setTimeout(enemyAttack, 700);
}


// =========================
// АРНАЙЫ КҮШ
// =========================

function specialAttack() {

    if (enemy.hp <= 0 || player.hp <= 0) return;

    const damage = Math.floor(Math.random() * 21) + 20;

    enemy.hp -= damage;

    if (enemy.hp < 0) {
        enemy.hp = 0;
    }

    updateEnemyHP();

    if (enemy.hp === 0) {

        document.getElementById("battleMessage").textContent =
            "⚡ КЕРЕМЕТ! +100 XP";

        addXP(100);

        return;
    }

    document.getElementById("battleMessage").textContent =
        "⚡ Арнайы күш " + damage + " зиян келтірді!";

    setTimeout(enemyAttack, 700);
}


// =========================
// ҚОРҒАНУ
// =========================

function defend() {

    if (enemy.hp <= 0 || player.hp <= 0) return;

    defending = true;

    document.getElementById("battleMessage").textContent =
        "🛡️ Қорғаныс іске қосылды!";

    setTimeout(enemyAttack, 700);
}


// =========================
// ҚАРСЫЛАСТЫҢ ШАБУЫЛЫ
// =========================

function enemyAttack() {

    if (player.hp <= 0 || enemy.hp <= 0) return;

    let damage = Math.floor(Math.random() * 11) + 5;

    if (defending) {

        damage = Math.floor(damage / 2);

        defending = false;
    }

    player.hp -= damage;

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


// =========================
// XP ҚОСУ
// =========================

function addXP(amount) {

    xp += amount;

    document.getElementById("battleMessage").textContent =
        "🏆 ЖЕҢІС! +" + amount + " XP";

    updateXP();

    setTimeout(function() {

        if (xp >= xpNeeded) {

            xp -= xpNeeded;

            level++;
            
            player.power += 10;

            setEnemy();
            
            updateXP();

            document.getElementById("battleMessage").textContent =
                "🎉 LEVEL UP! LEVEL " + level + "! Күш +10 ⚔️";
        }

    }, 1200);
}


// =========================
// XP КӨРСЕТУ
// =========================

function updateXP() {

    const percent = (xp / xpNeeded) * 100;

    const xpBar = document.getElementById("xpBar");

    if (xpBar) {
        xpBar.style.width = percent + "%";
    }

    const levelText = document.getElementById("levelText");

    if (levelText) {
        levelText.textContent =
            "⭐ LEVEL " + level;
    }

    const xpText = document.getElementById("xpText");

    if (xpText) {
        xpText.textContent =
            "XP: " + xp + " / " + xpNeeded;
    }
}


// =========================
// PLAYER HP
// =========================

function updatePlayerHP() {

    const percent =
        (player.hp / player.maxHP) * 100;

    document.getElementById("playerHP").style.width =
        percent + "%";

    document.getElementById("playerHPText").textContent =
        "❤️ " + player.hp + " / " + player.maxHP;
}


// =========================
// ENEMY HP
// =========================

function updateEnemyHP() {

    const percent =
        (enemy.hp / enemy.maxHP) * 100;

    document.getElementById("enemyHP").style.width =
        percent + "%";

    document.getElementById("enemyHPText").textContent =
        "❤️ " + enemy.hp + " / " + enemy.maxHP;
}


// =========================
// КЕЙІПКЕРЛЕРГЕ ҚАЙТУ
// =========================

function backToHeroes() {

    document.getElementById("battlePage").style.display =
        "none";

    document.getElementById("heroesPage").style.display =
        "block";
}
function setEnemy() {

    const index = Math.min(level - 1, enemies.length - 1);

    const data = enemies[index];

    enemy.name = data.name;
    enemy.maxHP = data.hp;
    enemy.hp = data.hp;
    enemy.power = data.power;
    enemy.icon = data.icon;

    const enemyName = document.getElementById("enemyName");
    const enemyIcon = document.getElementById("enemyIcon");

    if (enemyName) {
        enemyName.textContent = enemy.name;
    }

    if (enemyIcon) {
        enemyIcon.textContent = enemy.icon;
    }

    updateEnemyHP();
}
