const mongoose = require('mongoose');

const meetingData = new mongoose.Schema({
    Title: String,
    desc: String,
    participants: [{
        email: { 
            type: String, 
            required: true, 
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please provide a valid email address'] 
        }
    }],
    date: String,
    location: String,
    start_time: String,
    end_time: String,
    created_by:String
})

const meetingModel = mongoose.model("meeting", meetingData, "meeting" );

module.exports = meetingModel;



