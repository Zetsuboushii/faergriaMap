const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
const app = express()
const PORT = 1338

app.use(cors())
app.use(express.json())

const db = new sqlite3.Database('./src/db.sqlite', sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message)
  console.log('Verbunden mit der SQLite-Datenbank.')
})

app.get('/markers', (req, res) => {
  const sql = 'select * from markers m join marker_types mt on m.fk_m_type = mt.mt_id join main.regions r on r.r_id = mt.fk_mt_region'
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({error: err.message})
      return
    }
    res.json({
      message: 'Erfolg',
      data: rows
    })
  })
})

app.get('/marker-types', (req, res) => {
  const sql = 'select * from marker_types order by fk_mt_region, mt_name'
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({error: err.message})
      return
    }
    res.json({
      message: 'Erfolg',
      data: rows
    })
  })
})

app.get('/marker-ceiling', (req, res) => {
  const sql = "select seq from sqlite_sequence where name = 'markers';"
  db.get(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({error: err.message})
      return
    }
    res.json({
      message: 'Erfolg',
      data: rows
    })
  })
})

app.get('/territories', (req, res) => {
  const sql = 'select * from territories order by t_id'
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({error: err.message})
      return
    }
    res.json({
      message: 'Erfolg',
      data: rows
    })
  })
})

app.post('/territory-coords', (req, res) => {
  const territoryData = req.body
  const sql = 'select c.c_lat, c.c_lng from territory_coords c join territories t on t.t_id = c.fk_t_id where t.t_id = ?'
  db.all(sql, [territoryData.t_id], (err, rows) => {
    if (err) {
      res.status(400).json({error: err.message})
      return
    }
    res.json({
      message: 'Erfolg',
      data: rows
    })
  })
})

app.post('/put-marker', (req, res) => {
  const markerData = req.body

  const sql = `
    insert into markers (m_name, fk_m_type, m_lat, m_lng)
    values (?, ?, ?, ?);
  `

  const values = [markerData.m_name, markerData.fk_m_type, markerData.m_lat, markerData.m_lng]

  db.run(sql, values, function (err) {
    if (err) {
      console.error("Fehler beim Einfügen des Markers:", err.message)
      res.status(500).json({error: err.message})
      return
    }

    res.json({message: 'Marker erfolgreich gespeichert'})
  })
})

app.post('/update-marker', (req, res) => {
  const markerData = req.body

  const sql = `
    update markers set fk_m_type = ?, m_name = ? where m_id = ?
  `

  const values = [markerData.m_type.mt_id, markerData.m_name, markerData.m_id]

  db.run(sql, values, function (err) {
    if (err) {
      console.error("Fehler beim Aktualisieren des Markers:", err.message)
      res.status(500).json({error: err.message})
      return
    }

    res.json({message: 'Marker erfolgreich gespeichert'})
  })
})

app.post('/delete-marker', (req, res) => {
  const markerData = req.body

  const sql = `
    delete from markers where m_id = ?;
  `

  const values = [markerData.m_id]

  db.run(sql, values, function (err) {
    if (err) {
      console.error("Fehler beim Löschen des Markers:", err.message)
      res.status(500).json({error: err.message})
      return
    }

    res.json({message: 'Marker erfolgreich gelöscht'})
  })
})

/* route requests for static files to appropriate directory */
app.use('/src',express.static("src/"))
app.use(express.static("dist") )


app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`)
})
