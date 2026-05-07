import sys
from PIL import Image

def get_dimensions(image_path):
    try:
        with Image.open(image_path) as img:
            width, height = img.size
            print(f"Dimensions of {image_path}: {width}x{height}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        get_dimensions(sys.argv[1])
    else:
        print("Please provide an image path.")
