import Subscription from "../models/subscription.model.js";
import {workflowClient} from "../config/upstash.js";
import {SERVER_URL} from "../config/env.js";
import mongoose from "mongoose";

export const createSubscription = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const subscription = await Subscription.create([{
            ...req.body,
            user: req.user._id,
        }], { session });

        const { workflowId } = await workflowClient.trigger({
            url: `${SERVER_URL}api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'content-type': 'application/json'
            },
            retries: 0
        });

        console.log('Workflow trigger response:', workflowId);
        console.log(`${SERVER_URL}api/v1/workflows/subscription/reminder`);

        if (!workflowId) throw new Error("Workflow trigger failed");

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            data: { subscription, workflowId },
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};


export const getUserSubscriptions = async (req, res, next) => {
    try{
        //Check if the user is the same as the one in the token
        if(req.user.id !== req.params.id){
            const error = new Error('You are not the owner of this subscription');
            error.statusCode = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });

        res.status(200).json({
            success: true,
            data: subscriptions,
        });
    }catch (error){
        next(error);
    }
}