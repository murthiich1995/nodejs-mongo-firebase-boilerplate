const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
var User = require('../model/user');
var Associate = require('../model/associate')
var AssociateOtp = require('../model/associateotp')
let moment = require('moment');
let uuid = require('uuid');

const { response } = require('../app');
//Google Distance Module and API key kept here, move api key to env file
const distanceCalc = require('google-distance');
distanceCalc.apiKey = '';
var axios = require('axios');

const CheckWheatherUserExists  = (values) => {
    return new Promise((resolve, reject) => {
        setImmediate(() => {
            try {
                let query = {
                    username:values.username,
                    phoneNumber:values.phoneNumber
                }
                Associate.findOne(query).lean().exec().then((Result) => {
                    if (Result) {
                        resolve(Result)
                    } else{
                        reject({ success: false, extras: { msg: "Invalid Username or Phone Number." } });
                    }
                }).catch((err) => {
                    reject({ success: false, extras: { msg: "DATABASE_ERROR" } });
                })
            } catch (error) {
                console.error('Something Error');
                console.error(error);
            }
        });
    });
}

const CheckUserStatus  = (values) => {
    return new Promise((resolve, reject) => {
        setImmediate(() => {
            try {
                if(values.status == true){
                    resolve("Validated Successfully.")
                }else{
                    reject("Inactive User")
                }
            } catch (error) {
                console.error('Something Error');
                console.error(error);
            }
        });
    });
}

module.exports = {
    LoginAssociate
};