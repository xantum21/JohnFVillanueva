#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"
python3 tools/finalize-public-html.py
python3 tools/validate_site_v3.py
echo "Refinement applied and validation passed."
