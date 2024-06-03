// src/routes/regions.routes.ts
import { Router, Request, Response } from 'express';
import User from '../models/user';
import City from '../models/city';
import Province from '../models/province';
import moment from "moment-timezone";
moment().local();
// moment.locale('id');
const router = Router();


// GET - regions
router.get('/', async (req, res) => {
  const result = await City.findAll({
    raw: true,
    include: {
        model: Province,
    },
    nest: true,
  });

  if(result.length == 0){
    res.status(200).send({
      success: false,
      message: 'Data Not Found',
      data: result
    })
    return;
  }
  res.status(200).send({
    success: true,
    message: 'Data Found',
    data: result
  })
  return;
});

router.get('/bulk', async (req, res) => {

  const saveProvince = await Province.bulkCreate([{
    name: 'DKI JAKARTA',
  }])

  if(saveProvince){
    const saveCity = await City.bulkCreate([
        {
            name: 'JAKARTA SELATAN',
            provinceId: 1
        },
        {
            name: 'JAKARTA PUSAT',
            provinceId: 1
        },
        {
            name: 'JAKARTA TIMUR',
            provinceId: 1
        },
        {
            name: 'JAKARTA UTARA',
            provinceId: 1
        },
        {
            name: 'JAKARTA BARAT',
            provinceId: 1
        },
    ])
  }
  
  res.status(200).json({ 
    success: true,
    message: 'Data has been saved',
    // data: result
  });
  return;

});


export default router;
