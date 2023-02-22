import pathlib
import os
import shutil


for p in pathlib.Path('src').rglob('migrations'):
    try:
        shutil.rmtree(p)
        print('delete', p)
    except Exception as e:
        print(e)

