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
const starterWoodItems = woodConstructionItems.filter(item =>
    /(?:Log|Stem|Planks|Stairs|Fence|Fence Gate|Door)$/.test(item) || item === "Bamboo Block"
);

const TEMPLATES = {
    template_starter: {
        name: "Starter Survival",
        data: {
            "Bouwblokken & Constructie": {
                icon: "🪵",
                subcategories: {
                    "Hout": makeItems(...starterWoodItems),
                    "Steen": makeItems(
                        "Cobblestone", "Stone Bricks", "Granite", "Diorite", "Andesite", "Deepslate", "Tuff"
                    ),
                    "Zand, Grind & Glas": makeItems(
                        "Sand", "Red Sand", "Gravel", "Glass",
                        ...dyeColors.map(color => `${color} Stained Glass`)
                    ),
                    "Nether & End": makeItems(
                        "Netherrack", "Basalt", "Blackstone", "End Stone", "Purpur Block"
                    )
                }
            },
            "Apparatuur & Uitrusting": {
                icon: "⚔️",
                subcategories: {
                    "Wapens & Gereedschap": makeItems(
                        "Sword", "Pickaxe", "Axe", "Shovel", "Bow", "Fishing Rod"
                    ),
                    "Harnas & Bescherming": makeItems(
                        "Helmet", "Chestplate", "Leggings", "Boots", "Shield"
                    ),
                    "Waardevol & Magie": makeItems(
                        "Enchanted Book", "Name Tag", "Lapis Lazuli", "Bell"
                    )
                }
            },
            "Eten & Landbouw": {
                icon: "🍎",
                subcategories: {
                    "Eten": makeItems(
                        "Cooked Beef", "Cooked Porkchop", "Cooked Chicken", "Cooked Mutton",
                        "Bread", "Apple", "Golden Apple", "Carrot"
                    ),
                    "Zaden & Gewassen": makeItems(
                        "Wheat Seeds", "Beetroot Seeds", "Melon Seeds", "Pumpkin Seeds",
                        "Sugar Cane", "Nether Wart", "Sweet Berries", "Glow Berries"
                    ),
                    "Dierlijke producten": makeItems(
                        ...dyeColors.map(color => `${color} Wool`),
                        "Leather", "Feather", "Egg", "String"
                    )
                }
            },
            "Ertsen & Mineralen": {
                icon: "💎",
                subcategories: {
                    "Grondstoffen": makeItems(
                        "Coal", "Iron Ore", "Iron Ingot", "Gold Ore", "Gold Ingot",
                        "Copper Ore", "Copper Ingot", "Raw Copper", "Diamond", "Emerald",
                        "Netherite Ingot"
                    )
                }
            },
            "Redstone & Mechanismen": {
                icon: "🔴",
                subcategories: {
                    "Redstone Onderdelen": makeItems(
                        "Redstone Dust", "Redstone Torch", "Redstone Repeater",
                        "Redstone Comparator", "Redstone Block"
                    ),
                    "Mechanismen": makeItems(
                        "Piston", "Hopper", "Dispenser", "Dropper",
                        ...woodTypes.map(wood => `${wood} Button`), "Stone Button", "Lever"
                    )
                }
            },
            "Brouwen & Magie": {
                icon: "🧪",
                subcategories: {
                    "Brouwen": makeItems(
                        "Brewing Stand", "Cauldron", "Glass Bottle", "Potion"
                    ),
                    "Ingrediënten": makeItems(
                        "Blaze Powder", "Ghast Tear", "Magma Cream", "Spider Eye"
                    )
                }
            },
            "Natuur & Decoratie": {
                icon: "🌿",
                subcategories: {
                    "Planten & Bomen": makeItems(
                        ...woodTypes.filter(wood => wood !== "Bamboo" && wood !== "Crimson" && wood !== "Warped")
                            .flatMap(wood => [`${wood} Sapling`, `${wood} Leaves`]),
                        "Bamboo", "Moss Block", "Brown Mushroom", "Red Mushroom",
                        "Dandelion", "Poppy", "Blue Orchid", "Allium", "Azure Bluet",
                        "Red Tulip", "Orange Tulip", "White Tulip", "Pink Tulip",
                        "Oxeye Daisy", "Cornflower", "Lily of the Valley"
                    ),
                    "Decoratie": makeItems(
                        "Painting", "Banner", "Candle", "Lantern", "Soul Lantern",
                        "Bed", "Carpet",
                        ...dyeColors.flatMap(color => [
                            `${color} Banner`, `${color} Candle`, `${color} Bed`, `${color} Carpet`
                        ])
                    )
                }
            },
            "Mob Drops & Restanten": {
                icon: "💀",
                subcategories: {
                    "Mob Drops": makeItems(
                        "Rotten Flesh", "Bone", "Gunpowder", "Ender Pearl", "Slimeball"
                    ),
                    "Diversen": makeItems(
                        "Saddle", "Bucket", "Water Bucket", "Lava Bucket"
                    )
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

let allStorages = {};
let communityStorages = [];
let currentUser = null;
let currentProfileName = "";
let currentUsername = "";
let isReadOnlyStorage = false;
let activeStorageId = localStorage.getItem('mc_active_storage_id') || "";
let currentCategory = null;
let currentSubCategory = null;
let currentPage = 'home';
let selectedIcon = '📦';
let supabaseClient = null;
let loadedUserId = null;
let pendingAppNotice = "";
const storageSaveQueues = new Map();

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

function isStorageDataValid(data) {
    if (!data || typeof data !== "object" || Array.isArray(data)) return false;
    return Object.values(data).every(category =>
        category && typeof category === "object" && !Array.isArray(category) &&
        category.subcategories && typeof category.subcategories === "object" &&
        !Array.isArray(category.subcategories) &&
        Object.values(category.subcategories).every(items =>
            Array.isArray(items) && items.every(item =>
                typeof item === "string" ||
                (item && typeof item === "object" && typeof item.name === "string")
            )
        )
    );
}

function showAppNotice(message, isError = false) {
    let notice = document.getElementById("appNotice");
    if (!notice) {
        notice = document.createElement("div");
        notice.id = "appNotice";
        notice.className = "app-notice";
        notice.setAttribute("role", "status");
        document.body.appendChild(notice);
    }
    notice.textContent = message;
    notice.classList.toggle("app-notice-error", isError);
    notice.style.display = message ? "block" : "none";
}

function createAuthUi() {
    const overlay = document.createElement("div");
    overlay.id = "authOverlay";
    overlay.className = "auth-overlay";
    overlay.style.display = "flex";
    overlay.innerHTML = `
        <form id="authForm" class="auth-box">
            <h1 class="auth-title">⛏️ CHESTCRAFT</h1>
            <p id="authDescription">Log in om je storages online te gebruiken.</p>
            <label for="authUsername">Gebruikersnaam of e-mailadres</label>
            <input id="authUsername" class="mc-input" type="text" maxlength="254" autocomplete="username" required placeholder="Jouw gebruikersnaam">
            <label id="displayNameLabel" for="authDisplayName" hidden>Spelersnaam</label>
            <input id="authDisplayName" class="mc-input" type="text" maxlength="32" autocomplete="nickname" placeholder="Spelersnaam" hidden>
            <label id="authEmailLabel" for="authEmail" hidden>E-mailadres (voor bevestiging en accountherstel)</label>
            <input id="authEmail" class="mc-input" type="email" autocomplete="email" placeholder="jij@voorbeeld.nl" hidden>
            <label for="authPassword">Wachtwoord</label>
            <input id="authPassword" class="mc-input" type="password" minlength="8" autocomplete="current-password" required placeholder="Minimaal 8 tekens">
            <label class="auth-password-toggle"><input id="showAuthPassword" type="checkbox"> Wachtwoord tonen</label>
            <p id="authStatus" class="auth-status" role="status"></p>
            <button id="authSubmit" class="mc-button full-width" type="submit">INLOGGEN</button>
            <button id="forgotPasswordButton" class="mc-button full-width auth-secondary" type="button">Wachtwoord vergeten?</button>
            <button id="authModeToggle" class="mc-button full-width auth-secondary" type="button">Nog geen account? Registreren</button>
        </form>`;
    document.body.appendChild(overlay);

    const form = overlay.querySelector("#authForm");
    const username = overlay.querySelector("#authUsername");
    const displayName = overlay.querySelector("#authDisplayName");
    const displayNameLabel = overlay.querySelector("#displayNameLabel");
    const email = overlay.querySelector("#authEmail");
    const emailLabel = overlay.querySelector("#authEmailLabel");
    const password = overlay.querySelector("#authPassword");
    const showPassword = overlay.querySelector("#showAuthPassword");
    const showPasswordLabel = showPassword.closest("label");
    const submit = overlay.querySelector("#authSubmit");
    const modeToggle = overlay.querySelector("#authModeToggle");
    const forgotButton = overlay.querySelector("#forgotPasswordButton");
    let mode = "login";

    const renderMode = () => {
        const registering = mode === "register";
        const recovering = mode === "forgot";
        username.hidden = registering || recovering;
        overlay.querySelector('label[for="authUsername"]').hidden = registering || recovering;
        username.required = !registering && !recovering;
        username.placeholder = registering ? "Kies een gebruikersnaam (3-20 tekens)" : "Gebruikersnaam of e-mailadres";
        overlay.querySelector('label[for="authUsername"]').textContent = registering
            ? "Gebruikersnaam"
            : "Gebruikersnaam of e-mailadres";
        displayName.hidden = !registering;
        displayName.required = registering;
        displayNameLabel.hidden = !registering;
        email.hidden = !registering && !recovering;
        emailLabel.hidden = !registering && !recovering;
        email.required = registering || recovering;
        password.hidden = recovering;
        password.required = !recovering;
        showPasswordLabel.hidden = recovering;
        showPassword.checked = false;
        password.type = "password";
        password.autocomplete = registering ? "new-password" : "current-password";
        submit.textContent = registering ? "ACCOUNT AANMAKEN" : recovering ? "RESETLINK VERSTUREN" : "INLOGGEN";
        modeToggle.hidden = false;
        modeToggle.textContent = recovering
            ? "Terug naar inloggen"
            : registering
                ? "Heb je al een account? Inloggen"
                : "Nog geen account? Registreren";
        forgotButton.hidden = registering || recovering;
        overlay.querySelector("#authDescription").textContent = registering
            ? "Maak een account om je storages online op te slaan."
            : recovering
                ? "Vul het e-mailadres van je account in. We sturen een herstel-link als het adres bij een account hoort."
                : "Log in om je storages online te gebruiken.";
        overlay.querySelector("#authStatus").textContent = "";
    };

    showPassword.addEventListener("change", () => {
        password.type = showPassword.checked ? "text" : "password";
    });

    modeToggle.addEventListener("click", () => {
        mode = mode === "forgot" ? "login" : mode === "register" ? "login" : "register";
        renderMode();
    });

    forgotButton.addEventListener("click", () => {
        mode = "forgot";
        renderMode();
    });

    form.addEventListener("submit", async event => {
        event.preventDefault();
        const status = overlay.querySelector("#authStatus");
        submit.disabled = true;
        modeToggle.disabled = true;
        forgotButton.disabled = true;
        status.textContent = "Even wachten...";

        try {
            const identity = username.value.trim();
            const passwordValue = password.value;
            if (mode === "forgot") {
                const { error } = await supabaseClient.auth.resetPasswordForEmail(email.value.trim(), {
                    redirectTo: window.CHESTCRAFT_SUPABASE_CONFIG.emailRedirectUrl
                });
                if (error) throw error;
                status.textContent = "Als dit e-mailadres bij een account hoort, ontvang je een wachtwoord-resetlink. Controleer ook je spammap.";
            } else if (mode === "register") {
                const normalizedUsername = identity.toLowerCase();
                if (!/^[a-z0-9_]{3,20}$/.test(normalizedUsername)) {
                    throw new Error("Kies een gebruikersnaam van 3-20 tekens met alleen letters, cijfers of _.");
                }
                const name = displayName.value.trim();
                if (!name) throw new Error("Vul je spelersnaam in.");
                if (name.length > 32) throw new Error("Je spelersnaam mag maximaal 32 tekens zijn.");
                const { data, error } = await supabaseClient.auth.signUp({
                    email: email.value.trim(),
                    password: passwordValue,
                    options: {
                        data: { display_name: name, username: normalizedUsername },
                        emailRedirectTo: window.CHESTCRAFT_SUPABASE_CONFIG.emailRedirectUrl
                    }
                });
                if (error) throw error;
                if (!data.session) {
                    status.textContent = "Account aangemaakt. Bevestig je e-mailadres via de mail om in te loggen.";
                } else {
                    status.textContent = "Account aangemaakt.";
                }
            } else {
                if (identity.includes("@")) {
                    const { error } = await supabaseClient.auth.signInWithPassword({
                        email: identity,
                        password: passwordValue
                    });
                    if (error) throw error;
                } else {
                    const { data, error } = await supabaseClient.functions.invoke("login-with-username", {
                        body: { username: identity, password: passwordValue }
                    });
                    if (error) throw error;
                    const { error: sessionError } = await supabaseClient.auth.setSession({
                        access_token: data.access_token,
                        refresh_token: data.refresh_token
                    });
                    if (sessionError) throw sessionError;
                }
                status.textContent = "";
            }
        } catch (error) {
            status.textContent = error.message || "Inloggen is niet gelukt. Probeer het opnieuw.";
        } finally {
            submit.disabled = false;
            modeToggle.disabled = false;
            forgotButton.disabled = false;
        }
    });
    renderMode();
    return overlay;
}

function createPasswordRecoveryUi() {
    let overlay = document.getElementById("passwordRecoveryOverlay");
    if (overlay) {
        overlay.style.display = "flex";
        return;
    }

    overlay = document.createElement("div");
    overlay.id = "passwordRecoveryOverlay";
    overlay.className = "auth-overlay";
    overlay.style.display = "flex";
    overlay.innerHTML = `
        <form id="passwordRecoveryForm" class="auth-box">
            <h1 class="auth-title">NIEUW WACHTWOORD</h1>
            <p>Kies een nieuw wachtwoord van minimaal 8 tekens.</p>
            <label for="newPassword">Nieuw wachtwoord</label>
            <input id="newPassword" class="mc-input" type="password" minlength="8" maxlength="128" autocomplete="new-password" required>
            <label for="confirmNewPassword">Herhaal nieuw wachtwoord</label>
            <input id="confirmNewPassword" class="mc-input" type="password" minlength="8" maxlength="128" autocomplete="new-password" required>
            <label class="auth-password-toggle"><input id="showRecoveryPasswords" type="checkbox"> Wachtwoorden tonen</label>
            <p id="passwordRecoveryStatus" class="auth-status" role="status"></p>
            <button id="passwordRecoverySubmit" class="mc-button full-width" type="submit">WACHTWOORD OPSLAAN</button>
        </form>`;
    document.body.appendChild(overlay);

    const showPasswords = overlay.querySelector("#showRecoveryPasswords");
    showPasswords.addEventListener("change", () => {
        const type = showPasswords.checked ? "text" : "password";
        overlay.querySelector("#newPassword").type = type;
        overlay.querySelector("#confirmNewPassword").type = type;
    });

    overlay.querySelector("#passwordRecoveryForm").addEventListener("submit", async event => {
        event.preventDefault();
        const status = overlay.querySelector("#passwordRecoveryStatus");
        const submit = overlay.querySelector("#passwordRecoverySubmit");
        const newPassword = overlay.querySelector("#newPassword").value;
        const confirmPassword = overlay.querySelector("#confirmNewPassword").value;
        if (newPassword !== confirmPassword) {
            status.textContent = "De wachtwoorden komen niet overeen.";
            return;
        }

        submit.disabled = true;
        status.textContent = "Wachtwoord wordt bijgewerkt...";
        try {
            const { error } = await supabaseClient.auth.updateUser({ password: newPassword });
            if (error) throw error;
            status.textContent = "Je wachtwoord is gewijzigd. Je wordt ingelogd...";
            overlay.style.display = "none";
            const { data, error: userError } = await supabaseClient.auth.getUser();
            if (userError) throw userError;
            await initializeAuthenticatedApp(data.user);
        } catch (error) {
            overlay.style.display = "flex";
            status.textContent = error.message || "Wachtwoord wijzigen is niet gelukt. Vraag een nieuwe resetlink aan.";
        } finally {
            submit.disabled = false;
        }
    });
}

function addAccountMenuItem() {
    const menu = document.getElementById("hamburgerMenu");
    if (!menu || document.getElementById("signOutButton")) return;

    const accountLabel = document.createElement("div");
    accountLabel.id = "signedInAccount";
    accountLabel.className = "menu-account-label";
    accountLabel.textContent = currentProfileName || currentUser.email;
    menu.appendChild(accountLabel);

    const signOutButton = document.createElement("button");
    signOutButton.id = "signOutButton";
    signOutButton.className = "mc-button full-width menu-sign-out";
    signOutButton.textContent = "UITLOGGEN";
    signOutButton.addEventListener("click", async () => {
        try {
            const { error } = await supabaseClient.auth.signOut();
            if (error) throw error;
        } catch (error) {
            showAppNotice(`Uitloggen is niet gelukt: ${error.message}`, true);
        }
    });
    menu.appendChild(signOutButton);
}

async function loadStorageRows() {
    const { data, error } = await supabaseClient
        .from("storages")
        .select("id, owner_id, name, is_public, data")
        .eq("owner_id", currentUser.id)
        .order("created_at", { ascending: true });
    if (error) throw error;
    if (!data.every(row => isStorageDataValid(row.data))) {
        throw new Error("Een of meer storages bevatten ongeldige gegevens.");
    }

    let rows = data;
    if (!rows.length) {
        const savedLocalData = localStorage.getItem("mc_all_storages_v1");
        const localDataAlreadyImported = localStorage.getItem("mc_all_storages_v1_imported") === "true";
        if (savedLocalData && !localDataAlreadyImported &&
            window.confirm("Ik heb lokale demo-storages gevonden. Wil je deze eenmalig importeren naar dit account?")) {
            let localStorages;
            try {
                localStorages = JSON.parse(savedLocalData);
            } catch {
                throw new Error("De lokale demo-storages zijn beschadigd en kunnen niet worden geïmporteerd.");
            }
            if (!localStorages || typeof localStorages !== "object" || Array.isArray(localStorages)) {
                throw new Error("De lokale demo-storages hebben een ongeldig formaat.");
            }
            const importCandidates = Object.entries(localStorages)
                .filter(([, storage]) => storage && typeof storage.name === "string" && storage.data &&
                    isStorageDataValid(storage.data));
            const importedRows = importCandidates.map(([, storage]) => ({
                owner_id: currentUser.id,
                name: storage.name.trim().slice(0, 80) || "Geïmporteerde storage",
                is_public: false,
                data: storage.data
            }));
            if (!importedRows.length) {
                throw new Error("Er zijn geen geldige storages gevonden om te importeren.");
            }
            const { data: imported, error: importError } = await supabaseClient
                .from("storages")
                .insert(importedRows)
                .select("id, owner_id, name, is_public, data");
            if (importError) throw importError;
            const oldActiveId = activeStorageId;
            const activeIndex = importCandidates.findIndex(([id]) => id === oldActiveId);
            if (activeIndex >= 0 && imported[activeIndex]) {
                activeStorageId = imported[activeIndex].id;
                localStorage.setItem("mc_active_storage_id", activeStorageId);
            }
            localStorage.setItem("mc_all_storages_v1_imported", "true");
            rows = imported;
            pendingAppNotice = `${imported.length} lokale storage(s) veilig als privé geïmporteerd.`;
        }
    }

    allStorages = Object.fromEntries(rows.map(row => [row.id, {
        id: row.id,
        ownerId: row.owner_id,
        name: row.name,
        isPublic: row.is_public,
        data: row.data
    }]));
}

async function loadCommunityStorages() {
    const { data, error } = await supabaseClient
        .from("storages")
        .select("id, owner_id, name, created_at")
        .eq("is_public", true)
        .neq("owner_id", currentUser.id)
        .order("created_at", { ascending: false })
        .limit(50);
    if (error) throw error;

    const ownerIds = [...new Set(data.map(row => row.owner_id))];
    let profiles = [];
    if (ownerIds.length) {
        const { data: profileRows, error: profileError } = await supabaseClient
            .from("profiles")
            .select("id, display_name")
            .in("id", ownerIds);
        if (profileError) throw profileError;
        profiles = profileRows;
    }
    const profileNames = Object.fromEntries(profiles.map(profile => [profile.id, profile.display_name]));
    communityStorages = data.map(row => ({
        id: row.id,
        ownerId: row.owner_id,
        name: row.name,
        author: profileNames[row.owner_id] || "Speler"
    }));
}

async function persistStorage(storageId) {
    const storage = allStorages[storageId];
    const snapshot = JSON.parse(JSON.stringify({
        id: storage.id,
        owner_id: currentUser.id,
        name: storage.name,
        is_public: storage.isPublic,
        data: storage.data
    }));
    const previousSave = storageSaveQueues.get(storageId) || Promise.resolve();
    const nextSave = previousSave.catch(() => {}).then(async () => {
        const { error } = await supabaseClient.from("storages").upsert(snapshot);
        if (error) throw error;
    });
    storageSaveQueues.set(storageId, nextSave);

    try {
        await nextSave;
        return true;
    } catch (error) {
        showAppNotice(`Opslaan is niet gelukt: ${error.message}. De pagina wordt opnieuw geladen.`, true);
        window.setTimeout(() => window.location.reload(), 1800);
        return false;
    } finally {
        if (storageSaveQueues.get(storageId) === nextSave) storageSaveQueues.delete(storageId);
    }
}

async function initializeAuthenticatedApp(user) {
    if (loadedUserId === user.id) return;
    loadedUserId = user.id;
    currentUser = user;

    try {
        const { data: profile, error: profileError } = await supabaseClient
            .from("profiles")
            .select("display_name, username")
            .eq("id", user.id)
            .maybeSingle();
        if (profileError) throw profileError;

        currentProfileName = profile?.display_name || user.user_metadata?.display_name ||
            user.email.split("@")[0].slice(0, 32);
        currentUsername = profile ? (profile.username || "") : (user.user_metadata?.username || "");
        if (!profile) {
            const { error: insertError } = await supabaseClient
                .from("profiles")
                .upsert(
                    {
                        id: user.id,
                        display_name: currentProfileName,
                        username: currentUsername || null
                    },
                    { onConflict: "id", ignoreDuplicates: true }
                );
            if (insertError?.code === "23505" && currentUsername) {
                const { error: fallbackInsertError } = await supabaseClient
                    .from("profiles")
                    .upsert(
                        { id: user.id, display_name: currentProfileName, username: null },
                        { onConflict: "id", ignoreDuplicates: true }
                    );
                if (fallbackInsertError) throw fallbackInsertError;
                pendingAppNotice = "Deze gebruikersnaam is al bezet. Kies een andere bij Instellingen.";
            } else if (insertError) {
                throw insertError;
            }
            const { data: createdProfile, error: createdProfileError } = await supabaseClient
                .from("profiles")
                .select("display_name, username")
                .eq("id", user.id)
                .single();
            if (createdProfileError) throw createdProfileError;
            currentProfileName = createdProfile.display_name;
            currentUsername = createdProfile.username || "";
        }

        await Promise.all([loadStorageRows(), loadCommunityStorages()]);
        isReadOnlyStorage = false;
        document.getElementById("authOverlay").style.display = "none";
        showAppNotice(pendingAppNotice);
        pendingAppNotice = "";
        addAccountMenuItem();

        const accountNameInput = document.getElementById("accountNameInput");
        if (accountNameInput) accountNameInput.value = currentProfileName;
        const accountUsernameInput = document.getElementById("accountUsernameInput");
        if (accountUsernameInput) accountUsernameInput.value = currentUsername;
        if (document.getElementById("myStorageList")) initDashboard();
        else if (document.getElementById("currentStorageTitle")) await initStoragePage();
        if (document.getElementById("appNotice")?.textContent) {
            window.setTimeout(() => showAppNotice(""), 6000);
        }
    } catch (error) {
        loadedUserId = null;
        document.getElementById("authOverlay").style.display = "none";
        showAppNotice(
            `De online opslag kon niet worden geladen. Controleer of supabase/schema.sql in Supabase is uitgevoerd. Details: ${error.message}`,
            true
        );
    }
}

function initializeBackend() {
    createAuthUi();
    const config = window.CHESTCRAFT_SUPABASE_CONFIG;
    if (!config || !window.supabase?.createClient) {
        document.getElementById("authSubmit").disabled = true;
        document.getElementById("authModeToggle").disabled = true;
        showAppNotice("De accountdienst kon niet worden geladen. Ververs de pagina of probeer het later opnieuw.", true);
        return;
    }
    supabaseClient = window.supabase.createClient(config.url, config.publishableKey);
    supabaseClient.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_OUT") {
            currentUser = null;
            loadedUserId = null;
            currentUsername = "";
            allStorages = {};
            document.getElementById("authOverlay").style.display = "flex";
            document.getElementById("signedInAccount")?.remove();
            document.getElementById("signOutButton")?.remove();
        } else if (event === "PASSWORD_RECOVERY") {
            createPasswordRecoveryUi();
        } else if (session?.user) {
            initializeAuthenticatedApp(session.user);
        }
    });
    supabaseClient.auth.getSession().then(({ data, error }) => {
        if (error) throw error;
        if (data.session?.user) initializeAuthenticatedApp(data.session.user);
        else document.getElementById("authOverlay").style.display = "flex";
    }).catch(error => {
        showAppNotice(`Aanmeldstatus kon niet worden gecontroleerd: ${error.message}`, true);
    });
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

    // Accountinstellingen zijn gekoppeld aan het ingelogde Supabase-account.
    const accountNameInput = document.getElementById('accountNameInput');
    const accountUsernameInput = document.getElementById('accountUsernameInput');
    const btnSaveAccount = document.getElementById('btnSaveAccount');
    const accountStatus = document.getElementById('accountStatus');

    if (btnSaveAccount) {
        const saveProfileAction = async () => {
            const name = accountNameInput.value.trim();
            if (!name) {
                accountStatus.innerText = "Vul een spelersnaam in.";
                return;
            }
            if (name.length > 32) {
                accountStatus.innerText = "Je spelersnaam mag maximaal 32 tekens zijn.";
                return;
            }
            const username = accountUsernameInput.value.trim().toLowerCase();
            if (!/^[a-z0-9_]{3,20}$/.test(username)) {
                accountStatus.innerText = "Gebruikersnamen moeten 3-20 tekens zijn en alleen letters, cijfers of _ bevatten.";
                return;
            }
            try {
                const { error } = await supabaseClient.from("profiles").upsert({
                    id: currentUser.id,
                    display_name: name,
                    username
                });
                if (error) throw error;
            } catch (error) {
                accountStatus.innerText = `Opslaan is niet gelukt: ${error.message}`;
                return;
            }
            currentProfileName = name;
            currentUsername = username;
            accountStatus.innerText = `Spelersnaam "${name}" opgeslagen in je account.`;
            const existingAccountLabel = document.getElementById("signedInAccount");
            if (existingAccountLabel) existingAccountLabel.textContent = currentProfileName;
            renderCommunityStorages();
        };

        btnSaveAccount.addEventListener('click', saveProfileAction);
        accountNameInput.addEventListener('keydown', (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                saveProfileAction();
            }
        });
    }

    initializeBackend();
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

    const welcomeTitle = document.getElementById("welcomeUserTitle");
    if (welcomeTitle) {
        welcomeTitle.innerText = `Welkom, ${currentProfileName || currentUser.email}!`;
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

    const executeCreate = async () => {
        const typeSelect = document.getElementById("newStorageType");
        const name = nameInput.value.trim();

        if (!name) {
            alert("Vul een naam in voor je storage!");
            return;
        }

        const newId = crypto.randomUUID();
        let newData = {};

        if (typeSelect.value !== "empty" && TEMPLATES[typeSelect.value]) {
            newData = JSON.parse(JSON.stringify(TEMPLATES[typeSelect.value].data));
        }

        allStorages[newId] = {
            id: newId,
            ownerId: currentUser.id,
            name: name,
            isPublic: false,
            data: newData
        };

        const saved = await persistStorage(newId);
        if (!saved) return;
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
                <strong style="color: #fff; font-size: 1.5rem;">${escapeHtml(item.name)}</strong>
                <span style="font-size: 1.1rem; color: ${item.isPublic ? '#55ff55' : '#ff5555'}; margin-left: 10px;">
                    ${item.isPublic ? '🌐 Openbaar' : '🔒 Privé'}
                </span>
            </div>
            <div style="display: flex; gap: 8px;">
                <button class="mc-button" onclick="openStorage('${id}')" style="background-color: #55ff55; color: #000; font-size: 1.3rem;">OPENEN</button>
                <button class="mc-button" onclick="renameStorage('${id}')" style="font-size: 1.3rem;">NAAM WIJZIGEN</button>
                <button class="mc-button" onclick="togglePrivacyDashboard('${id}')" style="font-size: 1.3rem;">${item.isPublic ? 'Privé' : 'Openbaar'}</button>
                <button class="mc-button" onclick="deleteStorage('${id}')" style="background-color: #ff5555; color: #fff; font-size: 1.3rem;">✖</button>
            </div>
        `;
        container.appendChild(card);
    }
    if (!container.childElementCount) container.textContent = "Je hebt nog geen storages. Maak er een aan met + NIEUW.";
}

function renderCommunityStorages() {
    const container = document.getElementById("communityStorageList");
    if (!container) return;
    container.innerHTML = "";

    if (!communityStorages.length) {
        container.textContent = "Er zijn nog geen openbare storages.";
        return;
    }

    communityStorages.forEach(item => {
        const card = document.createElement("div");
        card.style.cssText = "display: flex; justify-content: space-between; align-items: center; background: rgba(37,37,37,0.9); padding: 12px; border: 3px solid #555;";
        card.innerHTML = `
            <div>
                <strong style="color: #fff; font-size: 1.4rem;">${escapeHtml(item.name)}</strong>
                <span style="color: #aaa; font-size: 1.1rem;"> door ${escapeHtml(item.author)}</span>
            </div>
            <button class="mc-button community-view-button" style="font-size: 1.3rem;">BEKIJKEN</button>
        `;
        card.querySelector(".community-view-button").addEventListener("click", () => openStorage(item.id));
        container.appendChild(card);
    });
}

function openStorage(id) {
    localStorage.setItem('mc_active_storage_id', id);
    window.location.href = "storage.html";
}

async function renameStorage(id) {
    const storage = allStorages[id];
    if (!currentUser || !storage || storage.ownerId !== currentUser.id) return;

    const enteredName = window.prompt("Vul een nieuwe naam in voor je storage:", storage.name);
    if (enteredName === null) return;

    const name = enteredName.trim();
    if (!name) {
        alert("De naam van je storage mag niet leeg zijn.");
        return;
    }
    if (name.length > 80) {
        alert("De naam van je storage mag maximaal 80 tekens zijn.");
        return;
    }
    if (name === storage.name) return;

    storage.name = name;
    if (await persistStorage(id)) renderMyStorages();
}

function togglePrivacyDashboard(id) {
    if (allStorages[id] && allStorages[id].ownerId === currentUser.id) {
        allStorages[id].isPublic = !allStorages[id].isPublic;
        persistStorage(id).then(saved => {
            if (saved) {
                renderMyStorages();
                loadCommunityStorages().then(renderCommunityStorages).catch(error =>
                    showAppNotice(`Community storages laden is niet gelukt: ${error.message}`, true)
                );
            }
        });
    }
}

function deleteStorage(id) {
    if (Object.keys(allStorages).length <= 1) {
        alert("Je kunt je laatste storage niet verwijderen!");
        return;
    }

    showMinecraftConfirm("Weet je zeker dat je deze storage wilt verwijderen?", async () => {
        try {
            const { error } = await supabaseClient.from("storages").delete().eq("id", id);
            if (error) {
                showAppNotice(`Verwijderen is niet gelukt: ${error.message}`, true);
                return;
            }
            delete allStorages[id];
            renderMyStorages();
        } catch (error) {
            showAppNotice(`Verwijderen is niet gelukt: ${error.message}`, true);
        }
    });
}


// ==========================================
// 5. STORAGE PAGINA LOGICA (storage.html)
// ==========================================
async function initStoragePage() {
    if (!activeStorageId) {
        window.location.replace("startpagina.html");
        return;
    }
    if (!allStorages[activeStorageId]) {
        const { data: row, error } = await supabaseClient
            .from("storages")
            .select("id, owner_id, name, is_public, data")
            .eq("id", activeStorageId)
            .eq("is_public", true)
            .maybeSingle();
        if (error) {
            showAppNotice(`Storage laden is niet gelukt: ${error.message}`, true);
            return;
        }
        if (!row) {
            window.location.replace("startpagina.html");
            return;
        }
        if (!isStorageDataValid(row.data)) {
            showAppNotice("Deze openbare storage bevat ongeldige gegevens.", true);
            window.location.replace("startpagina.html");
            return;
        }
        allStorages[row.id] = {
            id: row.id,
            ownerId: row.owner_id,
            name: row.name,
            isPublic: row.is_public,
            data: row.data
        };
        isReadOnlyStorage = row.owner_id !== currentUser.id;
    } else {
        isReadOnlyStorage = false;
    }

    const currentStorage = allStorages[activeStorageId];
    if (!currentStorage) {
        window.location.replace("startpagina.html");
        return;
    }
    const titleEl = document.getElementById("currentStorageTitle");
    const btnPrivacy = document.getElementById("btnTogglePrivacy");

    if (titleEl) titleEl.innerText = currentStorage.name;
    if (btnPrivacy) btnPrivacy.hidden = isReadOnlyStorage;
    const addActionBox = document.getElementById("addActionBox");
    if (addActionBox && isReadOnlyStorage) addActionBox.style.display = "none";
    updatePrivacyButton();

    if (btnPrivacy && !isReadOnlyStorage) {
        btnPrivacy.addEventListener("click", () => {
            currentStorage.isPublic = !currentStorage.isPublic;
            persistStorage(activeStorageId).then(saved => {
                if (saved) {
                    updatePrivacyButton();
                    loadCommunityStorages().then(renderCommunityStorages).catch(error =>
                        showAppNotice(`Community storages laden is niet gelukt: ${error.message}`, true)
                    );
                }
            });
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
        if (addActionBox) addActionBox.style.display = isReadOnlyStorage ? 'none' : 'block';
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

async function handleDynamicAdd() {
    if (isReadOnlyStorage) return;
    const input = document.getElementById('dynamicInput');
    const value = input.value.trim();
    if (!value) return;

    let storageData = getActiveData();
    let changed = false;

    if (currentPage === 'categories') {
        if (!storageData[value]) {
            storageData[value] = { icon: selectedIcon, subcategories: {} };
            changed = true;
            renderCategories();
        }
    } else if (currentPage === 'subcategories') {
        if (currentCategory && !storageData[currentCategory].subcategories[value]) {
            storageData[currentCategory].subcategories[value] = [];
            changed = true;
            renderSubCategories();
        }
    } else if (currentPage === 'items') {
        if (currentCategory && currentSubCategory) {
            if (!Array.isArray(storageData[currentCategory].subcategories[currentSubCategory])) {
                storageData[currentCategory].subcategories[currentSubCategory] = [];
            }
            storageData[currentCategory].subcategories[currentSubCategory].push({ name: value });
            changed = true;
            renderItems();
        }
    }
    if (changed) await persistStorage(activeStorageId);
    input.value = '';
}

function updateBreadcrumb() {
    const container = document.getElementById('verticalBreadcrumb');
    if (!container) return;
    container.replaceChildren();
    const addLink = (label, action) => {
        const link = document.createElement("span");
        link.className = "mc-breadcrumb-link";
        link.textContent = label;
        link.addEventListener("click", action);
        container.appendChild(link);
    };
    const addArrow = () => {
        const arrow = document.createElement("span");
        arrow.className = "mc-breadcrumb-arrow-down";
        arrow.textContent = "↓";
        container.appendChild(arrow);
    };

    addLink("START", () => navigateTo("home"));

    if (currentPage !== 'home') {
        addArrow();
        addLink("HOOFD", () => navigateTo("categories"));
    }

    if (currentCategory && (currentPage === 'subcategories' || currentPage === 'items')) {
        addArrow();
        addLink(currentCategory.toUpperCase(), () => openCategory(currentCategory));
    }

    if (currentSubCategory && currentPage === 'items') {
        addArrow();
        const current = document.createElement("span");
        current.style.color = "#ffffff";
        current.textContent = currentSubCategory.toUpperCase();
        container.appendChild(current);
    }
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
            <div class="category-icon">${escapeHtml(storageData[name].icon || '📦')}</div>
            <div class="category-title">${escapeHtml(name)}</div>
        `;
        if (!isReadOnlyStorage) {
            const deleteButton = document.createElement("button");
            deleteButton.className = "category-delete-btn";
            deleteButton.type = "button";
            deleteButton.textContent = "✖ VERWIJDER";
            deleteButton.title = `Verwijder hoofdcategorie ${name}`;
            deleteButton.setAttribute("aria-label", `Verwijder hoofdcategorie ${name}`);
            deleteButton.addEventListener("click", event => {
                event.stopPropagation();
                deleteCategory(name);
            });
            card.appendChild(deleteButton);
        }
        grid.appendChild(card);
    }
}

function deleteCategory(name) {
    if (isReadOnlyStorage) return;
    const storageData = getActiveData();
    if (!Object.hasOwn(storageData, name)) return;

    showMinecraftConfirm(
        `Weet je zeker dat je hoofdcategorie "${name}" en alle subcategorieën en items erin wilt verwijderen?`,
        async () => {
            delete storageData[name];
            if (currentCategory === name) {
                currentCategory = null;
                currentSubCategory = null;
            }

            if (await persistStorage(activeStorageId)) {
                renderCategories();
                updateBreadcrumb();
            }
        }
    );
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
            <div class="category-title">${escapeHtml(subName)}</div>
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
        card.innerHTML = `<span class="item-name">${escapeHtml(itemName)}</span>`;
        if (!isReadOnlyStorage) {
            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-btn";
            deleteButton.textContent = "✖";
            deleteButton.addEventListener("click", () => deleteItem(index));
            card.appendChild(deleteButton);
        }
        grid.appendChild(card);
    });
}

function deleteItem(index) {
    if (isReadOnlyStorage) return;
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
                    persistStorage(activeStorageId).then(saved => {
                        if (saved) renderItems();
                    });
                }
            }, 500);
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
                <span style="font-size: 1.3rem;">📦 <b>${escapeHtml(match.item)}</b></span><br>
                <span class="search-item-path" style="color: #aaa; font-size: 1.1rem;">${escapeHtml(match.category)} ➔ ${escapeHtml(match.subCategory)}</span>
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