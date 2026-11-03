// ==========================================
// 1. DATABANK & TEMPLATES
// ==========================================

const makeItems = (...names) => names.map(name => ({ name }));
const dyeColors = [
    "White", "Orange", "Magenta", "Light Blue", "Yellow", "Lime", "Pink",
    "Gray", "Light Gray", "Cyan", "Purple", "Blue", "Brown", "Green",
    "Red", "Black"
];
const woodTypes = [
    "Oak", "Birch", "Spruce", "Jungle", "Acacia", "Dark Oak", "Mangrove",
    "Cherry", "Bamboo", "Crimson", "Warped"
];
const woodConstructionItems = woodTypes.flatMap(wood => {
    const base = wood === "Bamboo"
        ? ["Bamboo Block", "Stripped Bamboo Block"]
        : wood === "Crimson" || wood === "Warped"
            ? [`${wood} Stem`, `Stripped ${wood} Stem`]
            : [`${wood} Log`, `Stripped ${wood} Log`];

    const items = [
        ...base,
        ...["Planks", "Stairs", "Slab", "Fence", "Fence Gate", "Door", "Trapdoor",
            "Button", "Pressure Plate", "Sign", "Hanging Sign"].map(suffix => `${wood} ${suffix}`)
    ];
    if (wood === "Bamboo") {
        items.push("Bamboo Mosaic", "Bamboo Mosaic Stairs", "Bamboo Mosaic Slab", "Bamboo Raft", "Bamboo Chest Raft");
    } else if (wood !== "Crimson" && wood !== "Warped") {
        items.push(`${wood} Boat`, `${wood} Chest Boat`);
    }
    return items;
});

