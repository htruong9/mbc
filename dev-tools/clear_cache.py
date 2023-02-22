import pathlib

for p in pathlib.Path('src').rglob('*.py[co]'):
    print(p)
    try:
        p.unlink()
    except:
        pass

for p in pathlib.Path('src').rglob('__pycache__'):
    print(p)
    try:
        p.unlink()
    except:
        pass

