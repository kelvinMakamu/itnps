const CONFIG    = require("../configs/config");
const {
    determineUserLevel
}               = require('../commons/utilities');
const User      = require('../models/users.model');
const Response  = require('../models/responses.model');

const getLoggedUserDetails = async (userID) => {
    const user = await User.findOne({ _id: userID });
    if(user){
        const authLevel  = determineUserLevel(parseInt(parseInt(user.level)));
        const loggedUser = {
            firstName: user.first_name,
            lastName : user.last_name,
            userLevel: authLevel
        };
        return loggedUser;
    }else{
        return 1005;
    }
};

const getNPSPercent   = async (userID,medium,startDate,endDate) => {
    const promoters        = await getPromoters(userID,medium,startDate,endDate);
    const percentPromoter  = promoters.percent;
    const detractors       = await getDetractors(userID,medium,startDate,endDate);
    const percentDetractor = detractors.percent;
    const percentNPS       = percentPromoter - percentDetractor;
    return {
        promoters:  percentPromoter,
        detractors: percentDetractor,
        percentNPS: percentNPS
    };
};

const getUserRawResponses = async (userID) => {
    const user = await User.findOne({ _id: userID });
    let condition;
    if(user){
        switch(parseInt(user.level)){
            case 0:
            condition = {
            };
            break;
    
            case 1:
            condition = {
                agent_id : userID
            };
            break;
    
            case 2:
            condition = {
                agent_id : userID
            };
            break;
        }
        const responses = await Response.find(condition);
        if(responses){
            return responses;
        }else{
            return 1005;
        }
    }else{
        return 1005;
    }
};

const getIssueResolution  = async(userID,medium,startDate,endDate) => {
    const resolved = await getAggreedResolved(userID,medium,startDate,endDate);
    const dispute  = await getDisputedResolved(userID,medium,startDate,endDate);
    const totals   = await getTotalResponses(userID,medium,startDate,endDate);
    return {
        agreed: Math.floor((resolved/totals)*100),
        disputed: Math.floor((dispute/totals)*100)
    }
};

const getAggreedResolved  = async(userID,medium,startDate,endDate) => {
    const user = await User.findOne({ _id: userID });
    let condition;
    if(user){
        switch(parseInt(user.level)){
            case 0:
            condition = {
                createdAt: {
                    $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                    $lt: new Date(new Date(endDate).setHours(23, 59, 59))
                },
                "satisfaction": { $gt: 7 }
            };
            break;
    
            case 1:
            condition = {
                agent_id : userID,
                createdAt: {
                    $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                    $lt: new Date(new Date(endDate).setHours(23, 59, 59))
                },
                "satisfaction": { $gt: 7 }
            };
            break;
    
            case 2:
            condition = {
                agent_id : userID,
                createdAt: {
                    $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                    $lt: new Date(new Date(endDate).setHours(23, 59, 59))
                },
                "satisfaction": { $gt: 7 }
            };
            break;
        }
        const agreed = await Response.countDocuments(condition);
        return agreed ? agreed : 0;
    }else{
        return 1005;
    }
};

const getDisputedResolved = async(userID,medium,startDate,endDate) => {
    const user = await User.findOne({ _id: userID });
    let condition;
    if(user){
        switch(parseInt(user.level)){
            case 0:
            condition = {
                createdAt: {
                    $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                    $lt: new Date(new Date(endDate).setHours(23, 59, 59))
                    },
                    "satisfaction": { $lt: 7 }
            };
            break;
    
            case 1:
            condition = {
                agent_id : userID,
                createdAt: {
                    $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                    $lt: new Date(new Date(endDate).setHours(23, 59, 59))
                },
                "satisfaction": { $lt: 7 }
            };
            break;
    
            case 2:
            condition = {
                agent_id : userID,
                createdAt: {
                    $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                    $lt: new Date(new Date(endDate).setHours(23, 59, 59))
                },
                "satisfaction": { $lt: 7 }
            };
            break;
        }
        const disputed = await Response.countDocuments(condition);
        return disputed ? disputed : 0;
    }else{
        return 1005;
    }
};

