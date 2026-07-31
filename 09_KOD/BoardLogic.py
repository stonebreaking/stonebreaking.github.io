import json

class MahjongBoard:
    def __init__(self):
        self.layers = {
            "Layer_0": {"size": (8, 8), "offset": (0, 0)},
            "Layer_1": {"size": (6, 6), "offset": (1, 1)},
            "Layer_2": {"size": (4, 4), "offset": (2, 2)},
            "Layer_3": {"size": (2, 2), "offset": (3, 3)},
            "Layer_4": {"size": (1, 1), "offset": (3.5, 3.5)} # Tepe taşı
        }

    def is_tile_free(self, tile_pos, current_board):
        # Solu veya sağı boş mu? + Üstünde taş var mı?
        # Bu algoritma 'Stonebreaking' mekaniğinin temelidir.
        x, y, z = tile_pos
        
        # Üst katman kontrolü
        for (bx, by, bz) in current_board:
            if bz == z + 1:
                if abs(bx - x) < 1 and abs(by - y) < 1:
                    return False # Üstü kapalı
        
        # Yan kontrol
        left_blocked = any(bz == z and bx == x - 1 and by == y for (bx, by, bz) in current_board)
        right_blocked = any(bz == z and bx == x + 1 and by == y for (bx, by, bz) in current_board)
        
        return not (left_blocked and right_blocked)

board = MahjongBoard()
print("Mekanik Algoritma: 3D Katman Kontrol Sistemi Hazır.")
