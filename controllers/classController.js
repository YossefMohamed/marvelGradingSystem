const Class = require("../models/class");
const Subject = require("../models/subject");
const User = require("../models/user");

exports.getClass = async (req, res) => {
    if(!req.user.class.includes(req.params.classId) && req.user.type === "Teacher") res.redirect("/")  
    let classes;
    if(req.user.type==="Teacher" || req.user.type ==="Head"){
        classes = await Subject.find({
            class : req.params.classId,
            name : req.user.subject
        })   
    }
    else{
        classes = await Subject.find({
            class : req.params.classId,
        })   
    }
    const create = classes.length>0?false:true
    res.status(200).render("teacherHomePage.ejs",{
        user : req.user,
        currentClass : req.params.classId,
        classes,

    })  
};
  
exports.addClass = async (req, res) => {
    try {
        
    const currentClass = await Class.create({
        name : req.body.newClass
    })
    res.status(200).redirect(`/class/${currentClass.name}`)

    } catch (error) {
        
            if(req.user.type==="Teacher")
  {
     classes = await Class.find({
    name : {$in : req.user.class}
  });
  }else{
     classes = await Class.find({
  });
  }
  res.status(200).render("classPage.ejs",
  {user : req.user,
  classes,
  error:req.body.newClass + " is already created"
})
    }
    }
    
// exports.getClass = async (req, res) => {
//     if(req.user.class !== req.params.classId) res.redirect("/")  
//     const classes = await Subject.find({
//         class : req.params.classId,
//         name : req.user.subject
//     }) 
//     console.log(req.user.class)
//     res.status(200).render("teacherHomePage.ejs",{
//        user : req.user
//         ,
//         currentClass : req.user.class,
//         classes
//     })  
// };
  