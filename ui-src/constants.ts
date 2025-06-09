export const PLUGIN_NAME = "ui-palette-generator";

const STORAGE_KEY_NAME = PLUGIN_NAME;
const STORAGE_KEY_DELIMITER = ":";
const STORAGE_KEY_BASE = `${STORAGE_KEY_NAME}${STORAGE_KEY_DELIMITER}`;

export const STORAGE_KEY_PRIMARY_COLOR = `${STORAGE_KEY_BASE}primaryColor`;
export const STORAGE_KEY_DEFAULT_THEME = `${STORAGE_KEY_BASE}defaultTheme`;
export const STORAGE_KEY_SECONDARY_COLOR_TYPE = `${STORAGE_KEY_BASE}secondaryColorType`;

export const DEFAULT_PRIMARY_COLOR = "#6200ee";
export const DEFAULT_THEME = "dark";
export const DEFAULT_SECONDARY_COLOR_TYPE = "analogous";