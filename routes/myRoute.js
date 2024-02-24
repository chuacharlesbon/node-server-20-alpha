const express = require('express');

const router = express.Router();

const myController = require("../controllers/myController")

const auth = require("../auth");

const { verify, verifyAdmin } = auth;

router.post('/test', myController.testPost)
// router.post("/test-details", auth.verify, (req, res) => {

//     const testData = auth.decode(req.headers.authorization)
//     myController.getTestData({ userId: testData.id }).then(resultFromController => res.send(resultFromController));

// });

// router.get('/test', verify, myController.getTest)
router.get('/test/:id', myController.getTestById)

// router.put('/test-admin/:id', verify, verifyAdmin, myController.testUpdateAdmin)
// router.put('/test/:id', verify, myController.testUpdate)

// router.delete('/test-admin/:id', verify, verifyAdmin, myController.testDeleteAdmin)
// router.delete('/test/:id', verify, myController.testDelete)

module.exports = router;