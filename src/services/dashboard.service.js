const CONFIG    = require("../configs/config");
const {
    determineUserLevel
}               = require('../commons/utilities');
const User      = require('../models/users.model');
const Response  = require('../models/responses.model');

const getLoggedUserDetails = async (userID) => {
    const user = await User.findOne({ _id: userID });
    if(user){
        const authLevel  = determineUserLevel(parseInt(user.level));
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

const getNPSPercent   = async (userID, medium, startDate, endDate) => {
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

const getAverageUserNPS   = async (userID,medium, startDate, endDate) => {
    return 10;
};


const getIssueResolution   = async(userID, medium, startDate, endDate) => {
    return {
        agreed: 10,
        disputed: 5
    }
};

const getAggreedResolved  = async(userID, medium, startDate, endDate) => {
    return 10;
};

const getDisputedResolved = async(userID, medium, startDate, endDate) => {
    return 5;
};

const getDetractors = async (userID, medium, startDate, endDate) => {
    return { percent: 25 };
};

const getPromoters = async (userID, medium, startDate, endDate) => {
    return { percent: 45 };
};

const getUserMonthlyTNPSTrend = async (userID, medium, startDate, endDate) => {
    return {
        NPSMonth:'Jan 2020',
        NPSScore: 7
    }
};

const getUserDashboardStats   = async (userID, medium, startDate, endDate) => {
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
    getUserDashboardStats
}