const TEMPLATES = {
    template_starter: {
        name: "Starter Survival",
        data: {
            "Bouwblokken": {
                icon: "🪵",
                subcategories: {
                    "Hout": [{ name: "Oak Log" }, { name: "Oak Plank" }],
                    "Steen": [{ name: "Cobblestone" }, { name: "Stone Bricks" }]
                }
            },
            "Eten & Voedsel": {
                icon: "🌾",
                subcategories: {
                    "Oogst": [{ name: "Wheat" }, { name: "Carrot" }, { name: "Potato" }]
                }
            }
        }
    },
    template_mega: {
        name: "Mega Warehouse",
        data: {
            "Bouwblokken & Constructie": {
                icon: "🪵",
                subcategories: {
                    "Hout": makeItems(...woodConstructionItems),
                    "Steen": makeItems(
                        "Cobblestone", "Stone", "Smooth Stone", "Stone Bricks", "Granite", "Diorite",
                        "Andesite", "Deepslate", "Tuff", "Calcite", "Dripstone Block", "Mud Bricks"
                    ),
                    "Zand, Grind & Glas": makeItems(
                        "Sand", "Red Sand", "Gravel", "Glass", "Glass Pane", "Clay",
                        ...dyeColors.flatMap(color => [
                            `${color} Stained Glass`, `${color} Stained Glass Pane`,
                            `${color} Terracotta`, `${color} Concrete`, `${color} Concrete Powder`
                        ])
                    ),
                    "Nether & End": makeItems(
                        "Netherrack", "Basalt", "Polished Basalt", "Blackstone", "Polished Blackstone",
                        "End Stone", "End Stone Bricks", "Purpur Block", "Purpur Pillar", "Quartz Block",
                        "Nether Bricks", "Red Nether Bricks", "Crimson Nylium", "Warped Nylium"
                    )
                }
            },
            "Apparatuur & Uitrusting": {
                icon: "⚔️",
                subcategories: {
                    "Wapens & Gereedschap": makeItems(
                        "Sword", "Pickaxe", "Axe", "Shovel", "Hoe", "Bow", "Crossbow",
                        "Fishing Rod", "Trident", "Mace", "Shears", "Flint and Steel"
                    ),
                    "Harnas & Bescherming": makeItems(
                        "Helmet", "Chestplate", "Leggings", "Boots", "Shield", "Turtle Shell",
                        "Elytra", "Leather Horse Armor", "Iron Horse Armor", "Golden Horse Armor",
                        "Diamond Horse Armor", "Wolf Armor"
                    ),
                    "Magische uitrusting": makeItems(
                        "Enchanted Book", "Name Tag", "Lapis Lazuli", "Grindstone", "Anvil",
                        "Smithing Table", "Enchanting Table"
                    )
                }
            },
            "Eten & Landbouw": {
                icon: "🍎",
                subcategories: {
                    "Eten": makeItems(
                        "Cooked Beef", "Cooked Porkchop", "Cooked Chicken", "Cooked Mutton",
                        "Bread", "Golden Apple", "Enchanted Golden Apple", "Apple", "Carrot",
                        "Baked Potato", "Pumpkin Pie", "Cooked Cod", "Cooked Salmon"
                    ),
                    "Zaden & Gewassen": makeItems(
                        "Wheat Seeds", "Beetroot Seeds", "Melon Seeds", "Pumpkin Seeds",
                        "Sugar Cane", "Nether Wart", "Cocoa Beans", "Sweet Berries", "Glow Berries",
                        "Wheat", "Beetroot", "Melon", "Pumpkin"
                    ),
                    "Dierlijke producten": makeItems(
                        ...dyeColors.map(color => `${color} Wool`),
                        "Leather", "Feather", "Egg", "String", "Honeycomb", "Honey Bottle"
                    )
                }
            },
            "Ertsen & Waardevolle Spullen": {
                icon: "💎",
                subcategories: {
                    "Ertsen": makeItems(
                        "Coal Ore", "Deepslate Coal Ore", "Iron Ore", "Deepslate Iron Ore",
                        "Gold Ore", "Deepslate Gold Ore", "Copper Ore", "Deepslate Copper Ore",
                        "Redstone Ore", "Deepslate Redstone Ore", "Lapis Lazuli Ore",
                        "Deepslate Lapis Lazuli Ore", "Diamond Ore", "Deepslate Diamond Ore",
                        "Emerald Ore", "Deepslate Emerald Ore", "Nether Gold Ore", "Nether Quartz Ore",
                        "Ancient Debris"
                    ),
                    "Grondstoffen & Blokken": makeItems(
                        "Coal", "Charcoal", "Iron Ingot", "Gold Ingot", "Copper Ingot",
                        "Raw Iron", "Raw Gold", "Raw Copper", "Diamond", "Emerald",
                        "Netherite Ingot", "Block of Diamond", "Block of Gold", "Block of Iron",
                        "Block of Netherite", "Block of Coal", "Block of Copper", "Lapis Lazuli",
                        "Redstone Dust", "Quartz"
                    )
                }
            },
            "Redstone & Mechanismen": {
                icon: "🔴",
                subcategories: {
                    "Basis redstone": makeItems(
                        "Redstone Dust", "Redstone Torch", "Redstone Repeater",
                        "Redstone Comparator", "Redstone Block"
                    ),
                    "Activatoren": makeItems(
                        ...woodTypes.map(wood => `${wood} Button`),
                        "Stone Button", "Lever", ...woodTypes.map(wood => `${wood} Pressure Plate`),
                        "Stone Pressure Plate", "Light Weighted Pressure Plate",
                        "Heavy Weighted Pressure Plate", "Tripwire Hook", "Target Block",
                        "Sculk Sensor", "Calibrated Sculk Sensor"
                    ),
                    "Mechanismen": makeItems(
                        "Piston", "Sticky Piston", "Dropper", "Dispenser", "Hopper", "Observer",
                        "Crafter", "Daylight Detector", "Note Block", "TNT"
                    )
                }
            },
            "Brouwen & Magie": {
                icon: "🧪",
                subcategories: {
                    "Brouwen": makeItems(
                        "Brewing Stand", "Cauldron", "Glass Bottle", "Potion", "Splash Potion",
                        "Lingering Potion"
                    ),
                    "Ingrediënten": makeItems(
                        "Blaze Powder", "Ghast Tear", "Magma Cream", "Spider Eye",
                        "Fermented Spider Eye", "Glistering Melon Slice", "Golden Carrot",
                        "Phantom Membrane", "Dragon's Breath"
                    )
                }
            },
            "Natuur & Decoratie": {
                icon: "🌿",
                subcategories: {
                    "Planten & Bomen": makeItems(
                        ...woodTypes.filter(wood => wood !== "Bamboo" && wood !== "Crimson" && wood !== "Warped")
                            .flatMap(wood => [`${wood} Sapling`, `${wood} Leaves`]),
                        "Bamboo", "Crimson Fungus", "Warped Fungus", "Moss Block", "Azalea",
                        "Flowering Azalea", "Vines", "Cave Vines", "Glow Lichen",
                        "Brown Mushroom", "Red Mushroom", "Mangrove Propagule", "Fern",
                        "Grass", "Lily Pad", "Moss Carpet", "Dandelion", "Poppy",
                        "Blue Orchid", "Allium", "Azure Bluet", "Red Tulip", "Orange Tulip",
                        "White Tulip", "Pink Tulip", "Oxeye Daisy", "Cornflower",
                        "Lily of the Valley", "Torchflower", "Wither Rose", "Sunflower",
                        "Lilac", "Rose Bush", "Peony"
                    ),
                    "Decoratie": makeItems(
                        "Painting", "Banner", "Flower Pot", "Candle", "Lantern", "Soul Lantern",
                        "Bed", "Carpet", "Armor Stand", "Bell", "Item Frame", "Glow Item Frame",
                        "Campfire", "Soul Campfire", "Bookshelf", "Chiseled Bookshelf",
                        ...dyeColors.flatMap(color => [`${color} Candle`, `${color} Bed`, `${color} Carpet`, `${color} Banner`])
                    )
                }
            },
            "Mob Drops & Restanten": {
                icon: "💀",
                subcategories: {
                    "Mob Drops": makeItems(
                        "Rotten Flesh", "Bone", "Bone Meal", "Gunpowder", "Ender Pearl",
                        "Slimeball", "Blaze Rod", "Prismarine Shard", "Prismarine Crystals",
                        "Shulker Shell", "Wither Skeleton Skull", "Totem of Undying"
                    ),
                    "Overig": makeItems(
                        "Saddle", "Bucket", "Water Bucket", "Lava Bucket", "Milk Bucket",
                        "Sponge", "Wet Sponge"
                    )
                }
            }
        }
    }
};

