import sys
from PIL import Image

def analyze(image_path):
    try:
        with Image.open(image_path) as img:
            img = img.convert("RGBA")
            pixels = img.load()
            print(f"Top-left pixel: {pixels[0, 0]}")
            print(f"Center pixel: {pixels[img.width//2, img.height//2]}")
            print(f"Top-right pixel: {pixels[img.width-1, 0]}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        analyze(sys.argv[1])
