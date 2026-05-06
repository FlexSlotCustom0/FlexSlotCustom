import sys
import numpy as np
from PIL import Image

def crop_logo(image_path, output_path):
    try:
        with Image.open(image_path) as img:
            # Convert to numpy array
            img_arr = np.array(img.convert('RGB'))
            
            # Assuming top-left pixel is background
            bg_color = img_arr[0, 0]
            
            # Find pixels that are significantly different from background
            diff = np.abs(img_arr - bg_color)
            mask = np.sum(diff, axis=-1) > 30  # threshold
            
            # Find rows and cols where mask is True
            rows = np.any(mask, axis=1)
            cols = np.any(mask, axis=0)
            
            rmin, rmax = np.where(rows)[0][[0, -1]]
            cmin, cmax = np.where(cols)[0][[0, -1]]
            
            # The content spans from cmin to cmax.
            # Usually the logo is on the left, text on the right.
            # Let's see the column distribution.
            # We can project the mask onto the x-axis (columns).
            col_sums = np.sum(mask, axis=0)
            
            # Find the gap between logo and text
            # Start from cmin, go right until we hit a gap (col_sums == 0)
            in_logo = False
            logo_cmin = cmin
            logo_cmax = cmin
            
            for c in range(cmin, cmax):
                if col_sums[c] > 0:
                    logo_cmax = c
                else:
                    # If we found a gap of at least 20 pixels, we assume it's the gap between logo and text
                    if c - logo_cmax > 20:
                        break
            
            # Now we have logo_cmin and logo_cmax.
            # Let's find the rows for this specific column range to crop tightly.
            logo_mask = mask[:, logo_cmin:logo_cmax+1]
            logo_rows = np.any(logo_mask, axis=1)
            logo_rmin, logo_rmax = np.where(logo_rows)[0][[0, -1]]
            
            # Add some padding
            padding = int((logo_cmax - logo_cmin) * 0.2)
            
            crop_cmin = max(0, logo_cmin - padding)
            crop_cmax = min(img.width, logo_cmax + padding)
            crop_rmin = max(0, logo_rmin - padding)
            crop_rmax = min(img.height, logo_rmax + padding)
            
            # Make it square if possible
            w = crop_cmax - crop_cmin
            h = crop_rmax - crop_rmin
            size = max(w, h)
            
            center_x = (crop_cmin + crop_cmax) // 2
            center_y = (crop_rmin + crop_rmax) // 2
            
            final_cmin = max(0, center_x - size // 2)
            final_cmax = min(img.width, center_x + size // 2)
            final_rmin = max(0, center_y - size // 2)
            final_rmax = min(img.height, center_y + size // 2)
            
            # Crop and save
            cropped_img = img.crop((final_cmin, final_rmin, final_cmax, final_rmax))
            cropped_img.save(output_path)
            print(f"Cropped logo saved to {output_path}")
            print(f"Original size: {img.size}")
            print(f"Cropped size: {cropped_img.size}")
            print(f"Crop box: ({final_cmin}, {final_rmin}, {final_cmax}, {final_rmax})")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 2:
        crop_logo(sys.argv[1], sys.argv[2])
    else:
        print("Please provide input and output image paths.")