let allStorages = JSON.parse(localStorage.getItem('mc_all_storages_v1')) || {
    "my_first_storage": {
        id: "my_first_storage",
        name: "Mijn Survival Base",
        isPublic: false,
        data: {
            "Bouwblokken": {
                icon: "🪵",
                subcategories: {
                    "Hout": [{ name: "Oak Log" }, { name: "Oak Plank" }],
                    "Steen": [{ name: "Cobblestone" }, { name: "Stone Bricks" }]
                }
            }
        }
    }
};

let communityStorages = [
    { name: "Ultimate Redstone Vault", author: "CraftMaster99" },
    { name: "Skyblock Storage Layout", author: "PixelSteve" }
];

let activeStorageId = localStorage.getItem('mc_active_storage_id') || "my_first_storage";
let currentCategory = null;
let currentSubCategory = null;
let currentPage = 'home';
let selectedIcon = '📦';

function saveAllStorages() {
    localStorage.setItem('mc_all_storages_v1', JSON.stringify(allStorages));
}

// ==========================================
// 2. INITIALISATIE & EVENT LISTENERS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {

    // --- DONKER / LICHT THEMA LADEN ---
    const savedTheme = localStorage.getItem('mc_theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }

    // --- HAMBURGER MENU (3 STREEPJES ☰) LOGICA ---
    const btnHamburger = document.getElementById('btnHamburger');
    const hamburgerMenu = document.getElementById('hamburgerMenu');

    if (btnHamburger && hamburgerMenu) {
        btnHamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburgerMenu.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            hamburgerMenu.classList.remove('show');
        });
    }

    // --- INSTELLINGEN PAGINA LOGICA (ACCOUNT & THEMA) ---
    const themeCheckbox = document.getElementById('themeCheckbox');
    const themeLabel = document.getElementById('themeLabel');

    if (themeCheckbox) {
        const isLight = document.body.classList.contains('light-mode');
        themeCheckbox.checked = isLight;
        if (themeLabel) {
            themeLabel.innerText = isLight ? "☀️ Lichte Modus" : "🌙 Donkere Modus";
        }

        themeCheckbox.addEventListener('change', () => {
            if (themeCheckbox.checked) {
                document.body.classList.add('light-mode');
                localStorage.setItem('mc_theme', 'light');
                if (themeLabel) themeLabel.innerText = "☀️ Lichte Modus";
            } else {
                document.body.classList.remove('light-mode');
                localStorage.setItem('mc_theme', 'dark');
                if (themeLabel) themeLabel.innerText = "🌙 Donkere Modus";
            }
        });
    }

    // Account instellen logica
    const accountNameInput = document.getElementById('accountNameInput');
    const btnSaveAccount = document.getElementById('btnSaveAccount');
    const accountStatus = document.getElementById('accountStatus');

    let registeredAccounts = JSON.parse(localStorage.getItem('mc_registered_accounts')) || [];
    let currentAccount = localStorage.getItem('mc_current_account') || "";

    if (accountNameInput) {
        accountNameInput.value = currentAccount;
        if (currentAccount && accountStatus) {
            accountStatus.innerText = `Spelersnaam op dit apparaat: ${currentAccount}`;
        }
    }

    if (btnSaveAccount) {
        const saveAccountAction = () => {
            const name = accountNameInput.value.trim();
            if (!name) {
                alert("Vul een spelersnaam in!");
                return;
            }

            let nameExists = registeredAccounts.some(acc => acc.toLowerCase() === name.toLowerCase());

            if (nameExists && currentAccount.toLowerCase() !== name.toLowerCase()) {
                alert("Deze naam is al opgeslagen in deze browser. Kies een andere naam.");
                accountNameInput.focus();
                return;
            }

            if (!nameExists) {
                registeredAccounts.push(name);
                localStorage.setItem('mc_registered_accounts', JSON.stringify(registeredAccounts));
            }

            localStorage.setItem('mc_current_account', name);
            currentAccount = name;
            if (accountStatus) {
                accountStatus.innerText = `Spelersnaam opgeslagen op dit apparaat: ${name}`;
            }
            alert(`Spelersnaam "${name}" opgeslagen in deze browser.`);
        };

        btnSaveAccount.addEventListener('click', saveAccountAction);
        accountNameInput.addEventListener('keydown', (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                saveAccountAction();
            }
        });
    }

    // Pagina detectie voor overige pagina's
    if (document.getElementById('myStorageList') || document.getElementById('welcomeUserTitle')) {
        initDashboard();
    } else if (document.getElementById('currentStorageTitle')) {
        initStoragePage();
    }
});


