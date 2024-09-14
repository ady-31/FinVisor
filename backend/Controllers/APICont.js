import { createChatSession, submitQuery } from "../ApiRequestA.js";
import { CatchAsyncError } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../middlewares/ErrorMiddleware.js";

export let output; 
export const ApiCont = CatchAsyncError(async (req, res, next) => {
    const { userQuery } = req.body; // Get query from request body
    if (!userQuery) {
        return next(new ErrorHandler("Query not found"), 402);
    }
    console.log(userQuery)
    try {
        const sessionId = await createChatSession();
        if (sessionId) {
            const answer = await submitQuery(sessionId, userQuery);
            console.log(answer)
            res.status(200).json({
                answer
            });
        } else {
            return next(new ErrorHandler("Unable to fetch data"), 403);
        }
    } catch (err) {
        res.status(403).json({
            success: "false",
            message: "An error occurred"
        });
    }
})