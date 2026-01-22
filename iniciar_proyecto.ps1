Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "   INICIANDO ENTORNO DE DESARROLLO KITTYPAW   " -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

# 1. Instalación de dependencias
Write-Host "1. Verificando e instalando dependencias..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "   node_modules ya existe. Saltando instalación completa." -ForegroundColor Gray
} else {
    Write-Host "   Instalando paquetes (esto puede tardar)..." -ForegroundColor Gray
    npm install
}

# 2. Sincronización de Base de Datos (CRÍTICO PARA EVITAR ERRORES DE TIPOS)
Write-Host "`n2. Sincronizando esquema de base de datos (Drizzle)..." -ForegroundColor Yellow
Write-Host "   Esto asegura que los tipos de TypeScript coincidan con tu DB real." -ForegroundColor Gray
try {
    npm run db:push
    Write-Host "   Base de datos sincronizada correctamente." -ForegroundColor Green
} catch {
    Write-Host "   Error al sincronizar la DB. Revisa tu conexión a Internet o .env" -ForegroundColor Red
    # No detenemos el script, pero avisamos
}

# 3. Verificación rápida de tipos
Write-Host "`n3. Verificación rápida de salud del código..." -ForegroundColor Yellow
$check = Start-Process -FilePath "npm" -ArgumentList "run check" -NoNewWindow -PassThru -Wait
if ($check.ExitCode -ne 0) {
    Write-Host "   ADVERTENCIA: Se detectaron errores de TypeScript." -ForegroundColor Red
    Write-Host "   El servidor iniciará igual, pero revisa la consola para detalles." -ForegroundColor Red
} else {
    Write-Host "   Código saludable." -ForegroundColor Green
}

# 4. Iniciar Servidor
Write-Host "`n4. Iniciando servidor..." -ForegroundColor Green

# Detectar si Vercel CLI está instalado (Recomendado para Fullstack)
if (Get-Command "vercel" -ErrorAction SilentlyContinue) {
    Write-Host "   ✅ Vercel CLI detectado." -ForegroundColor Green
    Write-Host "   Iniciando entorno completo (Frontend + Backend) en http://localhost:3000" -ForegroundColor Cyan
    Write-Host "   👉 Accede a la App en: http://localhost:3000" -ForegroundColor Green
    
    try { Start-Process "http://localhost:3000" } catch {}
    vercel dev
} else {
    Write-Host "   ⚠️  Vercel CLI no encontrado. Iniciando solo Frontend (Vite)..." -ForegroundColor Yellow
    Write-Host "   El backend NO funcionará automáticamente. Debes iniciarlo manualmente." -ForegroundColor Red
    
    try { Start-Process "http://localhost:5173" } catch {}
    npm run dev
}