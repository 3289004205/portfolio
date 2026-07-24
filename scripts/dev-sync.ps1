$ErrorActionPreference = 'Stop'
$repoPath = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $repoPath

$syncScript = Join-Path $PSScriptRoot 'git-auto-sync.ps1'
$syncProcess = Start-Process powershell -ArgumentList @(
  '-NoProfile',
  '-ExecutionPolicy', 'Bypass',
  '-File', "`"$syncScript`""
) -WindowStyle Hidden -PassThru

try {
  Write-Host "Auto-sync is running in the background (PID $($syncProcess.Id))."
  Write-Host "Starting Vite..."
  & npm run dev
}
finally {
  if (-not $syncProcess.HasExited) {
    Stop-Process -Id $syncProcess.Id
  }
}
