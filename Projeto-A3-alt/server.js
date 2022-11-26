import express from "express";
import { join as joinPath } from "path";
import { FakeDataGenerator } from "./fake-data.js";
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const app = express()
const port = 5001
const appDir = process.cwd();

// Configure lowdb to write to JSONFile
const appointmentsAdapt = new JSONFile(joinPath(appDir, "data", "appointments.json"));
const appointmentsDB = new Low(appointmentsAdapt)

// Read and initialize appointment times
await appointmentsDB.read()
appointmentsDB.data ||= { appointments: [] }   

app.use(express.json());
app.use(express.static("wwwroot"));

// Generate new data (destructive!)
app.get('/generate_data', async (req, res) => {
    await FakeDataGenerator.generate();
    res.sendStatus(201) // 201 = OK, NO CONTENT
})

// Get all available time slots
app.get('/availability', (req, res) => res.sendFile("./data/availability.json", {
    root: appDir
}));

// Get current appointments
app.get('/appointments', (req, res) => res.sendFile("./data/appointments.json", {
    root: appDir
}));

// Create an Appointment
app.put("/appointments", async (req, res) => {
    appointmentsDB.data.appointments.push(req.body);
    await appointmentsDB.write();
    res.sendStatus(201);
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})