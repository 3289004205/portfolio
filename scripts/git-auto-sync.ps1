param(
  [int]$PollSeconds = 2
)

$ErrorActionPreference = 'Stop'
$repoPath = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $repoPath

function Invoke-Git {
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$GitArgs)

  & git @GitArgs
  if ($LASTEXITCODE -ne 0) {
    throw "git $($GitArgs -join ' ') failed with exit code $LASTEXITCODE"
  }
}

Write-Host "Watching $repoPath"
Write-Host "Changes will be committed and pushed to origin/main. Press Ctrl+C to stop."

while ($true) {
  try {
    $changes = & git status --porcelain
    if ($LASTEXITCODE -ne 0) {
      throw 'Unable to read Git status.'
    }

    if ($changes) {
      Start-Sleep -Seconds $PollSeconds
      Invoke-Git add -A

      & git diff --cached --quiet
      if ($LASTEXITCODE -ne 0) {
        $timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
        Invoke-Git commit -m "auto-sync: $timestamp"
        Invoke-Git pull --rebase origin main
        Invoke-Git push origin main
        Write-Host "[$timestamp] Synced $(git rev-parse --short HEAD)"
      }
    }
  }
  catch {
    Write-Warning $_
    Write-Host "Retrying in 10 seconds..."
    Start-Sleep -Seconds 10
  }

  Start-Sleep -Seconds $PollSeconds
}
