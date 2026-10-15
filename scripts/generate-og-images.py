#!/usr/bin/env python3
"""Generate branded 1200x630 Open Graph share cards into public/assets/og/.

One card per public route, in the site's dark palette with the gold accent.
Re-run after renaming a route or changing a page's positioning.
"""
import os, textwrap
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = '#0B0E10'
FG = '#F3F0EA'
MUTED = '#A5A29B'
GOLD = '#C8AE82'
LINE = '#24262a'

SERIF = '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf'
MONO = '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'

CARDS = [
    ('home', 'INTELLIGENT SYSTEMS ENGINEERING', 'NahaLabs', 'Find the problem. Prove the mechanism. Engineer the system.'),
    ('about', 'COMPANY', 'About NahaLabs', 'Intelligent systems engineering, Johannesburg, South Africa.'),
    ('systems', 'PUBLIC ENGINEERING WORK', 'Systems NahaLabs is building.', 'Inspectable public repositories and system experiments.'),
    ('press', 'PRESS & RESEARCH', 'NahaLabs in brief', 'Company background, engineering evidence and research themes.'),
    ('insights', 'INSIGHTS', 'Evidence-led field notes.', 'Where fragmented information becomes expensive.'),
    ('contact', 'CONTACT', 'Tell us what should work better.', 'Start an enquiry with NahaLabs.'),
    ('audit', 'FREE WEBSITE REVENUE LEAK AUDIT', 'Where is your website losing enquiries?', 'A free diagnosis of conversion, trust, mobile and technical leaks.'),
    ('revenuedesk', 'NAHALABS REVENUEDESK', 'Front desk & revenue recovery.', 'Capture every enquiry. Recover the revenue between contact and booked work.'),
    ('bankbook', 'NAHALABS BANKBOOK', 'Invoice & bank review desk.', 'Check extracted invoice data against its source. Sample data. Fictional records.'),
    ('cargo-iq', 'NAHALABS CARGOIQ', 'Freight evidence and dispute intelligence.', 'Operational evidence, commercial rules, financial exposure.'),
    ('nutri-tummies', 'NAHALABS NUTRI TUMMIES', 'Family meal planning for SA kitchens.', 'Family meal planning for South African kitchens.'),
    ('fieldproof', 'NAHALABS FIELDPROOF', 'Field evidence, captured and verified.', 'Field evidence checks on fictional data.'),
    ('railwatch', 'NAHALABS RAILWATCH', 'Rail operations monitoring.', 'Corridor monitoring on fictional data.'),
    ('revenue-leak-audit-johannesburg', 'FREE AUDIT - JOHANNESBURG', 'Where is your website losing enquiries?', 'Free website revenue leak audit from NahaLabs.'),
]

def fit(draw, text, font_path, max_width, start):
    size = start
    while size > 28:
        f = ImageFont.truetype(font_path, size)
        lines = []
        for para in text.split('\n'):
            words = para.split()
            line = ''
            for w in words:
                t = (line + ' ' + w).strip()
                if draw.textlength(t, font=f) <= max_width:
                    line = t
                else:
                    if line: lines.append(line)
                    line = w
            lines.append(line)
        if len(lines) <= 3:
            return f, lines
        size -= 4
    return ImageFont.truetype(font_path, 28), textwrap.wrap(text, 40)[:3]

def main():
    out = os.path.join('public', 'assets', 'og')
    os.makedirs(out, exist_ok=True)
    for slug, eyebrow, title, sub in CARDS:
        img = Image.new('RGB', (W, H), BG)
        d = ImageDraw.Draw(img)
        d.rectangle([0, 0, W, 6], fill=GOLD)
        mono = ImageFont.truetype(MONO, 24)
        d.text((64, 56), eyebrow, font=mono, fill=GOLD)
        d.text((W - 64 - d.textlength('NAHALABS', font=mono), 56), 'NAHALABS', font=mono, fill=FG)
        title_font, lines = fit(d, title, SERIF, W - 128, 84)
        y = 190
        for ln in lines:
            d.text((64, y), ln, font=title_font, fill=FG)
            y += title_font.size + 18
        sub_font = ImageFont.truetype(MONO, 26)
        y += 12
        for ln in textwrap.wrap(sub, 62)[:2]:
            d.text((64, y), ln, font=sub_font, fill=MUTED)
            y += 40
        d.line([64, H - 88, W - 64, H - 88], fill=LINE, width=2)
        foot = ImageFont.truetype(MONO, 22)
        d.text((64, H - 64), 'www.nahalabs.co.za', font=foot, fill=MUTED)
        path = os.path.join(out, f'{slug}.png')
        img.save(path, 'PNG', optimize=True)
        print(f'{slug}.png {os.path.getsize(path)//1024}KB')

if __name__ == '__main__':
    main()
