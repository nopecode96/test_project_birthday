import { Router } from 'express';
const request = require('request-promise');
const dotenv = require('dotenv');
dotenv.config();
import moment from "moment";
import User from '../models/user';
import Logmail from '../models/logmail';
import { Op } from 'sequelize';
moment().local();
const router = Router();

router.get('/', async (req, res) => {   
    var month = moment().month() + 1;
    var today = moment().date();

    const sql = `SELECT "id", "email" AS "email", "first_name" AS "firstName", "last_name" AS "lastName", "birthdate", "cityId" FROM "users" AS "User" WHERE (DATE_PART('month', birthdate) = ` + month + ` AND DATE_PART('day', birthdate) = `+today+`);`;

    const findUser = await User.sequelize!.query(sql);
    // console.log(findUser[0].length);
    if(findUser![0].length === 0){
        res.status(200).send({
            success: false,
            message: 'No sending Email notification birthday',
            
        })
        return;
    }

    var dataToRow = JSON.stringify(findUser[0]);
    var dataJson = JSON.parse(dataToRow);

    for(var i = 0; i < dataJson.length; i++){
        console.log(dataJson.length);
        console.log(i)
        if(i == dataJson.length){
            res.status(200).send({
                success: true,
                msg: 'all birthday notification sent'
            })
            return;
        }
        const userid = dataJson[i]['id'];
        const email = dataJson[i]['email'];
        const name = dataJson[i]['firstName'] + ' ' + dataJson[i]['lastName']
        const message = "Hi "+ name +", its your birthday."

        const options = {
            method: 'POST',
            uri: process.env.MAIL_URL,
            body: {
                email: email,
                message: message
            },
            json: true,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        try {
            const data = await request(options);
            if(data.status == 'sent'){
                const save = await Logmail.create({
                    email: email,
                    message: message,
                    type: "birthday",
                    status: data.status,
                    userId: userid
                })
            
                continue;
            }

            const save = await Logmail.create({
                email: email,
                message: message,
                type: "birthday",
                status: data.status,
                userId: userid
            })

            continue;
        } catch (error) {
            const save = await Logmail.create({
                email: email,
                message: message,
                type: "birthday",
                status: "unsent",
                userId: userid
            })
            continue;
        }
    }
});

router.get('/backup', async (req, res) => {   
    const findUser = await Logmail.findAll({where: {status: { [Op.ne]: 'sent'} }})
    var dataToRow = JSON.stringify(findUser[0]);
    var dataJson = JSON.parse(dataToRow);

    for(var i = 0; i < dataJson.length; i++){
        console.log(dataJson.length);
        console.log(i)
        if(i == dataJson.length){
            res.status(200).send({
                success: true,
                msg: 'all birthday notification sent'
            })
            return;
        }
        const id = dataJson[i]['id'];
        const email = dataJson[i]['email'];
        const name = dataJson[i]['firstName'] + ' ' + dataJson[i]['lastName']
        const message = "Hi "+ name +", its your birthday."

        const options = {
            method: 'POST',
            uri: process.env.MAIL_URL,
            body: {
                email: email,
                message: message
            },
            json: true,
            headers: {
                'Content-Type': 'application/json',
            }
        }

        try {
            const data = await request(options);

            const save = await Logmail.update({
                status: data.status
            }, {where: {id: id}})

            continue;            
        } catch (error) {
            const save = await Logmail.update({
                status: 'unsent'
            }, {where: {id: id}})
            continue;
        }

    }
    
});

export default router;
