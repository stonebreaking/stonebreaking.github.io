import json
import random

class TileEngine:
    def __init__(self, data_path):
        with open(data_path, 'r') as f:
            self.data = json.load(f)
        self.board = []
        self.total_tiles = self.data['engine_settings']['total_tiles']

    def generate_deck(self):
        deck = []
        for group in self.data['engine_settings']['tile_groups']:
            name = group['name']
            variants = group['variants']
            count_per_variant = group['count_per_variant']
            
            for var in variants:
                # Mahjong mantığı: Her varyanttan 4 adet (veya belirtilen kadar)
                for _ in range(count_per_variant // len(variants)):
                    deck.append({"group": name, "variant": var})
        
        random.shuffle(deck)
        return deck

    def create_board(self):
        deck = self.generate_deck()
        # Basit 2D board (daha sonra 3D katmanlara dönüştürülecek)
        self.board = deck
        return f"BATUPIA: {len(self.board)} taş başarıyla oluşturuldu ve karıştırıldı."

if __name__ == "__main__":
    engine = TileEngine('09_KOD/TILE_DATA.json')
    print(engine.create_board())
