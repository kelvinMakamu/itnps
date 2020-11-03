const User      = require('../models/users.model');
const Manager   = require('../models/managers.model');


const assignManagerAnAgent = async (managerID, userID) => {
    const restriction = await restrictDuplicateAssignment(managerID,userID);
    switch(restriction){
        case 1000:
        return 1003;//Assignment already exists
        break;

        case 1001:
        const restricted = await restrictErroneousAssignment(managerID, userID);
        if(restricted === 1000){
            const assignment  = await Manager.insertMany({ manager_id: managerID, agent_id: userID });
            if(assignment){
                return 1000;
            }else{
                return 1015;
            }
        }else{
          return restricted;
        }
        break;
    }
};

const restrictDuplicateAssignment = async (managerID, userID) => {
    const assignment = await Manager.findOne({ manager_id: managerID, agent_id: userID});
    if(assignment){
        return 1000;
    }else{
        return 1001;
    }
};

const restrictErroneousAssignment = async (managerID, userID) => {
    const manager = await User.findOne({ _id: managerID });
    if(manager){
        if(parseInt(manager.level) === 1){
            const alreadyAssigned = await checkAgentAlreadyAssigned(userID);
            switch(alreadyAssigned){
                case 1000:
                return 1009;// The agent has already been assigned
                break;

                case 1001:
                const user = await User.findOne({ _id: userID });
                if(user){
                    return parseInt(user.level) === 2 ? 1000 : 1013;// Only agents can be assigned 
                }else{
                    return 1011;//The agent does not exist
                }
                break;
            }
        }else{
            return 1007;// Assignments only allowed between managers and agents
        }
    }else{
        return 1005;//Manager records not available
    }
};

const checkAgentAlreadyAssigned = async (userID) => {
    const user = await Manager.findOne({ _id: userID });
    if(user){
        return 1000;
    }else{
        return 1001;
    }
}


module.exports = {
    assignManagerAnAgent
}