// ==========================================
// 3. CUSTOM MINECRAFT CONFIRM POP-UP
// ==========================================
function showMinecraftConfirm(bericht, onConfirmCallback) {
    const modal = document.getElementById('mcConfirmModal');
    const textEl = document.getElementById('mcConfirmText');
    const btnYes = document.getElementById('btnConfirmYes');
    const btnNo = document.getElementById('btnConfirmNo');

    if (!modal || !textEl) {
        if (confirm(bericht)) onConfirmCallback();
        return;
    }

    textEl.innerText = bericht;
    modal.style.display = 'flex';

    const newBtnYes = btnYes.cloneNode(true);
    const newBtnNo = btnNo.cloneNode(true);
    btnYes.parentNode.replaceChild(newBtnYes, btnYes);
    btnNo.parentNode.replaceChild(newBtnNo, btnNo);

    newBtnYes.addEventListener('click', () => {
        modal.style.display = 'none';
        onConfirmCallback();
    });

    newBtnNo.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}


// ==========================================
// 4. DASHBOARD LOGICA (startpagina.html)
// ==========================================
function initDashboard() {
    renderMyStorages();
    renderCommunityStorages();

    // --- WELKOM BERICHT MET ACCOUNTNAAM ---
    const welcomeTitle = document.getElementById("welcomeUserTitle");
    const currentAccount = localStorage.getItem('mc_current_account');

    if (welcomeTitle) {
        if (currentAccount) {
            welcomeTitle.innerText = `Welkom, ${currentAccount}!`;
        } else {
            welcomeTitle.innerText = `Welkom, Speler! (Stel je spelersnaam in bij Instellingen)`;
        }
    }

    const btnOpenModal = document.getElementById("btnOpenNewStorageModal");
    const btnCancelModal = document.getElementById("btnCancelStorage");
    const btnCreateStorage = document.getElementById("btnCreateStorage");
    const modal = document.getElementById("newStorageModal");
    const nameInput = document.getElementById("newStorageName");

    if (btnOpenModal) {
        btnOpenModal.addEventListener("click", () => {
            modal.style.display = "flex";
            if (nameInput) nameInput.focus();
        });
    }

    if (btnCancelModal) {
        btnCancelModal.addEventListener("click", () => modal.style.display = "none");
    }

    const executeCreate = () => {
        const typeSelect = document.getElementById("newStorageType");
        const name = nameInput.value.trim();

        if (!name) {
            alert("Vul een naam in voor je storage!");
            return;
        }

        for (let id in allStorages) {
            if (allStorages[id].name.toLowerCase() === name.toLowerCase()) {
                alert("Er bestaat al een storage met deze naam! Kies een andere naam.");
                nameInput.focus();
                return;
            }
        }

        let newId = "storage_" + Date.now();
        let newData = {};

        if (typeSelect.value !== "empty" && TEMPLATES[typeSelect.value]) {
            newData = JSON.parse(JSON.stringify(TEMPLATES[typeSelect.value].data));
        }

        allStorages[newId] = {
            id: newId,
            name: name,
            isPublic: false,
            data: newData
        };

        saveAllStorages();
        nameInput.value = "";
        modal.style.display = "none";
        renderMyStorages();
    };

    if (btnCreateStorage) {
        btnCreateStorage.addEventListener("click", executeCreate);
    }

    if (nameInput) {
        nameInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                executeCreate();
            }
        });
    }
}

