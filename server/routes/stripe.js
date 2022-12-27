
const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);

router.post('/payment', (req, res)=>{
    const pay = async ()=>{
        try{
            const paymentIntent = await stripe.paymentIntents.create({
                source: req.body.tokenId,
                amount:req.body.amount,
                currency:"usd",
            })
            res.status(200).json(paymentIntent);
        }catch (err){
            res.status(500).json(error);
        }


    }



    // stripe.charges.create({
    //     source: req.body.tokenId,
    //     amount:req.body.amount,
    //     currency:"usd",
    // },(stripeErr, stripeRes)=>{
    //     if(stripeErr){
    //         res.status(500).json(stripeErr);
    //     }else{
    //         res.status(200).json(stripeRes);
    //     }
    // })
})

module.exports = router;