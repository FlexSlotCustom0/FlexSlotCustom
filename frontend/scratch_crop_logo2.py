import sys
import numpy as np
from PIL import Image

def crop_logo(image_path, output_path):
    try:
        with Image.open(image_path) as img:
            img_arr = np.array(img.convert('RGB'))
            
            # Background color base
            bg_color = np.array([231, 236, 233])
            
            # Calculate distance
            diff = np.linalg.norm(img_arr - bg_color, axis=2)
            
            # Mask of non-background pixels
            mask = diff > 40
            
            rows = np.any(mask, axis=1)
            cols = np.any(mask, axis=0)
            
            if not np.any(rows) or not np.any(cols):
                print("No content found!")
                return
                
            rmin, rmax = np.where(rows)[0][[0, -1]]
            cmin, cmax = np.where(cols)[0][[0, -1]]
            
            col_sums = np.sum(mask, axis=0)
            
            logo_cmin = cmin
            logo_cmax = cmin
            
            for c in range(cmin, cmax):
                if col_sums[c] > 0:
                    logo_cmax = c
                else:
                    if c - logo_cmax > 30: # 30 pixels gap
                        break
                        
            logo_mask = mask[:, logo_cmin:logo_cmax+1]
            logo_rows = np.any(logo_mask, axis=1)
            logo_rmin, logo_rmax = np.where(logo_rows)[0][[0, -1]]
            
            padding = int((logo_cmax - logo_cmin) * 0.1)
            
            crop_cmin = max(0, logo_cmin - padding)
            crop_cmax = min(img.width, logo_cmax + padding)
            crop_rmin = max(0, logo_rmin - padding)
            crop_rmax = min(img.height, logo_rmax + padding)
            
            w = crop_cmax - crop_cmin
            h = crop_rmax - crop_rmin
            size = max(w, h)
            
            center_x = (crop_cmin + crop_cmax) // 2
            center_y = (crop_rmin + crop_rmax) // 2
            
            final_cmin = max(0, center_x - size // 2)
            final_cmax = min(img.width, center_x + size // 2)
            final_rmin = max(0, center_y - size // 2)
            final_rmax = min(img.height, center_y + size // 2)
            
            cropped_img = img.crop((final_cmin, final_rmin, final_cmax, final_rmax))
            
            # Save the cropped logo back to the original path, effectively replacing it
            cropped_img.save(output_path)
            print(f"Cropped logo saved to {output_path}")
            print(f"Crop box: ({final_cmin}, {final_rmin}, {final_cmax}, {final_rmax})")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 2:
        crop_logo(sys.argv[1], sys.argv[2])
    else:
        print("Usage: script.py <input> <output>")
