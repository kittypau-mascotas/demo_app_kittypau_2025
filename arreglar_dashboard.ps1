Write-Host "=== REPARACIÓN VISUAL DASHBOARD ===" -ForegroundColor Cyan

# 1. Reparar rutas de imágenes (Logo y Mascotas)
Write-Host "1. Corrigiendo rutas de imágenes..." -ForegroundColor Yellow
if (Test-Path "client/src") {
    $files = Get-ChildItem -Path "client/src" -Recurse -Include "*.tsx", "*.ts", "*.jsx", "*.js"

    foreach ($file in $files) {
        $content = Get-Content $file.FullName -Raw
        $originalContent = $content

        # Reemplazar rutas rotas por las correctas en /graficas/
        $content = $content -replace 'src="/kitty-logo.svg"', 'src="/graficas/kitty-logo.svg"'
        $content = $content -replace 'src="kitty-logo.svg"', 'src="/graficas/kitty-logo.svg"'
        $content = $content -replace 'src="/kitty-logo.jpg"', 'src="/graficas/kitty-logo.jpg"'
        $content = $content -replace 'src="kitty-logo.jpg"', 'src="/graficas/kitty-logo.jpg"'
        
        $content = $content -replace 'src="/bandida.jpg"', 'src="/graficas/bandida.jpg"'
        $content = $content -replace 'src="/bruno.jpg"', 'src="/graficas/bruno.jpg"'

        if ($content -ne $originalContent) {
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8
            Write-Host "   ✅ Rutas corregidas en: $($file.Name)" -ForegroundColor Green
        }
    }

    # 2. Reparar Layout (Navbar sobre Sidebar)
    Write-Host "`n2. Ajustando z-index del Layout..." -ForegroundColor Yellow
    $layoutFiles = Get-ChildItem -Path "client/src" -Recurse -Include "Sidebar.tsx", "Header.tsx", "AppLayout.tsx", "Navbar.tsx"

    foreach ($file in $layoutFiles) {
        $content = Get-Content $file.FullName -Raw
        $originalContent = $content
        
        # Sidebar: Asegurar que tenga z-50 si es fixed (para estar encima)
        if ($file.Name -match "Sidebar") {
            if ($content -match "fixed" -and $content -notmatch "z-50") {
                $content = $content -replace '(className="[^"]*fixed[^"]*)(")', '$1 z-50$2'
                Write-Host "   ✅ Sidebar: z-50 aplicado en $($file.Name)" -ForegroundColor Green
            }
        }
        
        # Header/Navbar: Asegurar que tenga z-40 (para estar debajo del sidebar)
        if ($file.Name -match "Header" -or $file.Name -match "Navbar") {
            if ($content -match "z-50") {
                $content = $content -replace "z-50", "z-40"
                Write-Host "   ✅ Header: z-index reducido a 40 en $($file.Name)" -ForegroundColor Green
            } elseif ($content -match "fixed" -and $content -notmatch "z-") {
                $content = $content -replace '(className="[^"]*fixed[^"]*)(")', '$1 z-40$2'
                Write-Host "   ✅ Header: z-40 aplicado en $($file.Name)" -ForegroundColor Green
            }
        }
        
        if ($content -ne $originalContent) {
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        }
    }
} else {
    Write-Host "❌ No se encontró la carpeta client/src" -ForegroundColor Red
}

Write-Host "`n=== REPARACIÓN COMPLETADA ===" -ForegroundColor Cyan
Write-Host "Reinicia el servidor para ver los cambios." -ForegroundColor Gray