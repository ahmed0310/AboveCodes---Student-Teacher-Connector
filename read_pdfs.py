import fitz  # PyMuPDF
import sys

def print_pdf_text(filepath, out_file):
    try:
        doc = fitz.open(filepath)
        out_file.write(f"\n--- Reading: {filepath} ---\n\n")
        for i, page in enumerate(doc):
            out_file.write(f"--- Page {i+1} ---\n")
            out_file.write(page.get_text() + "\n")
    except Exception as e:
        out_file.write(f"Error reading {filepath}: {e}\n")

if __name__ == '__main__':
    with open('pdf_contents_utf8.txt', 'w', encoding='utf-8') as f:
        print_pdf_text('StudyBuddy - Project Details.pdf', f)
        print_pdf_text('Project Manual.pdf', f)
