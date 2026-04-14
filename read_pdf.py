import PyPDF2

try:
    with open('Untitled document.pdf', 'rb') as f:
        reader = PyPDF2.PdfReader(f)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        
        with open('output.txt', 'w', encoding='utf-8') as out:
            out.write(text)
        print("Done")
except Exception as e:
    print(f"Error: {e}")
