exports.getMessage = async(req, res, next)=> {
    try {
        const {data} = req.body
        const textMsg = data.textMsg
        console.log(req.body);
        res.status(200).json({
            textMsg,
            
        })
    } catch (error) {
        res.status(500).json({error})
    }
}