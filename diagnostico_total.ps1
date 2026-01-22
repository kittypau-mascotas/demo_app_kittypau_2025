# diagnostico_total.ps1
# Script de diagnóstico EXHAUSTIVO para KittyPaw
# Detecta errores de entorno, red, configuración y dependencias.

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   DIAGNOSTICO TOTAL DEL SISTEMA KITTYPAU   " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

$errores = @()
$advertencias = @()

# 1. Verificación de Entorno Local
Write-Host "1. ENTORNO LOCAL Y HERRAMIENTAS" -ForegroundColor Yellow
Write-Host "-------------------------------"

# Node.js y NPM
try {
    $nodeVersion = node -v 2>&1
    Write-Host "Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Node.js: NO INSTALADO o no en PATH" -ForegroundColor Red
    $errores += "Node.js no está instalado."
}

try {
    $npmVersion = npm -v 2>&1
    Write-Host "NPM: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "NPM: NO INSTALADO o no en PATH" -ForegroundColor Red
    $errores += "NPM no está instalado."
}

# Vercel CLI
try {
    $vercelVersion = vercel --version 2>&1
    Write-Host "Vercel CLI: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "Vercel CLI: NO INSTALADO (Recomendado: npm i -g vercel)" -ForegroundColor Red
    $advertencias += "Vercel CLI no está instalado globalmente."
}

# Archivos Clave
$filesToCheck = @(".env", "package.json", "tsconfig.json", "vite.config.ts", "drizzle.config.ts")
foreach ($file in $filesToCheck) {
    if (Test-Path $file) {
        Write-Host "Archivo ${file}: ENCONTRADO" -ForegroundColor Green
    } else {
        Write-Host "Archivo ${file}: FALTANTE" -ForegroundColor Red
        $errores += "Falta el archivo crítico: ${file}"
    }
}

# Detección de conflicto de gestores de paquetes
if (Test-Path "yarn.lock") {
    Write-Host "CONFLICTO DETECTADO: Existe 'yarn.lock' junto con 'package-lock.json'." -ForegroundColor Red
    Write-Host "  -> Esto causa que Vercel CLI falle al intentar usar yarn." -ForegroundColor Yellow
    $errores += "Conflicto de gestores: Eliminar 'yarn.lock' para usar npm."
} else {
    Write-Host "Gestor de paquetes: OK (Solo npm detectado)" -ForegroundColor Green
}

Write-Host ""

# 2. Verificación de Configuración y Red
Write-Host "2. CONFIGURACION Y RED" -ForegroundColor Yellow
Write-Host "----------------------"

# Puertos
$portsToCheck = @(3000, 5173)
foreach ($port in $portsToCheck) {
    # Usamos -WarningAction SilentlyContinue para evitar el texto rojo confuso cuando el puerto está libre
    $tcpConn = Test-NetConnection -ComputerName localhost -Port $port -InformationLevel Quiet -WarningAction SilentlyContinue
    if ($tcpConn) {
        Write-Host "Puerto ${port}: OCUPADO (Puede impedir que arranque el servidor)" -ForegroundColor Yellow
        $advertencias += "El puerto ${port} está en uso. Asegúrate de no tener otros procesos corriendo."
    } else {
        Write-Host "Puerto ${port}: LIBRE (OK)" -ForegroundColor Green
    }
}

# Variables de Entorno y DB
if (Test-Path ".env") {
    $envContent = Get-Content ".env"
    $dbUrlLine = $envContent | Where-Object { $_ -match "^DATABASE_URL=" }
    
    if ($dbUrlLine) {
        Write-Host "DATABASE_URL: Configurada" -ForegroundColor Green
        # Extraer host y puerto de la URL (formato postgres://user:pass@host:port/db)
        # Regex mejorado para soportar URLs sin puerto explícito o con parámetros extra
        if ($dbUrlLine -match "@([^:/]+)(?::(\d+))?") {
            $dbHost = $matches[1]
            $dbPort = if ($matches[2]) { $matches[2] } else { "5432" } # Puerto por defecto 5432 si no se especifica
            
            Write-Host "  -> Host Neon: $dbHost"
            Write-Host "  -> Puerto Neon: $dbPort"
            
            try {
                $tcpClient = New-Object System.Net.Sockets.TcpClient
                $connectTask = $tcpClient.ConnectAsync($dbHost, [int]$dbPort)
                if ($connectTask.Wait(3000)) { # Timeout de 3 segundos
                    Write-Host "  -> Conexion TCP a Neon: EXITOSA" -ForegroundColor Green
                    $tcpClient.Close()
                } else {
                    Write-Host "  -> Conexion TCP a Neon: TIMEOUT" -ForegroundColor Red
                    $errores += "No se puede conectar a Neon ($dbHost). Revisa tu internet o firewall."
                }
            } catch {
                Write-Host "  -> Conexion TCP a Neon: FALLIDA ($($_.Exception.Message))" -ForegroundColor Red
                $errores += "Error de conexión a Neon: $($_.Exception.Message)"
            }
        } else {
            Write-Host "  -> Formato de DATABASE_URL no reconocido para prueba TCP." -ForegroundColor Yellow
        }
    } else {
        Write-Host "DATABASE_URL no encontrada en .env" -ForegroundColor Red
        $errores += "Falta DATABASE_URL en .env"
    }
} else {
    Write-Host "No se puede verificar configuración sin archivo .env" -ForegroundColor Red
}

Write-Host ""

# 3. Estado del Proyecto (TypeScript/Build)
Write-Host "3. INTEGRIDAD DEL CODIGO" -ForegroundColor Yellow
Write-Host "------------------------"

# Scripts en package.json
if (Test-Path "package.json") {
    $pkgJson = Get-Content "package.json" | ConvertFrom-Json
    $scripts = $pkgJson.scripts
    $requiredScripts = @("dev", "build", "check", "db:push")
    foreach ($script in $requiredScripts) {
        if ($scripts | Get-Member -Name $script) {
            Write-Host "Script '$script': OK" -ForegroundColor Green
        } else {
            Write-Host "Script '$script': FALTANTE" -ForegroundColor Red
            $errores += "Falta el script '$script' en package.json"
        }
    }
}

Write-Host "Ejecutando verificacion de tipos (npm run check)..."
# Ejecutar npm run check y capturar salida y error
try {
    $checkProcess = Start-Process -FilePath "npm" -ArgumentList "run check" -NoNewWindow -PassThru -Wait
    if ($checkProcess.ExitCode -eq 0) {
        Write-Host "TypeScript Check: OK (Sin errores)" -ForegroundColor Green
    } else {
        Write-Host "TypeScript Check: ERRORES DETECTADOS" -ForegroundColor Red
        $errores += "El código tiene errores de TypeScript (ejecuta 'npm run check' para verlos)."
    }
} catch {
    Write-Host "No se pudo ejecutar npm run check" -ForegroundColor Red
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "              RESUMEN FINAL               " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

if ($errores.Count -eq 0) {
    Write-Host "✅ TODO PARECE CORRECTO. El sistema está listo para ejecutarse." -ForegroundColor Green
} else {
    Write-Host "❌ SE ENCONTRARON PROBLEMAS CRITICOS:" -ForegroundColor Red
    foreach ($err in $errores) {
        Write-Host "  - $err" -ForegroundColor Red
    }
}

if ($advertencias.Count -gt 0) {
    Write-Host "⚠️ ADVERTENCIAS:" -ForegroundColor Yellow
    foreach ($adv in $advertencias) {
        Write-Host "  - $adv" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Diagnostico finalizado." -ForegroundColor Cyan