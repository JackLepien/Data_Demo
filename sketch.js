//Data Demo for UX Class

let pokedex_table;
const NUM_TO_DRAW = 150;
const COLS = 15;

const TYPE_COLORS = {
    fire: '#FF6B6B',
    water: '#4D9DE0',
    grass: '#58D68D',
    electric: '#F4D35E',
    bug: '#9AD437',
    rock: '#A1887F',
    ground: '#D2B48C',
    flying: '#8EC0E4',
    poison: '#A569BD',
    psychic: '#FF6EA1',
    ghost: '#6C5B7B',
    dragon: '#7B68EE',
    fairy: '#F7A8B8',
    normal: '#BDBDBD',
    fighting: '#CB6E3C',
    steel: '#9EA7AA',
    ice: '#9EE1F8',
    dark: '#333333'
};

function hexToRgb(hex) {
    const h = (hex || '#000000').replace('#', '');
    const num = parseInt(h, 16) || 0;
    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255
    };
}

// Draw once after preload; do it in setup to avoid depending on draw loop
function drawCircles() {
    try {
        background(255);
        if (!pokedex_table || !pokedex_table.Pokemon) {
            console.warn('pokedex_table not loaded or missing Pokemon array', pokedex_table);
            return;
        }

        const pokemons = pokedex_table.Pokemon;
        const count = Math.min(NUM_TO_DRAW, pokemons.length);
        const cols = COLS;
        const rows = Math.max(1, Math.ceil(count / cols));
        const spacingX = width / cols;
        const spacingY = height / rows;
        const diameter = Math.min(spacingX, spacingY) * 0.6;

        textAlign(CENTER, CENTER);

        for (let i = 0; i < count; i++) {
            const p = pokemons[i];
            const x = (i % cols) * spacingX + spacingX / 2;
            const y = Math.floor(i / cols) * spacingY + spacingY / 2;

            const t0 = (p['type/0'] || '').toString().toLowerCase().trim();
            const colorHex = TYPE_COLORS[t0] || '#000000';
            fill(colorHex);
            circle(x, y, diameter);

            // choose contrasting text color based on luminance
            const rgb = hexToRgb(colorHex);
            const lum = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
            if (lum < 140) fill(255); else fill(0);

            const name = p.name || '';
            const gen = p.gen || '';
            const appearance = p.appearances || '';
            const ts = Math.max(10, diameter * 0.22);
            textSize(ts);
            text(name, x, y-ts);
            text(`Gen ${gen}`, x, y);
            text(appearance, x, y + ts);
        }
    } catch (err) {
        console.error('Error in drawCircles:', err);
        throw err;
    }
}

async function setup() {
    pokedex_table = await loadJSON('assets/pokedex_JSON.json');
    createCanvas(window.innerWidth - (window.innerWidth/10), window.innerHeight - (window.innerHeight/10));
    noStroke();
    console.log('pokedex_table in setup:', pokedex_table && pokedex_table.Pokemon && pokedex_table.Pokemon.length);
}

function draw(){
    try {
        drawCircles();
    } catch (err) {
        console.error('setup caught error from drawCircles:', err);
    }
    noLoop();
}
