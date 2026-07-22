@echo off
set /p FORM_ID=Paste your Formspree form ID: 
python tools\configure-contact-form.py %FORM_ID%
if errorlevel 1 (
  echo.
  echo Configuration was not completed. Review the message above.
  pause
  exit /b 1
)
echo.
echo Contact form configured successfully.
pause
