#!/usr/bin/env python3
"""Backward-compatible wrapper for the full public HTML finalizer."""
from pathlib import Path
import runpy

runpy.run_path(str(Path(__file__).with_name("finalize-public-html.py")), run_name="__main__")