function renderMyStorages() {
    const container = document.getElementById("myStorageList");
    if (!container) return;
    container.innerHTML = "";

    for (let id in allStorages) {
        const item = allStorages[id];
        const card = document.createElement("div");
        card.style.cssText = "display: flex; justify-content: space-between; align-items: center; background: rgba(37,37,37,0.9); padding: 12px; border: 3px solid #555;";

        card.innerHTML = `
            <div>
                <strong style="color: #fff; font-size: 1.5rem;">${item.name}</strong>
                <span style="font-size: 1.1rem; color: ${item.isPublic ? '#55ff55' : '#ff5555'}; margin-left: 10px;">
                    ${item.isPublic ? '🌐 Openbaar' : '🔒 Privé'}
                </span>
            </div>
            <div style="display: flex; gap: 8px;">
                <button class="mc-button" onclick="openStorage('${id}')" style="background-color: #55ff55; color: #000; font-size: 1.3rem;">OPENEN</button>
                <button class="mc-button" onclick="togglePrivacyDashboard('${id}')" style="font-size: 1.3rem;">${item.isPublic ? 'Privé' : 'Openbaar'}</button>
                <button class="mc-button" onclick="deleteStorage('${id}')" style="background-color: #ff5555; color: #fff; font-size: 1.3rem;">✖</button>
            </div>
        `;
        container.appendChild(card);
    }
}

