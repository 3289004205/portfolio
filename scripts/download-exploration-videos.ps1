# download-exploration-videos.ps1
# Self-host external catbox videos by downloading them into public/.
# Run from anywhere (auto-detects project root from this script's location):
#   powershell -ExecutionPolicy Bypass -File scripts/download-exploration-videos.ps1

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$Root = Split-Path -Parent $ScriptDir

# rel-path-under-public  ->  catbox url
$map = @{
  "public/explorations/3d/video/fmlg5c.mp4"            = "https://files.catbox.moe/fmlg5c.mp4"
  "public/explorations/3d/video/xa8vmc.mp4"            = "https://files.catbox.moe/xa8vmc.mp4"
  "public/explorations/3d/video/o70ltt.mp4"            = "https://files.catbox.moe/o70ltt.mp4"
  "public/explorations/digital-human/4xxesj.mp4"       = "https://files.catbox.moe/4xxesj.mp4"
  "public/explorations/ai-videos/douyin/2ye1we.mp4"    = "https://files.catbox.moe/2ye1we.mp4"
  "public/explorations/ai-videos/douyin/r4avnl.mp4"    = "https://files.catbox.moe/r4avnl.mp4"
  "public/explorations/ai-videos/douyin/1u5gcs.mp4"    = "https://files.catbox.moe/1u5gcs.mp4"
  "public/explorations/ai-videos/douyin/6qkjb5.mp4"    = "https://files.catbox.moe/6qkjb5.mp4"
  "public/explorations/ai-videos/douyin/e1d1ai.mp4"    = "https://files.catbox.moe/e1d1ai.mp4"
  "public/explorations/ai-videos/douyin/lbod0d.mp4"    = "https://files.catbox.moe/lbod0d.mp4"
  "public/explorations/ai-videos/douyin/m7o55h.mp4"    = "https://files.catbox.moe/m7o55h.mp4"
  "public/explorations/ai-videos/douyin/l0bb5s.mp4"    = "https://files.catbox.moe/l0bb5s.mp4"
}

# pick a download tool
$tool = $null
if (Get-Command curl.exe -ErrorAction SilentlyContinue) { $tool = 'curl' }
else { $tool = 'iwr' }
Write-Host ("Using download tool: {0}" -f $tool)

foreach ($rel in $map.Keys) {
  $url = $map[$rel]
  $dst = Join-Path $Root $rel
  $dir = Split-Path $dst
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  Write-Host ("Downloading {0} -> {1}" -f $url, $dst)
  if ($tool -eq 'curl') {
    & curl.exe -L --max-time 240 -o "$dst" "$url"
  } else {
    Invoke-WebRequest -Uri $url -OutFile $dst -TimeoutSec 240
  }
  if (Test-Path $dst) {
    Write-Host ("  OK {0} bytes" -f (Get-Item $dst).Length)
  } else {
    Write-Host "  FAILED"
  }
}
Write-Host "All done. Next: switch explorations.ts / AiVideos.tsx video URLs to local relative paths."
