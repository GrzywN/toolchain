setup:
	@npm install -D -E prettier@3.8.1 prettier-plugin-jsdoc@1.8.0 prettier-plugin-organize-imports@4.3.0
	@npm install -D -E prettier-plugin-tailwindcss@0.7.2
	@jq '.scripts //= {} | .scripts.format = "prettier src/ --write --cache --ignore-unknown" | .scripts["format:check"] = "prettier src/ --check --ignore-unknown"' package.json > package.json.tmp && mv package.json.tmp package.json
