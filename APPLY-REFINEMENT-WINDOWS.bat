@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  py tools\finalize-public-html.py
  if errorlevel 1 goto :fail
  py tools\validate_site_v3.py
  if errorlevel 1 goto :fail
) else (
  python tools\finalize-public-html.py
  if errorlevel 1 goto :fail
  python tools\validate_site_v3.py
  if errorlevel 1 goto :fail
)
echo.
echo Refinement applied and validation passed.
pause
exit /b 0
:fail
echo.
echo The refinement script reported an error. Review the messages above.
pause
exit /b 1
