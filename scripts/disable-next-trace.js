const fs = require("fs");
const path = require("path");
const toJsonReporter = require("next/dist/trace/report/to-json").default;

const originalCreateWriteStream = fs.createWriteStream.bind(fs);
const blockedTraceSuffixes = ["/.next/trace", "/.next-runtime/trace"];
const nullDevicePath = process.platform === "win32" ? "NUL" : "/dev/null";

function isBlockedTraceFile(file) {
	if (typeof file !== "string") {
		return false;
	}

	const normalized = path.resolve(file).replace(/\\/g, "/");
	return blockedTraceSuffixes.some((suffix) => normalized.endsWith(suffix));
}

fs.createWriteStream = function createWriteStreamPatched(file, ...args) {
	if (isBlockedTraceFile(file)) {
		return originalCreateWriteStream(nullDevicePath, ...args);
	}

	return originalCreateWriteStream(file, ...args);
};

toJsonReporter.report = () => {};
toJsonReporter.flushAll = async () => {};
