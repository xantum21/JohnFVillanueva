#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"
python3 tools/finalize-public-html.py
python3 tools/validate_privacy_release.py
echo "Refinement applied and privacy validation passed."
echo "Remember: configure the contact form before deployment."
