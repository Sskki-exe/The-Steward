@echo off
git pull
git add --all
set /p msg=Enter commit message:
git commit -m "%msg%"
git push