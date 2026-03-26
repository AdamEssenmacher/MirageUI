import { dotnet } from "./_framework/dotnet.js?v=b3b71da4d468";

async function installMirageHotReloadHints() {
  try {
    const mirageDom = await import("./_framework/mirage-dom.js?v=b3b71da4d468");
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
