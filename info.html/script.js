// ==========================================
// 1. DATABANK & TEMPLATES
// ==========================================

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
            "Ertsen & Mineralen": {
                icon: "💎",
                subcategories: {
                    "Valuables": [{ name: "Diamond" }, { name: "Gold Ingot" }, { name: "Iron Ingot" }, { name: "Ancient Debris" }]
                }
            },
            "Redstone": {
                icon: "🔴",
                subcategories: {
                    "Componenten": [{ name: "Redstone Dust" }, { name: "Repeater" }, { name: "Comparator" }, { name: "Piston" }]
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