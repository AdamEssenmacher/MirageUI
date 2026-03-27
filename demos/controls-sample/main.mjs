import { dotnet } from "./_framework/dotnet.js?v=dac72f639d34-20260327002530";

async function installMirageHotReloadHints() {
  try {
    const mirageDom = await import("./_framework/mirage-dom.js?v=dac72f639d34-20260327002530");
    mirageDom.installHotReloadHintBridge?.();
  } catch {
    // Hot reload hinting is optional; polling fallback remains active in .NET.
  }
}

async function start() {
  const appRoot = document.getElementById("app");

  try {
    await installMirageHotReloadHints();

    const runtime = await dotnet
      .withDiagnosticTracing(false)
      .create();

    await runtime.runMain();
  } catch (error) {
    console.error("Failed to start .NET runtime:", error);

    if (appRoot) {
      appRoot.textContent = "Startup failed. Check browser console for details.";
    }
  }
}

await start();
