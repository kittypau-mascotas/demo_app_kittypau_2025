# setup_kittyPaw.ps1
# Script limpio para preparar el proyecto KittyPaw en Windows

# Hosts y puerto de la DB
$dbHosts = @("54.156.15.30", "3.218.140.61", "44.198.216.75")
$port = 5432

# Probar conexiones TCP a la base de datos
foreach ($dbHost in $dbHosts) {
    Write-Host ("Probando conexión TCP a {0}:{1}..." -f $dbHost, $port)
    try {
        $tcpClient = New-Object System.Net.Sockets.TcpClient
        $tcpClient.Connect($dbHost, $port)
        if ($tcpClient.Connected) {
            Write-Host ("Conexión exitosa a {0}:{1}" -f $dbHost, $port)
            $tcpClient.Close()
        }
    } catch {
        Write-Warning ("No se pudo conectar a {0}:{1}. Revisa firewall y credenciales" -f $dbHost, $port)
    }
}

# Instalar dependencias
Write-Host "Instalando dependencias npm..."
npm install

# Aplicar esquema de la base de datos con Drizzle
Write-Host "Aplicando esquema de la base de datos..."
npm run db:push

# Verificar tipos de TypeScript
Write-Host "Verificando tipos TypeScript..."
npm run check

# Levantar servidor de desarrollo Vite
Write-Host "Levantando Vite en http://localhost:5173..."
npm run dev

Write-Host "Setup completado. Revisa la consola para posibles errores."