function renderCommunityStorages() {
    const container = document.getElementById("communityStorageList");
    if (!container) return;
    container.innerHTML = "";

    communityStorages.forEach(item => {
        const card = document.createElement("div");
        card.style.cssText = "display: flex; justify-content: space-between; align-items: center; background: rgba(37,37,37,0.9); padding: 12px; border: 3px solid #555;";
        card.innerHTML = `
            <div>
                <strong style="color: #fff; font-size: 1.4rem;">${item.name}</strong>
                <span style="color: #aaa; font-size: 1.1rem;"> door ${item.author}</span>
            </div>
            <button class="mc-button" onclick="alert('Binnenkort kun je storage van anderen bekijken!')" style="font-size: 1.3rem;">BEKIJKEN</button>
        `;
        container.appendChild(card);
    });
}

function openStorage(id) {
    localStorage.setItem('mc_active_storage_id', id);
    window.location.href = "storage.html";
}

function togglePrivacyDashboard(id) {
    if (allStorages[id]) {
        allStorages[id].isPublic = !allStorages[id].isPublic;
        saveAllStorages();
        renderMyStorages();
    }
}

function deleteStorage(id) {
    if (Object.keys(allStorages).length <= 1) {
        alert("Je kunt je laatste storage niet verwijderen!");
        return;
    }

    showMinecraftConfirm("Weet je zeker dat je deze storage wilt verwijderen?", () => {
        delete allStorages[id];
        saveAllStorages();
        renderMyStorages();
    });
}


// ==========================================
// 5. STORAGE PAGINA LOGICA (storage.html)
// ==========================================
function initStoragePage() {
    if (!allStorages[activeStorageId]) {
        activeStorageId = Object.keys(allStorages)[0];
    }

    const currentStorage = allStorages[activeStorageId];
    const titleEl = document.getElementById("currentStorageTitle");
    const btnPrivacy = document.getElementById("btnTogglePrivacy");

    if (titleEl) titleEl.innerText = currentStorage.name;
    updatePrivacyButton();

    if (btnPrivacy) {
        btnPrivacy.addEventListener("click", () => {
            currentStorage.isPublic = !currentStorage.isPublic;
            saveAllStorages();
            updatePrivacyButton();
        });
    }

    const btnGoCat = document.getElementById("btnGoCategories");
    if (btnGoCat) btnGoCat.addEventListener("click", () => navigateTo('categories'));

    const btnAddDynamic = document.getElementById("btnDynamicAdd");
    if (btnAddDynamic) btnAddDynamic.addEventListener("click", handleDynamicAdd);

    const dynamicInput = document.getElementById("dynamicInput");
    if (dynamicInput) {
        dynamicInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleDynamicAdd();
            }
        });
    }

    const searchInput = document.getElementById("homeSearchInput");
    if (searchInput) searchInput.addEventListener("input", searchItems);

    updateBreadcrumb();
}

function updatePrivacyButton() {
    const btnPrivacy = document.getElementById("btnTogglePrivacy");
    if (!btnPrivacy) return;
    const currentStorage = allStorages[activeStorageId];
    btnPrivacy.innerText = currentStorage.isPublic ? "🌐 Openbaar" : "🔒 Privé";
    btnPrivacy.style.backgroundColor = currentStorage.isPublic ? "#55ff55" : "#ff5555";
    btnPrivacy.style.color = currentStorage.isPublic ? "#000" : "#fff";
}

function getActiveData() {
    return allStorages[activeStorageId].data;
}

