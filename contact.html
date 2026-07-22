#!/usr/bin/env python3
from __future__ import annotations
import json, re, subprocess
from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
errors=[]; warnings=[]; stats={}
html_files=sorted(ROOT.rglob('*.html'))
stats['html_files']=len(html_files)

private_patterns={
    'direct Gmail address': re.compile(r'[A-Za-z0-9._%+-]+@gmail\.com', re.I),
    'mailto link': re.compile(r'mailto:', re.I),
    'PSN profile link': re.compile(r'psnprofiles\.com', re.I),
}

for path in html_files:
    text=path.read_text(encoding='utf-8', errors='ignore')
    soup=BeautifulSoup(text,'html.parser')
    rel=str(path.relative_to(ROOT))
    if not soup.title or not soup.title.get_text(strip=True): errors.append(f'{rel}: missing title')
    if not soup.find('meta', attrs={'name':'description'}): errors.append(f'{rel}: missing description')
    ids=[tag.get('id') for tag in soup.find_all(attrs={'id':True})]
    dup=sorted({x for x in ids if ids.count(x)>1})
    if dup: errors.append(f'{rel}: duplicate IDs {dup}')
    for img in soup.find_all('img'):
        if img.get('alt') is None: errors.append(f'{rel}: image missing alt')
    for name,pattern in private_patterns.items():
        if pattern.search(text): errors.append(f'{rel}: contains {name}')
    for tag,attr in [('a','href'),('link','href'),('script','src'),('img','src')]:
        for node in soup.find_all(tag):
            value=node.get(attr)
            if not value or value.startswith(('http://','https://','#','data:','javascript:')): continue
            clean=value.split('#')[0].split('?')[0]
            if not clean: continue
            target=(ROOT/clean.lstrip('/')) if value.startswith('/') else (path.parent/clean)
            if target.is_dir(): target=target/'index.html'
            if not target.exists():
                if clean.startswith('play/') or str(path.relative_to(ROOT)).startswith('play/'):
                    warnings.append(f'{rel}: referenced playable file is supplied by the existing repository: {value}')
                else:
                    errors.append(f'{rel}: missing internal reference {value}')

contact=(ROOT/'contact.html').read_text(encoding='utf-8')
soup=BeautifulSoup(contact,'html.parser')
form=soup.find('form', attrs={'data-contact-form':True})
if not form: errors.append('contact.html: contact form missing')
else:
    action=form.get('action','')
    if not action.startswith('https://formspree.io/f/'): errors.append('contact.html: unexpected form action')
    for field in ['name','email','topic','message']:
        if not form.find(attrs={'name':field}): errors.append(f'contact.html: missing {field} field')
    if 'REPLACE_WITH_FORM_ID' in action: warnings.append('Contact form requires one-time Formspree ID configuration before deployment.')

# Text source scan outside HTML too.
for path in list(ROOT.rglob('*.js'))+list(ROOT.rglob('*.css'))+list(ROOT.rglob('*.md')):
    text=path.read_text(encoding='utf-8', errors='ignore')
    rel=str(path.relative_to(ROOT))
    for name,pattern in private_patterns.items():
        if pattern.search(text): errors.append(f'{rel}: contains {name}')

resume=ROOT/'assets/john-villanueva-resume.pdf'
if not resume.exists(): errors.append('Resume PDF missing')
else:
    extracted=subprocess.run(['pdftotext',str(resume),'-'],capture_output=True,text=True,check=True).stdout
    for name,pattern in private_patterns.items():
        if pattern.search(extracted): errors.append(f'Resume PDF contains {name}')
    stats['resume_pages']=int(subprocess.run(['pdfinfo',str(resume)],capture_output=True,text=True,check=True).stdout.split('Pages:')[1].splitlines()[0].strip())

# favicon consistency on primary pages
primary=['index.html','about.html','work.html','projects.html','life.html','timeline.html','contact.html','404.html']
for rel in primary:
    soup=BeautifulSoup((ROOT/rel).read_text(encoding='utf-8'),'html.parser')
    hrefs={x.get('href') for x in soup.find_all('link', rel=lambda x: x and 'icon' in x)}
    if '/assets/favicon-v3.svg' not in hrefs or '/favicon.ico' not in hrefs:
        errors.append(f'{rel}: standardized favicon links missing')

stats['errors']=len(errors); stats['warnings']=len(warnings)
report={'passed':not errors,'stats':stats,'errors':errors,'warnings':warnings}
(ROOT/'VALIDATION.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report,indent=2))
raise SystemExit(1 if errors else 0)
