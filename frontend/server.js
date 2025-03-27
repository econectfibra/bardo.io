// simple express server to run frontend production build;
const express = require('express')
const path = require('path')
const app = express()

// Servir arquivos estáticos da pasta dist/pwa
app.use(express.static(path.join(__dirname, 'dist/pwa')))

// Rota para todas as requisições
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/pwa', 'index.html'))
})

app.listen(4444)


