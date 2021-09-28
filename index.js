const { MongoClient, ServerApiVersion } = require('mongodb');
const {ConnectionString} = require('connection-string');



const uri =
  "mongodb+srv://betting-dev-infra-clust.6xrrn.mongodb.net/betting-dev?ssl=true&replicaSet=betting-dev-infra-clust-shard-00-01&retryWrites=true&w=majority";
const uri_iam = 
  "mongodb+srv://<AWS access key>:<AWS secret key>@betting-dev-infra-clust.6xrrn.mongodb.net/betting-dev?authSource=%24external&authMechanism=MONGODB-AWS&retryWrites=true&w=majority&authMechanismProperties=AWS_SESSION_TOKEN:<session token (for AWS IAM Roles)>";

const cs_iam = new ConnectionString(uri_iam, {
  awsAccessKey: '',
  awsSecretKey: '',
  awsSesssionToken: ''
});

const cs = new ConnectionString(uri, {
  user: 'l.thomas@betclicgroup.com',
  password: 'NousSachons2706!'
});

console.log(cs.toString());

const client = new MongoClient(cs.toString(), { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try{
    await client.connect();
    const bets = client.db("betting").collection("bets");
    const bet = await bets.find( { userId: 15156373 } );
    console.log(bet);
    
  }finally{
    await client.close();
  }
}

run().catch(console.dir);