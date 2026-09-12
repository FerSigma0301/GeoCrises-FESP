from pathlib import Path

path = Path('/home/ubuntu/geocrisis/client/src/game/crisesData.ts')
text = path.read_text()
start = text.find("  {\n    \"id\": \"crisis-earthquake-1\"")
if start < 0:
    raise SystemExit('new crisis block not found')
end = text.rfind('\n];')
if end < start:
    raise SystemExit('invalid block boundaries')
block = text[start:end]
text = text[:start].rstrip() + '\n' + text[end:]
array_end = text.find('\n];\n\nexport const SURVEY_QUESTIONS')
if array_end < 0:
    raise SystemExit('main crisis array terminator not found')
text = text[:array_end] + ',\n' + block + text[array_end:]
path.write_text(text)
print('moved new crises into CRISES_DATA')
