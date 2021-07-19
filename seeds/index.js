const mongoose = require('mongoose');
const hmc_member = require('../models/hmc_schema');

mongoose.connect('mongodb://localhost:27017/barak',{
    useNewUrlParser :true,
    useCreateIndex :true,
    useUnifiedTopology : true
});

const db = mongoose.connection;

db.on("error",console.error.bind(console,"Connection Error : "));
db.once("open",()=>{
    console.log('Database Connected')
});


const hmc = async()=>{
    await hmc_member.deleteMany({});
    // let member = new hmc_member({
    //     post: 'Caretaker',
    //     name: 'Apurba Kakati',
    //     ph : '9132226771',
    //     email : 'sakakati@iitg.ac.in',
    //     branch : null,
    //     img : 'rathee.jpg'
    // })
    // await member.save();

    //     member = new hmc_member({
    //     post: 'Associate Warden',
    //     name: 'Prasenjit Khanikar',
    //     ph : '0361-2583438',
    //     email : 'pkhanikar@iitg.ac.in',
    //     branch : null,
    //     img : 'rathee.jpg'
    // })
    // await member.save();

    //     member = new hmc_member({
    //     post: 'Associate Warden',
    //     name: 'Prabu Vairakannu',
    //     ph : '0361-2582279',
    //     email : 'v.prabhu@iitg.ac.in',
    //     branch : null,
    //     img : 'rathee.jpg'
    // })
    // await member.save();

    //     member = new hmc_member({
    //     post: 'Warden',
    //     name: 'Debaprasad Maity',
    //     ph : '0361-2582730',
    //     email : 'debu@iitg.ac.in',
    //     branch : null,
    //     img : 'rathee.jpg'
    // })
    // await member.save();

        member = new hmc_member({
        post: 'General Secretary',
        name: 'Aryan Meshram',
        ph : '7974015062',
        email : 'aryan.meshram@iitg.ac.in',
        branch : 'EPH',
        img: 'aryan.jpg'
    })
    await member.save();

        member = new hmc_member({
        post: 'Associate General Secretary',
        name: 'Nitesh',
        ph : '7470903169',
        email : 'nitesh18a@iitg.ac.in',
        branch : 'CE',
        img: 'nitesh.jpg'
    })
    await member.save();

        member = new hmc_member({
        post: 'Mess Convener',
        name: 'Ekeshwar Gowla',
        ph : '7637829140',
        email : 'egowla@iitg.ac.in',
        branch : 'CSE',
        img : 'ekeshwar.jpg'
    })
    await member.save();

        member = new hmc_member({
        post: 'Joint Mess Convener',
        name: 'Ayush Srivastava',
        ph : '9199352939',
        email : 'ayushsrivastava@iitg.ac.in',
        branch : 'BDes',
        img : 'ayush.jpg'
    })
    await member.save();

        member = new hmc_member({
        post: 'Welfare Secretary',
        name: 'Abhay Singh',
        ph : '6900400724',
        email : 'kushwah18@iitg.ac.in',
        branch : 'BSBE',
        img: 'abhay.jpg'
    })
    await member.save();

        member = new hmc_member({
        post: 'Literary Secretary',
        name: 'Varun Pandey',
        ph : '8876060181',
        email : 'varunpandey@iitg.ac.in',
        branch : 'Chemical Engineering',
        img : 'pandey.jpg'
    })
    await member.save();

        member = new hmc_member({
        post: 'Cultural Secretary',
        name: 'Sanay Wasnik',
        ph : '7744917719',
        email : 'w.sanay@iitg.ac.in',
        branch : 'BDes',
        img : 'Sanay_dp.jpg'
    })
    await member.save();

        member = new hmc_member({
        post: 'Sports Secretary',
        name: 'Aryan Rathee',
        ph : '9034230330',
        email : 'aryan.rathee@iitg.ac.in',
        branch : 'MNC',
        img : 'rathee.jpg'
    })
    await member.save();

        member = new hmc_member({
        post: 'Technical Secretary',
        name: 'Sahil Prajapati',
        ph : '7827849619',
        email : 'sprajapati@iitg.ac.in',
        branch : 'EPH',
        img : 'sahil.jpg'
    })
    await member.save();

        member = new hmc_member({
        post: 'Maintainance Secretary',
        name: 'Saman Ghous',
        ph : '9930165567',
        email : 's.saman@iitg.ac.in',
        branch : 'Chemical Engineering',
        img : 'saman.jpg'
    })
    await member.save();

        member = new hmc_member({
        post: 'Joint Cultural Secretary',
        name: 'Rudra Mahajan',
        ph : '9561577773',
        email : 'u.rudra@iitg.ac.in',
        branch : 'CSE',
        img : 'rudra.jpg'
    })
    await member.save();

        member = new hmc_member({
        post: 'Joint Sports Secretary',
        name: 'Priyansh Mali',
        ph : '9352140057',
        email : 'pmali@iitg.ac.in',
        branch : 'Chemical Engineering',
        img : 'mali.jpg'
    })
    await member.save();

        member = new hmc_member({
        post: 'Joint Technical Secretary',
        name: 'Sumit Kumar',
        ph : '7991107904',
        email : 'sumit28082001@iitg.ac.in',
        branch : 'MNC',
        img : 'sumit.jpg'
    })
    await member.save();

        member = new hmc_member({
        post: 'Joint Maintainance Secretary',
        name: 'Sumit Choudhary',
        ph : '8619766407',
        email : 'schoudhary@iitg.ac.in',
        branch : 'ECE',
        img : 'sumit_ece.jpg'
    })
    await member.save();
    
}

hmc().then(()=>{
    mongoose.connection.close();
})












































