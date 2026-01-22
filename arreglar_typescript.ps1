Write-Host "=== CORRIGIENDO ERRORES DE TYPESCRIPT ===" -ForegroundColor Cyan

$targetFile = "api/[id].ts"

# Usamos -LiteralPath porque los corchetes [] son caracteres comodín en PowerShell
if (Test-Path -LiteralPath $targetFile) {
    $content = Get-Content -LiteralPath $targetFile -Raw
    
    # El error es que se intenta asignar un objeto Date a un campo que espera string.
    # Solución: Convertir .toISOString()
    $badCode = "birthDate: birthDate ? new Date(birthDate) : undefined"
    $goodCode = "birthDate: birthDate ? new Date(birthDate).toISOString() : undefined"

    if ($content.Contains($badCode)) {
        $newContent = $content.Replace($badCode, $goodCode)
        Set-Content -LiteralPath $targetFile -Value $newContent -Encoding UTF8
        Write-Host "✅ Corrección aplicada en $targetFile" -ForegroundColor Green
    } else {
        Write-Host "⚠️ No se encontró el código exacto o ya fue corregido." -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ No se encontró el archivo $targetFile" -ForegroundColor Red
}