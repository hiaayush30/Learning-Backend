const Url = require('../models/urlModel');
const { v4: uuidv4 } = require('uuid');
const handleNewShortUrl=async (req, res) => {
    if(!req.body.link) return res.status(400).json({error:'url is required!'})
    const link = req.body.link;
    if (link.trim() === '') {
        return res.send('please enter a valid url!');
    }
    const url = await Url.create({
         shortId:uuidv4(),
         originaLink:link.trim(), 
         visitHistory:[]
    })
    res.render('shortened',{link:url.shortId});
}

const handleClickAnalytics=async (req,res)=>{
    const shortId=req.params.id;
    const entry=await Url.findOne({shortId});
    res.json({clicks:entry.visitHistory.length,
        analytics:entry.visitHistory
    })
}
module.exports={handleNewShortUrl,handleClickAnalytics};