function navigateTo(pageId) {
    currentPage = pageId;
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));

    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) targetPage.classList.add('active');

    const addActionBox = document.getElementById('addActionBox');
    const input = document.getElementById('dynamicInput');
    const title = document.getElementById('addActionTitle');

    if (pageId === 'home') {
        if (addActionBox) addActionBox.style.display = 'none';
        currentCategory = null;
        currentSubCategory = null;
    } else {
        if (addActionBox) addActionBox.style.display = 'block';
        if (pageId === 'categories') {
            title.innerText = "HOOFD TOEVOEGEN";
            input.placeholder = "Naam hoofd...";
        } else if (pageId === 'subcategories') {
            title.innerText = "SUB TOEVOEGEN";
            input.placeholder = "Naam sub...";
        } else if (pageId === 'items') {
            title.innerText = "ITEM TOEVOEGEN";
            input.placeholder = "Naam item...";
        }
    }

    if (pageId === 'categories') renderCategories();
    if (pageId === 'subcategories') renderSubCategories();
    if (pageId === 'items') renderItems();

    updateBreadcrumb();
}

function handleDynamicAdd() {
    const input = document.getElementById('dynamicInput');
    const value = input.value.trim();
    if (!value) return;

    let storageData = getActiveData();

    if (currentPage === 'categories') {
        if (!storageData[value]) {
            storageData[value] = { icon: selectedIcon, subcategories: {} };
            saveAllStorages();
            renderCategories();
        }
    } else if (currentPage === 'subcategories') {
        if (currentCategory && !storageData[currentCategory].subcategories[value]) {
            storageData[currentCategory].subcategories[value] = [];
            saveAllStorages();
            renderSubCategories();
        }
    } else if (currentPage === 'items') {
        if (currentCategory && currentSubCategory) {
            if (!Array.isArray(storageData[currentCategory].subcategories[currentSubCategory])) {
                storageData[currentCategory].subcategories[currentSubCategory] = [];
            }
            storageData[currentCategory].subcategories[currentSubCategory].push({ name: value });
            saveAllStorages();
            renderItems();
        }
    }
    input.value = '';
}

function updateBreadcrumb() {
    const container = document.getElementById('verticalBreadcrumb');
    if (!container) return;

    let html = `<span class="mc-breadcrumb-link" onclick="navigateTo('home')">START</span>`;

    if (currentPage !== 'home') {
        html += `<span class="mc-breadcrumb-arrow-down">↓</span>`;
        html += `<span class="mc-breadcrumb-link" onclick="navigateTo('categories')">HOOFD</span>`;
    }

    if (currentCategory && (currentPage === 'subcategories' || currentPage === 'items')) {
        html += `<span class="mc-breadcrumb-arrow-down">↓</span>`;
        html += `<span class="mc-breadcrumb-link" onclick="openCategory('${currentCategory}')">${currentCategory.toUpperCase()}</span>`;
    }

    if (currentSubCategory && currentPage === 'items') {
        html += `<span class="mc-breadcrumb-arrow-down">↓</span>`;
        html += `<span style="color: #ffffff;">${currentSubCategory.toUpperCase()}</span>`;
    }

    container.innerHTML = html;
}

function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    let storageData = getActiveData();

    for (let name in storageData) {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.onclick = () => openCategory(name);
        card.innerHTML = `
            <div class="category-icon">${storageData[name].icon || '📦'}</div>
            <div class="category-title">${name}</div>
        `;
        grid.appendChild(card);
    }
}

function openCategory(catName) {
    currentCategory = catName;
    const subTitle = document.getElementById('subCategoryTitle');
    if (subTitle) subTitle.innerText = `SUBCATEGORIEËN IN ${catName.toUpperCase()}`;
    navigateTo('subcategories');
}

function renderSubCategories() {
    const grid = document.getElementById('subCategoriesGrid');
    if (!grid || !currentCategory) return;
    grid.innerHTML = '';

    let storageData = getActiveData();
    const subs = storageData[currentCategory].subcategories;
    for (let subName in subs) {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.onclick = () => openSubCategory(subName);
        card.innerHTML = `
            <div class="category-icon">📂</div>
            <div class="category-title">${subName}</div>
        `;
        grid.appendChild(card);
    }
}

