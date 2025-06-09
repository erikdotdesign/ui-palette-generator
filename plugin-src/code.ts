import chroma from "chroma-js";
import { PLUGIN_NAME } from '../ui-src/constants';

figma.showUI(__html__, { width: 400, height: 600 });

const createThemeVariableCollection = async (defaultTheme: 'light' | 'dark') => {
  const collectionName = PLUGIN_NAME;
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  let collection = collections.find(c => c.name === collectionName);

  if (!collection) {
    collection = figma.variables.createVariableCollection(collectionName);
  }

  const getOrCreateMode = (collection, name) => {
    const existing = collection.modes.find(m => m.name === name);
    if (existing) return existing.modeId;

    try {
      return collection.addMode(name);
    } catch (e) {
      console.warn(`Failed to add mode "${name}".`, e);
      return null;
    }
  };

  const defaultModeId = getOrCreateMode(collection, defaultTheme) || collection.modes[0].modeId;
  const secondaryName = defaultTheme === "light" ? "dark" : "light";
  const secondaryModeId = getOrCreateMode(collection, secondaryName);
  const isSingleMode = secondaryModeId == null;

  return { collection, defaultModeId, secondaryModeId, isSingleMode };
};

const flattenThemeTokens = (theme, prefix = "") => {
  return Object.entries(theme).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}/${key}` : key;

    if (typeof value === "string") return [[fullKey, value]];
    if (typeof value === "object") return Object.entries(flattenThemeTokens(value, fullKey));

    return [];
  }).reduce((acc, [k, v]) => {
    acc[k] = v;
    return acc;
  }, {});
};

const createColorVariables = async ({themes, defaultTheme}) => {
  const {
    collection,
    defaultModeId,
    secondaryModeId,
    isSingleMode
  } = await createThemeVariableCollection(defaultTheme);

  const defaultTokens = flattenThemeTokens(themes[defaultTheme]);
  const secondaryTokens = flattenThemeTokens(
    themes[defaultTheme === "light" ? "dark" : "light"]
  );

  const allKeys = Array.from(new Set([...Object.keys(defaultTokens), ...Object.keys(secondaryTokens)]));

  for (const key of allKeys) {
    const existing = (await figma.variables.getLocalVariablesAsync())
      .find(v => v.name === key);

    const variable = existing || figma.variables.createVariable(key, collection, "COLOR");

    const parseColor = (hex) => {
      const [r, g, b, a] = chroma(hex).rgba();
      return { r: r / 255, g: g / 255, b: b / 255, a };
    };

    const primaryValue = parseColor(defaultTokens[key] || "#000");
    variable.setValueForMode(defaultModeId, primaryValue);

    if (!isSingleMode) {
      const secondaryValue = parseColor(secondaryTokens[key] || "#000");
      variable.setValueForMode(secondaryModeId, secondaryValue);
    }
  }
};

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'save-storage') {
    await figma.clientStorage.setAsync(msg.key, msg.value);
  }

  if (msg.type === 'load-storage') {
    const value = await figma.clientStorage.getAsync(msg.key);
    figma.ui.postMessage({ type: 'storage-loaded', key: msg.key, value });
  }
  if (msg.type === "generate-theme") {
    await createColorVariables({
      themes: msg.payload.themes,
      defaultTheme: msg.payload.theme
    });
    figma.notify("Theme variables created with light/dark modes!");
    figma.closePlugin();
  }
};