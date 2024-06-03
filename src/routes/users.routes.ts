// src/routes/users.routes.ts
import { Router, Request, Response } from 'express';
import User from '../models/user';
import City from '../models/city';
import Province from '../models/province';
import moment from "moment-timezone";
moment().local();
// moment.locale('id');
const router = Router();


// GET - users
router.get('/', async (req, res) => {
  let timezone = req.header('Timezone')
  if (!timezone || !moment.tz.zone(timezone)) {
      timezone = moment.tz.guess();
  }

  // TO DO
  const result = await User.findAll({
    raw: true,
    include: {
        model: City,
        include: [{
            model: Province
          }]
    },
    nest: true,
  });

  if(result.length == 0){
    res.status(200).send({
      success: false,
      message: 'Data Not Found',
      // data: result
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

// GET DETAIL - users
router.get('/:id', async (req, res) => {
  // TO DO
  const {id} = req.params;
  const result = await User.findOne({
    where: {id: id},
    raw: true,
    include: {
        model: City,
        include: [{
          model: Province
        }]
    },
    nest: true,
  });
  if(!result){
    res.status(200).send({
      success: false,
      message: 'Data Not Found',
      // data: result
    })
    return;
  }
  res.status(200).json({ 
    success: true,
    message: 'Data Found',
    data: result
  });
  return;
});

router.post('/', async (req, res) => {
  const { email, firstName, lastName, birthdate, cityId } = req.body;

  const findCityID = await City.findOne({where: {id: cityId}});
  if(!findCityID){
    res.status(200).json({ 
      success: false,
      message: 'City is not found',
    });
    return;
  }

  const save = await User.create({
    email: email,
    firstName: firstName,
    lastName: lastName,
    birthdate: birthdate,
    cityId: cityId
  })

  res.status(200).json({ 
    success: true,
    message: 'Data has been saved',
    // data: result
  });
  return;

});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { email, firstName, lastName, birthdate, cityId } = req.body;

  const findUser = await User.findOne({where: {id: id}});
  if(!findUser){
    res.status(200).json({ 
      success: false,
      message: 'User is not found',
    });
    return;
  }

  const findCity = await City.findOne({where: {id: cityId}});
  if(!findCity){
    res.status(200).json({ 
      success: false,
      message: 'City is not found',
    });
    return;
  }

  const update = await User.update({
    email: email,
    firstName: firstName,
    lastName: lastName,
    birthdate: birthdate,
    cityId: cityId
  }, {where: {id: id}})

  res.status(200).json({ 
    success: true,
    message: 'Data has been saved',
    // data: result
  });
  return;

});

// DELETE - users
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const findOne = await User.findOne({where: {id: id}})

  if(!findOne){
    res.status(200).json({ 
      success: false,
      message: 'Data not found',
      // data: result
    });
    return;
  }

  const result = await User.destroy({
    where: { id: id }
  });

  res.status(200).json({ 
    success: true,
    message: 'Data has been removed',
    // data: result
  });
  return;
});


export default router;