function openSubCategory(subName) {
    currentSubCategory = subName;
    const itemsTitle = document.getElementById('itemsPageTitle');
    if (itemsTitle) itemsTitle.innerText = `ITEMS IN ${subName.toUpperCase()}`;
    navigateTo('items');
}

function renderItems() {
    const grid = document.getElementById('itemsGrid');
    if (!grid || !currentCategory || !currentSubCategory) return;
    grid.innerHTML = '';

    let storageData = getActiveData();
    let items = storageData[currentCategory].subcategories[currentSubCategory];

    if (!items || items.length === 0) {
        grid.innerHTML = '<div style="color: #AAA; font-size: 1.4rem;">Nog geen items.</div>';
        return;
    }

    items.forEach((item, index) => {
        let itemName = typeof item === 'object' ? item.name : item;

        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <span class="item-name">${itemName}</span>
            <button class="delete-btn" onclick="deleteItem(${index})">✖</button>
        `;
        grid.appendChild(card);
    });
}

function deleteItem(index) {
    showMinecraftConfirm("Weet je zeker dat je dit item wilt verwijderen?", () => {
        const itemCards = document.querySelectorAll('#itemsGrid .item-card');
        const targetCard = itemCards[index];

        if (targetCard) {
            const pickaxeOverlay = document.createElement('span');
            pickaxeOverlay.innerText = ' ⛏️';
            pickaxeOverlay.style.fontSize = '1.5rem';
            targetCard.appendChild(pickaxeOverlay);

            targetCard.classList.add('mining-out');

            setTimeout(() => {
                if (currentCategory && currentSubCategory) {
                    let storageData = getActiveData();
                    storageData[currentCategory].subcategories[currentSubCategory].splice(index, 1);
                    saveAllStorages();
                    renderItems();
                }
            }, 500);
        } else {
            let storageData = getAllStorages();
            storageData[currentCategory].subcategories[currentSubCategory].splice(index, 1);
            saveAllStorages();
            renderItems();
        }
    });
}

function searchItems() {
    const query = document.getElementById('homeSearchInput').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer) return;
    resultsContainer.innerHTML = '';

    if (!query) {
        resultsContainer.style.display = 'none';
        return;
    }

    let storageData = getActiveData();
    let matches = [];
    for (let catName in storageData) {
        for (let subName in storageData[catName].subcategories) {
            let itemList = storageData[catName].subcategories[subName];
            if (Array.isArray(itemList)) {
                itemList.forEach(item => {
                    let itemName = typeof item === 'object' ? item.name : item;
                    if (itemName.toLowerCase().includes(query)) {
                        matches.push({ item: itemName, category: catName, subCategory: subName });
                    }
                });
            }
        }
    }

    if (matches.length > 0) {
        resultsContainer.style.display = 'block';
        matches.forEach(match => {
            const itemEl = document.createElement('div');
            itemEl.className = 'search-item';
            itemEl.style.cssText = "padding: 8px; cursor: pointer; border-bottom: 1px solid #444;";
            itemEl.innerHTML = `
                <span style="font-size: 1.3rem;">📦 <b>${match.item}</b></span><br>
                <span class="search-item-path" style="color: #aaa; font-size: 1.1rem;">${match.category} ➔ ${match.subCategory}</span>
            `;
            itemEl.onclick = () => {
                currentCategory = match.category;
                openSubCategory(match.subCategory);
                clearSearch();
            };
            resultsContainer.appendChild(itemEl);
        });
    } else {
        resultsContainer.style.display = 'block';
        resultsContainer.innerHTML = '<div style="padding: 8px; color: #888; font-size: 1.2rem;">Geen items...</div>';
    }
}

function clearSearch() {
    const searchInput = document.getElementById('homeSearchInput');
    const resultsContainer = document.getElementById('searchResults');
    if (searchInput) searchInput.value = '';
    if (resultsContainer) resultsContainer.style.display = 'none';
}