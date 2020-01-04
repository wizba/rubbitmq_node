const amqp=require("amqplib");//advanced message quieng protocol

connect=async ()=>{
    try{
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel=await connection.createChannel();

        //ensures that your queue exists on the server end
        const result=await channel.assertQueue("jobs");
        channel.consume("jobs",message =>{
            console.log(JSON.parse(message.content.toString()));
        })

        console.log(`waiting for message...`)
    }
    catch(ex)
    {
        console.error(ex);
    }
}
connect();