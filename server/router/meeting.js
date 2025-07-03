const express = require ('express');
const meetingModel = require ('../models/meeting');
const Loginmodel  = require ('../models/login');
const router = express.Router();
const {validateToken } = require('../middleWares/AuthMiddleWares')




router.post('/', validateToken, async(req,res) => {
    try {
        const { Title, desc, participants, date, location, start_time, end_time ,created_by} = req.body;

        for (let participant of participants) {
            const existingUser = await Loginmodel.findOne({ email: participant.email }); // Use findOne to get a single result

            if (!existingUser) {
                return res.status(400).json({ error: `Participant with email ${participant.email} is not registered.` });
            }
        }

        await meetingModel.create({
            Title: Title,
            desc: desc,
            participants: participants,
            date: date,
            location: location,
            start_time: start_time,
            end_time: end_time,
            created_by: created_by
        });

        res.json("success");
    } catch (err) {
        console.log(err);
        res.json({ error: err.message }); // Send a more descriptive error message
    }
});



  
router.get("/invite/email", validateToken, async (req, res) => {
    try {
      const email = req.user.email;  // Securely get email from JWT
      console.log("Fetching invitations for:", email);  // Debug log
      const meetings = await meetingModel.find({
        participants: { $elemMatch: { email: email } }
      });
      res.status(200).json({ listOfmeetings: meetings });  // Wrap in listOfmeetings
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  
  router.get('/dates', async (req, res) => {
    try {
      const email = req.query.email;
      const meetings = await meetingModel.find({email}, 'date'); // fetch only date field
      const dates = meetings.map(meeting => meeting.date);
      res.json(dates);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

 


module.exports= router;
