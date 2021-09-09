const express = require('express');
const app = express();
const axios = require('axios');
const qs = require('qs');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.post('/send', async (req, res) => {

    const options = {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify(req.body),
            url: 'https://secure.velocify.com/Import.aspx?Provider=CSCWebLeadRetailPages&Client=31215&CampaignId=59'
          }
    try {
        let res = await axios(options)
        console.log(res.data)
      } catch (err) {
        console.error(err)
      }

res.send('Post received');
});

app.listen(3300, () => {
    console.log('Server listening on port 3300');
});