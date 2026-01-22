Write-Host "=== DIAGNÓSTICO DE KITTYPAW ===" -ForegroundColor Cyan

# 1. Verificar entorno
Write-Host "`n1. Verificando entorno..." -ForegroundColor Yellow
Write-Host "Directorio actual: $(Get-Location)"
try { node -v } catch { Write-Host "Node no instalado" -ForegroundColor Red }
try { npm -v } catch { Write-Host "NPM no instalado" -ForegroundColor Red }

# 2. Verificar archivos críticos
Write-Host "`n2. Verificando archivos críticos..." -ForegroundColor Yellow
$files = @(
    "client/src/index.css",
    "client/tailwind.config.js",
    "client/postcss.config.js",
    "client/vite.config.ts"
)

foreach ($f in $files) {
    if (Test-Path $f) {
        Write-Host "[OK] $f existe." -ForegroundColor Green
    } else {
        Write-Host "[ERROR] $f NO existe." -ForegroundColor Red
    }
}

# 3. Verificar contenido de index.css
Write-Host "`n3. Verificando colores en index.css..." -ForegroundColor Yellow
$cssPath = "client/src/index.css"
if (Test-Path $cssPath) {
    $css = Get-Content $cssPath -Raw
    # Buscamos el color primario nuevo: 12 61% 79%
    if ($css -match "12 61% 79%") {
        Write-Host "[OK] Los colores nuevos están aplicados en el código." -ForegroundColor Green
    } else {
        Write-Host "[FALLO] No se detectan los colores nuevos en index.css." -ForegroundColor Red
        Write-Host "Contenido actual de --primary:"
        $css | Select-String "--primary:"
    }
} else {
    Write-Host "No se puede verificar index.css porque no existe." -ForegroundColor Red
}

# 4. Sugerencias
Write-Host "`n4. Sugerencias..." -ForegroundColor Yellow
Write-Host "Si los archivos existen y tienen el contenido correcto, intenta:"
Write-Host "  1. Detener el servidor (Ctrl+C)"
Write-Host "  2. Reiniciar el servidor forzando la caché: npm run dev -- --force"

Write-Host "`n=== FIN DEL DIAGNÓSTICO ===" -ForegroundColor Cyan