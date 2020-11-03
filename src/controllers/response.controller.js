const CONFIG    = require("../configs/config");
const Response  = require('../models/responses.model');
const {
    createResponseBody
}               = require("../commons/utilities");

const {
    getUserDashboardStats
}               = require('../services/dashboard.service');

exports.createResponse = (req, res) => {
    const invalid = !req.body.agent_id || !req.body.resolution ||
	 !req.body.satisfaction || !req.body.medium || !req.body.verbatim;
	 
    if(invalid){
        let msg = "Please provide all details";
		res.status(401).json(createResponseBody(1001,msg,[],1));
		return;
    }

    const response  = new Response(req.body);
	response.save((err,response) => {
		if(err){
			res.status(400).json(createResponseBody(1001,err,[],1));
			return;	
		}else{
			let msg = "Survey records saved successfully.";
	  	    res.status(200).json(createResponseBody(1000,msg,[],1));	
		}
	});
};

exports.findResponseById = (req,res) => {
    Response.findOne({
		_id: req.params.id
	},(err,response) => {
		if(err){
            res.status(400).json(createResponseBody(1001,err,[],1));
            return;	
		}
		if(!response){
			let msg = `No response found by the id ${req.params.id}`;
            res.status(401).json(createResponseBody(1001,msg,[],1));	
            return;
		}else{
            let msg = "Response details loaded successfully.";
            res.status(200).json(createResponseBody(1000,msg,response,0));
		}
	});
};

exports.findResponses = (req,res) => {

};

exports.updateResponseById = (req, res) => {

};
//{medium,startDate,endDate}
exports.getUserResponses = (req, res) => {

};
//{medium,startDate,endDate}
exports.getDashboardStats = async (req, res) => {
    const userID    = req.params.userId;
    const medium    = req.body.medium || 125;
    const startDate = req.body.startDate;
    const endDate   = req.body.endDate;
    const stats = await getUserDashboardStats(userID,medium,startDate,endDate);
    let msg = "Stats loaded successfully.";
    res.status(200).json(createResponseBody(1000,msg,stats,0));
};
