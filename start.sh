#!/bin/bash

cd $(dirname $0)
env/bin/activate.bat
cd backend
export ANONYMIZED_TELEMETRY=False
python main.py
