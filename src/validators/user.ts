import Joi from 'joi';
import { CustomValidationResult } from '../helpers';
import { choiceSchema, voteSchema } from './poll';
import { RocketMeetPoll } from '../db/models/poll';

// eslint-disable-next-line
export const createOrEditPoll = (body: RocketMeetPoll): CustomValidationResult<RocketMeetPoll> => {
    const schema = Joi.object({
        title: Joi.string().trim().required(),
        description: Joi.string().trim(),
        open: Joi.boolean(),
        encryptedEmailID: Joi.string().trim().required(),
        choices: Joi.array().items(choiceSchema).required().min(2),
        finalChoice: choiceSchema,
        votes: Joi.array().items(voteSchema),
    });

    return schema.validate(body);
};
