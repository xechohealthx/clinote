#!/usr/bin/env python3
"""
Setup script for Clinote Whisper Server macOS App
"""

from setuptools import setup
import py2app

APP = ['ClinoteWhisperServer.py']
DATA_FILES = [
    ('local-server', ['../local-server/whisper_server.py', '../local-server/requirements.txt']),
    ('icons', ['../icons/icon-128.png'])
]
OPTIONS = {
    'argv_emulation': True,
    'iconfile': '../icons/icon-128.png',
    'excludes': ['test', 'tests', 'certdata'],
    'includes': ['tkinter', 'tkinter.filedialog', 'tkinter.messagebox', 'tkinter.scrolledtext'],
    'plist': {
        'CFBundleName': 'Clinote Whisper Server',
        'CFBundleDisplayName': 'Clinote Whisper Server',
        'CFBundleIdentifier': 'com.clinote.whisperserver',
        'CFBundleVersion': '1.0.0',
        'CFBundleShortVersionString': '1.0.0',
        'LSMinimumSystemVersion': '10.15',
        'NSHighResolutionCapable': True,
        'LSUIElement': False,
        'NSAppTransportSecurity': {
            'NSAllowsLocalNetworking': True
        }
    }
}

setup(
    app=APP,
    data_files=DATA_FILES,
    options={'py2app': OPTIONS},
    setup_requires=['py2app'],
) 