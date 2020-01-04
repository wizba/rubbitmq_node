const amqp=require("amqplib");//advanced message quieng protocol
msg={
    number:100,
    message:'hello from amq'
};
 connect=async ()=>{
    try{
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel=await connection.createChannel();

        //ensures that your queue exists on the server end
        const result=await channel.assertQueue("jobs");
        channel.sendToQueue("jobs",Buffer.from(JSON.stringify(msg)));

        //connection.close();

        console.log(`job sent successfully ${msg.number}`)
    }
    catch(ex)
    {
        console.error(ex);
    }
}
connect();