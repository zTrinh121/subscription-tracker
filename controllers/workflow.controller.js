import { createRequire } from 'module'
import Subscription from "../models/subscription.model.js";
import dayjs from "dayjs";
import {workflowClient} from "../config/upstash.js";
import {SERVER_URL} from "../config/env.js";
const require = createRequire(import.meta.url)
const { serve } = require('@upstash/workflow/express')

const REMINDERS = [7, 5, 2, 1];

export const createSubscription = async (req, res, next) => {
    try{
        const subscription = await  Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        await workflowClient.trigger({
            url: SERVER_URL
        })
    }catch (error){

    }
}

export const sendReminder = serve(async  (context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if(!subscription || subscription.status !== 'active') return;

    const renewalDate = dayjs(subscription.renewalDate);
    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`)
        return;
    }

    for(const daysBefore of REMINDERS){
        const reminderDate = renewalDate.subtract(daysBefore, 'day');
        if(reminderDate.isAfter(dayjs)){
            await  sleepUntilReminder(context, `Reminder-${daysBefore} days before`, reminderDate);
        }

        await triggerReminder(context, `Reminder-${daysBefore} days before`);
    }
})

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    })
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleep(label, date.toDate());
}

const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`);
        //Send email, SMS, push notification
    })
}