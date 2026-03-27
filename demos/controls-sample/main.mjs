import { dotnet } from "./_framework/dotnet.js?v=46796b0cffbc-20260327125935";

async function installMirageHotReloadHints() {
  try {
    const mirageDom = await import("./_framework/mirage-dom.js?v=46796b0cffbc-20260327125935");
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
      .withDebugging(0)
      .withConfig({ ignorePdbLoadErrors: true })
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
