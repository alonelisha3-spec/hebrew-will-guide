import struct, zlib

def create_ico():
    size = 32
    pixels = []
    for y in range(size):
        row = []
        for x in range(size):
            # Simple scales of justice icon
            cx, cy = size//2, size//2
            # Gold color #c8a96e
            r, g, b, a = 200, 169, 110, 255
            bg_r, bg_g, bg_b, bg_a = 26, 58, 92, 255  # Navy #1a3a5c
            
            pixel = (bg_r, bg_g, bg_b, bg_a)
            
            # Circle background
            dx, dy = x - cx, y - cy
            if dx*dx + dy*dy <= 14*14:
                # Pillar (center vertical line)
                if abs(x - cx) <= 1 and 6 <= y <= 26:
                    pixel = (r, g, b, a)
                # Top bar
                elif abs(y - 8) <= 1 and cx-9 <= x <= cx+9:
                    pixel = (r, g, b, a)
                # Base
                elif abs(y - 26) <= 1 and cx-6 <= x <= cx+6:
                    pixel = (r, g, b, a)
                # Left pan
                elif abs(y - 16) <= 0 and cx-10 <= x <= cx-6:
                    pixel = (r, g, b, a)
                # Right pan
                elif abs(y - 14) <= 0 and cx+6 <= x <= cx+10:
                    pixel = (r, g, b, a)
                # Left string
                elif x == cx-8 and 8 <= y <= 16:
                    pixel = (r, g, b, a)
                # Right string
                elif x == cx+8 and 8 <= y <= 14:
                    pixel = (r, g, b, a)
                else:
                    pixel = (26, 50, 80, 255)
            
            row.append(pixel)
        pixels.append(row)
    
    # Create BMP data
    bmp_data = bytearray()
    for y in range(size-1, -1, -1):
        for x in range(size):
            r, g, b, a = pixels[y][x]
            bmp_data.extend([b, g, r, a])
    
    # AND mask (all zeros = fully visible)
    and_mask = bytearray(size * size // 8)
    
    # ICO header
    ico = bytearray()
    ico.extend(struct.pack('<HHH', 0, 1, 1))  # Reserved, Type=ICO, Count=1
    
    # Directory entry
    bmp_header_size = 40
    image_size = bmp_header_size + len(bmp_data) + len(and_mask)
    ico.extend(struct.pack('<BBBBHHII', size, size, 0, 0, 1, 32, image_size, 22))
    
    # BMP info header
    ico.extend(struct.pack('<IiiHHIIiiII', 40, size, size*2, 1, 32, 0, len(bmp_data), 0, 0, 0, 0))
    ico.extend(bmp_data)
    ico.extend(and_mask)
    
    with open('public/favicon.ico', 'wb') as f:
        f.write(ico)
    print("favicon.ico created")

create_ico()
