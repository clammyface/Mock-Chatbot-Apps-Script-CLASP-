#!/bin/bash

ENV=$1
if [[ "$ENV" != "dev" && "$ENV" != "prod" ]]; then
  echo "❌ Please specify 'dev' or 'prod' as argument."
  exit 1
fi

echo "📦 Deploying to $ENV environment..."

# Set ENV label
LABEL=$(echo "$ENV" | tr '[:lower:]' '[:upper:]')

# Replace ENV_NAME in test.template.js
sed "s/{{ENV_NAME}}/${LABEL}/g" test.template.js > test.js

# Prepare clasp config
cp clasp.env.$ENV.json .clasp.json

# Add rootDir if missing
jq '. + {"rootDir": "./"}' .clasp.json > .clasp.json.tmp && mv .clasp.json.tmp .clasp.json

# Push to GAS
clasp push --force

echo "✅ Code pushed to $ENV environment."

