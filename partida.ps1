Write-Host "==========================================" -ForegroundColor Magenta
Write-Host "   PARTIDA MAESTRA: INICIO Y DIAGNOSTICO  " -ForegroundColor Magenta
Write-Host "==========================================" -ForegroundColor Magenta

# 1. Ejecutar el script de inicio (Setup + Servidor)
Write-Host "`n>>> PASO 1: Ejecutando iniciar_proyecto.ps1" -ForegroundColor Cyan
Write-Host "    (El servidor se iniciara. Presiona Ctrl+C para detenerlo y continuar con el diagnostico)" -ForegroundColor Gray
if (Test-Path ".\iniciar_proyecto.ps1") {
    & ".\iniciar_proyecto.ps1"
} else {
    Write-Host "ERROR: No se encuentra iniciar_proyecto.ps1" -ForegroundColor Red
}

# 2. Ejecutar el diagnóstico al terminar
Write-Host "`n>>> PASO 2: Ejecutando diagnostico_total.ps1" -ForegroundColor Cyan
if (Test-Path ".\diagnostico_total.ps1") {
    & ".\diagnostico_total.ps1"
} else {
    Write-Host "ERROR: No se encuentra diagnostico_total.ps1" -ForegroundColor Red
}

Write-Host "`n=== PROCESO COMPLETADO ===" -ForegroundColor Magenta