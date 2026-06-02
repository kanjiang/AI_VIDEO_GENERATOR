const path = require("path");
const nextBin = require.resolve("next/dist/bin/next");
const preload = "--require ./scripts/disable-next-trace.js";
const existingNodeOptions = process.env.NODE_OPTIONS || "";

require(path.join(__dirname, "disable-next-trace.js"));

if (!existingNodeOptions.includes(preload)) {
	process.env.NODE_OPTIONS = [existingNodeOptions, preload].filter(Boolean).join(" ");
}

process.argv = [process.argv[0], nextBin, "dev", ...process.argv.slice(2)];

require(nextBin);
