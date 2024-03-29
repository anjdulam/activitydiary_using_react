const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')


const app = express();
const port = 3000;

const uri = "mongodb+srv://anjalidulam03:anju0303@cluster0.yhlf4ng.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; //change prefs to custom collection name
app.use(cors());


app.use(express.static(path.join(__dirname, '..', 'tp1', 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'tp1', 'build', 'index.html'));
  });



mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connected to MongoDB Atlas'))
 .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

const Schema = mongoose.Schema;
const sampleSchema = new Schema({
 title: String,
 Deadline: Date,
 status: String, 
});

const Sample = mongoose.model('Sample', sampleSchema);

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/insert', (req, res) => {
 // Creating a document from the model and the request body
 const { title, deadline, status } = req.body;
 const sampleDocument = new Sample({
     title: title,
     Deadline: new Date(deadline), // Ensure the deadline is a Date object
     status: status,
 });

 sampleDocument.save()
    .then(doc => res.status(201).json(doc)) // Send a 201 Created status code on success
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/list', async (req, res) => {
    try {
        const activities = await Sample.find();
        res.json(activities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/updateStatus/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        console.log(id, status);

        // Find the document based on _id
        const activity = await Sample.findOne({ _id: id });

        if (!activity) {
            return res.status(404).json({ error: "Activity not found" });
        }

        // Update the status
        activity.status = status;

        // Save the updated document
        const updatedActivity = await activity.save();

        res.json(updatedActivity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Start the server
app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});