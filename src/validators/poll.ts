import Joi from 'joi';
import { Vote } from 'db/models/poll';
import { CustomValidationResult } from '../helpers';

export const choiceSchema = Joi.object({
    start: Joi.number().integer().positive().required(),
    end: Joi.number().integer().positive().greater(Joi.ref('start'))
    .required(),
});

export const voteSchema = Joi.object({
    name: Joi.string().trim().required(),
    choices: Joi.array().items(choiceSchema.required()).required(),
});

export const markChoices = (body: Vote): CustomValidationResult<Vote> => voteSchema.validate(body);
