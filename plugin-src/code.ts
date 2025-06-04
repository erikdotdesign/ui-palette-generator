figma.showUI(__html__, { width: 400, height: 600 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate-theme') {
    console.log('Primary color received:', msg.primaryColor);
    // You’ll call your color generation logic here later
  }
};