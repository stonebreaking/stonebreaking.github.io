// ============================
// BATUPIA - MAHJONG KATMAN SİSTEMİ
// ============================
// Klasik Mahjong Solitaire mantığı
// Üstteki taş kalkmadan alttaki seçilemez

class MahjongLayers {
    constructor() {
        this.layers = [];
        this.tileSize = { w: 48, h: 60, d: 8 }; // genişlik, yükseklik, derinlik (3D)
        this.setupClassicLayout();
    }

    // Klasik Turtle/Kaplumbağa düzeni (en popüler Mahjong düzeni)
    setupClassicLayout() {
        // Katman 1 (Taban): 8x16 grid
        // Katman 2: 6x12
        // Katman 3: 4x8
        // Katman 4: 2x6
        // Katman 5: 1x4 (tepe)
        
        const layouts = [
            // Katman 1 - En geniş
            { z: 0, rows: 10, cols: 14, offsetX: 1, offsetY: 1 },
            // Katman 2
            { z: 1, rows: 8, cols: 12, offsetX: 2, offsetY: 2 },
            // Katman 3
            { z: 2, rows: 6, cols: 10, offsetX: 3, offsetY: 3 },
            // Katman 4
            { z: 3, rows: 4, cols: 8, offsetX: 4, offsetY: 4 },
            // Katman 5 - Tepe
            { z: 4, rows: 2, cols: 6, offsetX: 5, offsetY: 5 },
        ];

        let idCounter = 0;
        
        for (const layer of layouts) {
            for (let r = 0; r < layer.rows; r++) {
                for (let c = 0; c < layer.cols; c++) {
                    // Kenar taşları kontrolü (klasik düzende bazı boşluklar var)
                    if (this.isEdgeGap(layer.z, r, c, layer.rows, layer.cols)) continue;
                    
                    this.layers.push({
                        id: idCounter++,
                        x: c + layer.offsetX,
                        y: r + layer.offsetY,
                        z: layer.z,
                        type: null, // Sonra atanacak
                        active: true,
                        matched: false,
                        blocked: false // Üstünde taş var mı?
                    });
                }
            }
        }
        
        this.updateBlockedStatus();
        this.assignTypes();
    }
    
    isEdgeGap(z, r, c, rows, cols) {
        // Klasik kaplumbağa düzenindeki boşluklar
        if (z === 0) {
            // Köşeler boş
            if ((r === 0 || r === rows-1) && (c === 0 || c === cols-1)) return true;
        }
        return false;
    }
    
    // Bir taşın seçilebilir olup olmadığını kontrol et
    // Kural: En az bir yan tarafı açık olmalı VE üstünde taş olmamalı
    updateBlockedStatus() {
        for (const tile of this.layers) {
            if (!tile.active || tile.matched) {
                tile.blocked = true;
                continue;
            }
            
            // Üstünde taş var mı?
            const hasTop = this.layers.some(t => 
                t.active && !t.matched && 
                t.z === tile.z + 1 &&
                Math.abs(t.x - tile.x) <= 0.5 &&
                Math.abs(t.y - tile.y) <= 0.5
            );
            
            if (hasTop) {
                tile.blocked = true;
                continue;
            }
            
            // Sol ve sağ taraf kontrolü (en az biri açık olmalı)
            const leftBlocked = this.layers.some(t =>
                t.active && !t.matched &&
                t.z === tile.z &&
                t.x === tile.x - 1 &&
                t.y === tile.y
            );
            
            const rightBlocked = this.layers.some(t =>
                t.active && !t.matched &&
                t.z === tile.z &&
                t.x === tile.x + 1 &&
                t.y === tile.y
            );
            
            // Her iki yan da kapalıysa, bu taş seçilemez
            tile.blocked = leftBlocked && rightBlocked;
        }
    }
    
    // Taş tiplerini eşleşecek şekilde ata (çiftler halinde)
    assignTypes() {
        const activeTiles = this.layers.filter(t => t.active && !t.matched);
        const totalPairs = Math.floor(activeTiles.length / 2);
        
        const symbols = ['fire', 'water', 'earth', 'air', 'lightning', 'nature', 'ice', 'moon'];
        const pairs = [];
        
        for (let i = 0; i < totalPairs; i++) {
            const type = symbols[i % symbols.length];
            pairs.push(type, type);
        }
        
        // Karıştır
        for (let i = pairs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
        }
        
        // Ata
        let idx = 0;
        for (const tile of activeTiles) {
            tile.type = pairs[idx++];
        }
    }
    
    // Taş seçildiğinde
    selectTile(id) {
        const tile = this.layers.find(t => t.id === id);
        if (!tile || tile.blocked || tile.matched) return null;
        return tile;
    }
    
    // Eşleşme sonrası güncelle
    onMatch(tile1Id, tile2Id) {
        const t1 = this.layers.find(t => t.id === tile1Id);
        const t2 = this.layers.find(t => t.id === tile2Id);
        
        if (t1) { t1.matched = true; t1.active = false; }
        if (t2) { t2.matched = true; t2.active = false; }
        
        this.updateBlockedStatus();
    }
    
    // 3D çizim pozisyonu hesapla
    getScreenPos(tile, canvasWidth, canvasHeight) {
        const scale = 1 - (tile.z * 0.05); // Üst katmanlar biraz küçük
        const offsetX = (canvasWidth - (16 * this.tileSize.w)) / 2 + (tile.z * 4);
        const offsetY = (canvasHeight - (12 * this.tileSize.h)) / 2 - (tile.z * 6);
        
        return {
            x: offsetX + tile.x * this.tileSize.w * scale,
            y: offsetY + tile.y * this.tileSize.h * scale,
            z: tile.z,
            scale: scale
        };
    }
}

// Kullanım:
// const board = new MahjongLayers();
// board.layers.forEach(tile => console.log(tile));
