import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(process.cwd());
const failures = [];
let passed = 0;

function test(name, fn) {
    try {
        fn();
        passed += 1;
        console.log(`PASS: ${name}`);
    } catch (error) {
        failures.push({ name, reason: error.message });
        console.error(`FAIL: ${name}`);
        console.error(`  reason: ${error.message}`);
    }
}

function read(relPath) {
    return fs.readFileSync(path.join(root, relPath), "utf8");
}

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

function exists(relPath) {
    return fs.existsSync(path.join(root, relPath));
}

function extractLinks(html) {
    return [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
}

function isInternalPageLink(link) {
    return (
        link &&
        !link.startsWith("#") &&
        !link.startsWith("http") &&
        !link.startsWith("mailto:") &&
        !link.startsWith("tel:")
    );
}

const routes = JSON.parse(read("data/routes.json"));
const events = JSON.parse(read("data/events.json"));
const mainJs = read("src/js/main.js");
const pdfJs = read("src/js/pdfGenerator.js");
const indexHtml = read("index.html");
const routesHtml = read("routes.html");
const routeHtml = read("route.html");
const contentHtml = read("content.html");
const favoritesHtml = read("favorites.html");
const adminHtml = read("admin.html");
const mainCss = read("src/css/main.css");
const componentsCss = read("src/css/components.css");
const filtersJs = read("src/js/filters.js");
const adminJs = read("src/js/admin.js");

const pageFiles = [
    "index.html",
    "routes.html",
    "route.html",
    "map.html",
    "content.html",
    "favorites.html",
    "admin.html"
];

const requiredFiles = [
    ...pageFiles,
    "src/css/main.css",
    "src/css/components.css",
    "src/js/main.js",
    "src/js/filters.js",
    "src/js/pdfGenerator.js",
    "src/js/admin.js",
    "data/routes.json",
    "data/events.json",
    "data/config.js",
    "assets/images/baikal.jpg"
];

test("all required project files exist", () => {
    for (const file of requiredFiles) {
        assert(exists(file), `missing required file: ${file}`);
    }
});

test("routes.json has 12 routes", () => {
    assert(Array.isArray(routes), "routes.json must be an array");
    assert(routes.length === 12, `expected 12 routes, got ${routes.length}`);
});

test("each route has required shape", () => {
    const idSet = new Set();
    for (const route of routes) {
        assert(typeof route.id === "number", `route.id missing for ${route.title ?? "unknown"}`);
        assert(!idSet.has(route.id), `duplicate route id: ${route.id}`);
        idSet.add(route.id);
        assert(typeof route.title === "string" && route.title.length > 3, `invalid title for route ${route.id}`);
        assert(Array.isArray(route.vibes) && route.vibes.length >= 1, `route ${route.id} has empty vibes`);
        assert(Array.isArray(route.gradient) && route.gradient.length === 2, `route ${route.id} gradient must have 2 colors`);
        assert(Array.isArray(route.points) && route.points.length >= 1, `route ${route.id} points must not be empty`);
        assert(Array.isArray(route.schedule) && route.schedule.length >= 1, `route ${route.id} schedule must not be empty`);
        assert(route.gradient.every((c) => /^#[0-9A-Fa-f]{6}$/.test(c)), `route ${route.id} has invalid gradient color`);
        assert(route.vibes.every((v) => String(v).startsWith("#")), `route ${route.id} has vibe without #`);
        assert(route.images && route.images[0] && route.images[0].src, `route ${route.id} missing first image src`);
        for (const point of route.points) {
            assert(Array.isArray(point.coordinates) && point.coordinates.length === 2, `route ${route.id} point coordinates invalid`);
            assert(typeof point.coordinates[0] === "number" && typeof point.coordinates[1] === "number", `route ${route.id} point coordinates must be numeric`);
        }
    }
});

test("events.json has 3 events with date and image", () => {
    assert(Array.isArray(events), "events.json must be an array");
    assert(events.length === 3, `expected 3 events, got ${events.length}`);
    for (const event of events) {
        assert(Boolean(event.title), "event title is required");
        assert(Boolean(event.date), `event "${event.title}" is missing date`);
        assert(Boolean(event.image), `event "${event.title}" is missing image`);
    }
});

test("all event images exist in filesystem", () => {
    for (const event of events) {
        assert(exists(event.image), `event image file not found: ${event.image}`);
    }
});

test("all route primary images exist in filesystem", () => {
    for (const route of routes) {
        const img = route.images?.[0]?.src;
        assert(Boolean(img), `route ${route.id} has no primary image`);
        assert(exists(img), `route ${route.id} image file not found: ${img}`);
    }
});

test("index page has vibe block and map block", () => {
    assert(indexHtml.includes("Выбери настроение"), "index.html is missing vibe selector section");
    assert(indexHtml.includes('id="miniMap"'), "index.html is missing mini map container");
});

test("routes page contains budget filter", () => {
    assert(routesHtml.includes('name="budget"'), "routes.html is missing budget filter");
});

test("route page has map and PDF action", () => {
    assert(routeHtml.includes('id="map"'), "route.html is missing map container");
    assert(routeHtml.includes("generatePDF"), "route.html is missing PDF button action");
});

test("content page has no iframe videos", () => {
    assert(!contentHtml.includes("<iframe"), "content.html still contains iframe video");
});

test("favorites page has remove action", () => {
    assert(favoritesHtml.includes("removeFav("), "favorites.html is missing remove favorite action");
});

test("admin page uses password prompt", () => {
    assert(adminHtml.includes("admin2026"), "admin.html is missing password gate");
});

test("main.js wires easter egg and favorite detail button", () => {
    assert(mainJs.includes("cedar-icon"), "main.js does not create visible easter egg button");
    assert(mainJs.includes(".btn-fav-detail"), "main.js does not bind detail favorite button");
});

test("pdfGenerator has transliteration fallback", () => {
    assert(pdfJs.includes("transliterateRu"), "pdfGenerator.js does not include transliteration fallback");
});

test("all main pages include main.js", () => {
    for (const page of pageFiles.filter((p) => p !== "map.html")) {
        const html = read(page);
        assert(html.includes('src="src/js/main.js"') || page === "admin.html", `${page} should include src/js/main.js`);
    }
});

test("navigation links point to existing local pages", () => {
    for (const page of pageFiles) {
        const html = read(page);
        const links = extractLinks(html).filter(isInternalPageLink).filter((l) => l.endsWith(".html") || l.includes(".html?"));
        for (const link of links) {
            const target = link.split("?")[0];
            assert(exists(target), `${page} has broken internal link: ${link}`);
        }
    }
});

test("pages that use CONFIG include config script", () => {
    for (const page of pageFiles) {
        const html = read(page);
        const usesConfig = html.includes("CONFIG.");
        if (usesConfig) {
            assert(html.includes('src="data/config.js"'), `${page} uses CONFIG but does not include data/config.js`);
        }
    }
});

test("content page contains no embedded iframes", () => {
    assert(!/iframe/i.test(contentHtml), "content.html still contains iframe");
});

test("CSS contains core tokens for design system", () => {
    assert(mainCss.includes("--color-baikal"), "main.css missing --color-baikal");
    assert(mainCss.includes("--spacing-sm"), "main.css missing --spacing-sm");
    assert(mainCss.includes("--radius-lg"), "main.css missing --radius-lg");
});

test("filters JS uses AND logic and budget filter", () => {
    assert(filtersJs.includes("every"), "filters.js should use Array.every for vibe AND logic");
    assert(filtersJs.includes("selectedBudget"), "filters.js missing budget filter logic");
});

test("favorites storage keys are used consistently", () => {
    assert(mainJs.includes("CONFIG.STORAGE_KEYS.FAVORITES"), "main.js does not use CONFIG favorites key");
    assert(mainJs.includes("CONFIG.STORAGE_KEYS.LAST_VIBE"), "main.js does not use CONFIG last vibe key");
});

test("transliteration converts Cyrillic to Latin", () => {
    const sandbox = {};
    vm.createContext(sandbox);
    vm.runInContext(`${pdfJs}\nthis.__t = transliterateRu;`, sandbox);
    const out = sandbox.__t("Привет, Байкал");
    assert(typeof out === "string", "transliteration output should be string");
    assert(!/[А-Яа-яЁё]/.test(out), "transliteration output still contains Cyrillic");
});

test("escapeHTML sanitizes dangerous symbols", () => {
    const sandbox = {
        document: { addEventListener: () => {} },
        window: {},
        localStorage: { getItem: () => "[]", setItem: () => {} },
        CONFIG: { STORAGE_KEYS: { FAVORITES: "f", LAST_VIBE: "v" } }
    };
    vm.createContext(sandbox);
    vm.runInContext(`${mainJs}\nthis.__escape = escapeHTML;`, sandbox);
    const out = sandbox.__escape(`<img src=x onerror='x'>`);
    assert(out.includes("&lt;img"), "escapeHTML did not escape opening tag");
    assert(out.includes("&#39;"), "escapeHTML did not escape apostrophe");
});

test("toggleFavorite adds and removes IDs", () => {
    const storage = {};
    const sandbox = {
        document: { addEventListener: () => {} },
        window: {},
        localStorage: {
            getItem: (k) => storage[k] ?? null,
            setItem: (k, v) => { storage[k] = String(v); }
        },
        CONFIG: { STORAGE_KEYS: { FAVORITES: "favs", LAST_VIBE: "lv" } }
    };
    vm.createContext(sandbox);
    vm.runInContext(`${mainJs}\nthis.__toggle = toggleFavorite; this.__get = getFavorites;`, sandbox);
    sandbox.__toggle(7);
    assert(JSON.stringify(sandbox.__get()) === JSON.stringify([7]), "toggleFavorite should add ID");
    sandbox.__toggle(7);
    assert(JSON.stringify(sandbox.__get()) === JSON.stringify([]), "toggleFavorite should remove existing ID");
});

test("admin.js supports copying merged routes array", () => {
    assert(adminJs.includes("navigator.clipboard.writeText"), "admin.js should use Clipboard API");
    assert(adminJs.includes("findIndex"), "admin.js should update existing route by id");
});

test("route and map pages include yandex map loader", () => {
    const mapHtml = read("map.html");
    assert(routeHtml.includes("loadYMaps"), "route.html missing loadYMaps helper");
    assert(mapHtml.includes("loadYMaps"), "map.html missing loadYMaps helper");
});

console.log("");
console.log(`Done. Passed: ${passed}, Failed: ${failures.length}`);

if (failures.length) {
    console.log("Failure summary:");
    for (const failure of failures) {
        console.log(`- ${failure.name}: ${failure.reason}`);
    }
    process.exit(1);
}
