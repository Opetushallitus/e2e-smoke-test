#!/usr/bin/env bash

curl -H "Content-Type: application/json" -X POST \
   --data "{\"text\": \"(${REPORT_DOMAIN}) e2e-smoke testit epäonnistuivat ${ACTION_URL}\"}" \
   ${SLACK_TOKEN}