const getDetractors = async (userID,medium,startDate,endDate) => {
    const user = await User.findOne({ _id: userID });
    let condition;
    if(user){
        switch(parseInt(user.level)){
            case 0:
            condition = {
                createdAt: {
                    $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                    $lt: new Date(new Date(endDate).setHours(23, 59, 59))
                },
                "nps_score": { $lt: 7 }
            };
            break;
    
            case 1:
            condition = {
                agent_id : userID,
                createdAt: {
                    $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                    $lt: new Date(new Date(endDate).setHours(23, 59, 59))
                },
                "nps_score": { $lt: 7 }
            };
            break;
    
            case 2:
            condition = {
                agent_id : userID,
                createdAt: {
                    $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                    $lt: new Date(new Date(endDate).setHours(23, 59, 59))
                },
                "nps_score": { $lt: 7 }
            };
            break;
        }
        const detractors        = await Response.countDocuments(condition);
        const totals            = await getTotalResponses(userID,medium,startDate,endDate);
        const percentDetractors = detractors ? Math.floor((detractors / totals) * 100) : 0;
        return { percent: percentDetractors };
    }else{
        return 1005;
    }
};

const getPromoters  = async (userID,medium,startDate,endDate) => {
    const user = await User.findOne({ _id: userID });
    let condition;
    if(user){
        switch(parseInt(user.level)){
            case 0:
            condition = {
                createdAt: {
                    $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                    $lt: new Date(new Date(endDate).setHours(23, 59, 59))
                    },
                    "nps_score": { $gt: 9 }
            };
            break;
    
            case 1:
            condition = {
                agent_id : userID,
                createdAt: {
                    $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                    $lt: new Date(new Date(endDate).setHours(23, 59, 59))
                    },
                    "nps_score": { $gt: 9 }
            };
            break;
    
            case 2:
            condition = {
                agent_id : userID,
                createdAt: {
                    $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                    $lt: new Date(new Date(endDate).setHours(23, 59, 59))
                    },
                    "nps_score": { $gt: 9 }
            };
            break;
        }
        const promoters        = await Response.countDocuments(condition);
        const totals           = await getTotalResponses(userID,medium,startDate,endDate);
        const percentPromoters = promoters ? Math.floor((promoters / totals) * 100) : 0;
        return { percent: percentPromoters };

    }else{
        return 1005;
    }
};

const getTotalResponses  = async (userID,medium,startDate,endDate) => {
    const user = await User.findOne({ _id: userID });
    let condition;
    if(user){
        switch(parseInt(user.level)){
            case 0:
            condition = {
                createdAt: {
                    $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                    $lt: new Date(new Date(endDate).setHours(23, 59, 59))
                }
            };
            break;
    
            case 1:
            condition = {
                agent_id : userID,
                createdAt: {
                    $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                    $lt: new Date(new Date(endDate).setHours(23, 59, 59))
                }
            };
            break;
    
            case 2:
            condition = {
                agent_id : userID,
                createdAt: {
                    $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                    $lt: new Date(new Date(endDate).setHours(23, 59, 59))
                }
            };
            break;
        }
        const totalResponses = await Response.countDocuments(condition);
        return totalResponses;
    }else{
        return 1005;
    }
}

const getUserMonthlyTNPSTrend = async (userID,medium,startDate,endDate) => {
    return {
        NPSMonth:'Jan 2020',
        NPSScore: 7
    }
};

const getUserDashboardStats   = async (userID,medium,startDate,endDate) => {
    const logged = await getLoggedUserDetails(userID);
    if(logged !== 1005){
        const issuesResolution  = await getIssueResolution(userID,medium,startDate,endDate);
        const resolution = {
            positive: issuesResolution.agreed,
            negative: issuesResolution.disputed
        };
        const userNPS           = await getNPSPercent(userID, medium, startDate, endDate); 
        const percentDetractors = await getDetractors(userID,medium,startDate,endDate);
        const percentPromoters  = await getPromoters(userID,medium,startDate,endDate);
        const monthlyTrend      = await getUserMonthlyTNPSTrend(userID,medium,startDate,endDate);
        const scores     = {
            totalTNPS: userNPS,
            issuesResolution: resolution,
            detractors: percentDetractors,
            promoters:  percentPromoters,
            trend: monthlyTrend
        };
        return {
            user: logged,
            scores: scores
        }
    }else{
        return 1005;
    }
};


module.exports = {
    getUserRawResponses,
    getUserDashboardStats
}