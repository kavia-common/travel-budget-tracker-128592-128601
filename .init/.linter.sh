#!/bin/bash
cd /home/kavia/workspace/code-generation/travel-budget-tracker-128592-128601/trip_tracker_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

